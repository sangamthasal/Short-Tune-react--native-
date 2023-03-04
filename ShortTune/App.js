

//improting the modules
import { View,SafeAreaView,StyleSheet,Text,Button,ActivityIndicator,Image } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as WebBrowser from 'expo-web-browser';
import {  useAuthRequest } from 'expo-auth-session';
import { NativeBaseProvider } from 'native-base'
import SpotifyWebApi from 'spotify-web-api-node';
import { MaterialIcons } from '@expo/vector-icons'
import HomeScreen from './src/screen/HomeScreen'
import SearchScreen from './src/screen/SearchScreen'
import PlayerScreen from './src/screen/PlayerScreen';
import PlaylistScreen from './src/screen/PlaylistScreen';
import Detector from './src/FaceDetect/Detect';
import axios from 'axios';
import ReasultScreen from './src/screen/ReasultScreen';





const Stack= createStackNavigator();
const Tab = createBottomTabNavigator(); 


WebBrowser.maybeCompleteAuthSession(); 


const spotifyApi = new SpotifyWebApi({              
  clientId:'4d936fa291cf421083503b258650e149'              
})

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',            
  tokenEndpoint: 'https://accounts.spotify.com/api/token',                    
};


const App = () => {

// creatign the state variables
const [autcode,setcode]=useState();
 const[accessToken,setAccessToken]= useState();
 const[refreshToken,setRefreshToken]= useState();
 const[expirestime,setexpirestime]= useState();


  const Client_Id= '4d936fa291cf421083503b258650e149';
  const RedirectUri ="exp://192.168.216.114:19000/";             








  const [request, response, promptAsync] = useAuthRequest(           
    {
      
      clientId: Client_Id,
      scopes: [  "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-top-read",
      "user-modify-playback-state",
      "streaming",
      "user-read-email",
      "user-read-private",],
     
      usePKCE: false,
      redirectUri:RedirectUri ,
    },
    discovery
  );


  useEffect(() => {                                          

    console.log('first one get called')
    if (response?.type === 'success') {                      
      
      
      const { code } = response.params;                        
      setcode(code);                                            

     axios.post('http://192.168.216.114:3001/login',{              
        code,
      })
      .then(res=>{                                                
        console.log(res.data)
       
    
      { /* console.log(res.data.accessToken)
        console.log(res.data.refreshToken)
        console.log(res.data.expiresIn)
        */
      }
        setAccessToken(res.data.accessToken);                  
        setRefreshToken(res.data.refreshToken);
        setexpirestime(res.data.expiresIn);
        
       
       
      }).catch(err=>{
        
        if(err){
        console.log('called 1')
        promptAsync();                                          
      
        }
        
      })
      
      
    }
  }, [response]);                                               

  useEffect(()=>{
    spotifyApi.setAccessToken(accessToken)                          
  },[accessToken])


  useEffect(()=>{

    if(!refreshToken || !expirestime)return
    const intervel = setInterval(()=>{

      console.log('second one get called')
      axios.post('http://192.168.216.114:3001/refresh',{                       
        refreshToken,
      })
      .then(res=>{

        setAccessToken(res.data.accessToken);                           
        setRefreshToken(res.data.refreshToken)        
      
        setexpirestime(res.data.expiresIn)
        
      }).catch(err=>{

        if(err){
          console.log('called 2')
          }
      })

    },(expirestime - 60 ) * 1000)

    return ()=>clearInterval(intervel)

  },[refreshToken,expirestime])


  function IfClickonPlaylist(){                                       
    return(
     <Stack.Navigator>                                               
        <Stack.Screen name='Homescreen' component={HomeScreen}initialParams={{accessToken}} options={{headerShown:false}}/>  
        <Stack.Screen name='PlaylistScreen' component={PlaylistScreen}initialParams={{accessToken}}/> 
        <Stack.Screen name='PlayerScreen' component={PlayerScreen}  /> 

     </Stack.Navigator>
    )
  }

  function SearchComponent(){                                         
    return(
      <Stack.Navigator>
        <Stack.Screen name='SearchScreen' component={SearchScreen} initialParams={{accessToken}} options={{headerShown:false}} /> 
        <Stack.Screen name='DetectScreen' component={Detector}  />  
        <Stack.Screen name='ResultScreen' component={ReasultScreen}/>
       
      </Stack.Navigator>
    )
  }
 
  return (
    
    <NavigationContainer>                   

      <NativeBaseProvider>                    


      {
        
      accessToken ? (                         
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {          
              let iconName;

              if (route.name === 'Home') {            
                iconName = 'home'; 
              } else if (route.name === 'Search') {
                iconName = 'search';
              } else if (route.name === 'Player') {
                iconName = 'play-circle-filled';
              }

              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#343434',
            inactiveTintColor: '#666666',
            
          }}
        > 
       
          <Tab.Screen name="Home" component={IfClickonPlaylist} initialParams={{accessToken}} options={{headerShown:false}}/>
          <Tab.Screen name="Search" component={SearchComponent} initialParams={{accessToken}} options={{headerShown:false}}/>
        
        </Tab.Navigator>
      ) : (
        <View style={AppStyle.container}>  

      
        <View >                                 
        <Button 
                                  
          title="Login"
           onPress={() => {                   
            promptAsync();  
           
                              
          }}
        />
       </View>
        </View> 
      )}
      </NativeBaseProvider>
    </NavigationContainer>
   


      
    
 
  )
}

export default App


const AppStyle  = StyleSheet.create({
  safecontainer:{
   
    marginBottom:'9%',
    height:'100%',
   
  
  },
  container:{
    height:'80%',
    width:'100%',
    
    borderRadius:50,
    display:'flex',
    justifyContent:'center',

  },
  inner:{
    display:'flex',
    height:'80%',
    justifyContent:'center',
    alignItems:'center'
  }
})


