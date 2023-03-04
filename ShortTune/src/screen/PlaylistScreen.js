import { View, Text,Image ,TouchableOpacity,FlatList} from 'react-native'
import React,{useEffect, useState} from 'react'
import SpotifyWebApi from 'spotify-web-api-node';
import { MaterialIcons } from '@expo/vector-icons';


const PlaylistScreen = ({route,navigation}) => {



 console.log(navigation)
  
  
 const [AId, setAId]= useState('')
 const [PId, setPId]= useState('')
 const [CId, setCId]= useState('')
  const [ScreenData,setScreenData]= useState([])
  const [isPlaying, setIsPlaying] = useState(false);
  const { accessToken } = route.params;
  

  console.log('Data is passing from home screen to Playlist screen ')
  console.log('Operation will work successfll')
   
    
  console.log('playlist ',route.params.PlaylistId)
  console.log('category ',route.params.CategoryId)
  console.log('album ',route.params.AlbumId)
  

  useEffect(()=>{
    if(route.params.AlbumId){
        setAId(route.params.AlbumId)
    }if(route.params.PlaylistId){
      setPId(route.params.PlaylistId)
    }if(route.params.CategoryId){
      setCId(route.params.CategoryId)
    }

  },[route.params.AlbumId|| route.params.CategoryId || route.params.PlaylistId])
 
  useEffect(() => {
  
    if(AId){
      // create a new instance of the SpotifyWebApi with your access token
      const spotifyApi = new SpotifyWebApi({
        
        clientId:'4d936fa291cf421083503b258650e149'
      });

    spotifyApi.setAccessToken(accessToken)
    spotifyApi.getAlbumTracks(AId)
    .then(data => {
      
      console.log('------',data.body.items.map((data)=>{ return{   data }}))
      // Extract the track objects from the album data
     const showdata= data.body.items.map((data)=>{
      if(data.preview_url)
         { return{
            
           
            name: data.name,
            Previewurl: data.preview_url,
           


          }
        }
      }).filter(Boolean)
      // Log the preview URL for each track
      setScreenData(showdata)
    })
    .catch(error => {
      console.error(error);
    });
    }
 
  },[AId]);

  useEffect(() => {

    if(PId)
  {
    // create a new instance of the SpotifyWebApi with your access token
    const spotifyApi = new SpotifyWebApi({
      
      clientId:'4d936fa291cf421083503b258650e149'
    });

  spotifyApi.setAccessToken(accessToken)
    
  spotifyApi.getPlaylistTracks(PId, { limit: 20 })
  .then((data)=>{
    // `data` contains an array of track objects
    const showdata = data.body.items.map((data)=>{
  if(data.track.preview_url){
      return{
            name:data.track.album.name,
            Previewurl:data.track.preview_url
      }}
    }).filter(Boolean);
    setScreenData(showdata)
    // Log the name and preview URL of each track
    
  }).catch(err =>{
    console.log('Something went wrong!', err);
  });
  }

},[PId]);

// Api call for get the playlist for category
useEffect(()=>{
if(CId){
    // create a new instance of the SpotifyWebApi with your access token
    const spotifyApi = new SpotifyWebApi({
        
      clientId:'4d936fa291cf421083503b258650e149'
    });
 
    // set the accesstoken 
  spotifyApi.setAccessToken(accessToken)


  //Api to spotify api for get the playlist by CId ie. CategoryId
  spotifyApi.getPlaylistsForCategory( CId, {
    country: 'IN',
    limit : 1,
    offset : 0
  })
.then((data)=> {
  
  console.log('last api call ',data)
  data.body.playlists.items.map((data)=>{
    let imgurl = data.images.map((icon)=>{
      return icon.url
    });
    
   
    setPId(data.id)
   })
 
}).catch(err =>{
  console.log("Something went wrong!", err);
});
}
},[CId])


const handlepress=async(Imageurl)=>{
  

  setIsPlaying(!isPlaying)
  (isPlaying  ? null:navigation.navigate('PlayerScreen',{datalist:ScreenData,Imagetoshow:Imageurl}))
  
}


  return (
    <View style={{flex:1,backgroundColor:'#333333'}}>
    
       
        <View style={{ alignItems: 'center', paddingTop: 20 ,marginTop:'10%',backgroundColor:'#E6E6E620'}}>
          <Image source={{ uri: route.params.Imageurl }} style={{ width: 200, height: 200 }} />
        </View>
        <View style={{width:'100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <View style={{flex:1 ,paddingLeft:10}}>
            <Text style={{ fontSize: 25,color:'#F2F2F2',fontWeight:'bold' }}>{route.params.Listname}</Text>
          </View>
          <View style={{paddingRight:10}} >
        <TouchableOpacity  onPress={()=>{handlepress(route.params.Imageurl)}}>
         <Text style={{color:'#F2F2F2'}}>Play All</Text>
         <MaterialIcons name='play-arrow' size={30} color='#ffffff'/>
        </TouchableOpacity>
          </View>
        </View>
        {console.log(ScreenData)}
     {  
        ScreenData.length > 0?

        (<>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',rowGap:'10',width:'50%'}}>
        <Text style={{color:'#F2F2F2'}}>List of songs</Text>
        <MaterialIcons name='list' color='#F2F2F2' size={25}/>
        </View>
        <FlatList
        data={ScreenData}
      
        keyExtractor={item => item.id}
        renderItem={({ item,index}) => (
          
          <TouchableOpacity key={index} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}>
            <Text style={{ fontSize: 17,color:'#F2F2F2',fontWeight:'300' }}>{item.name}</Text>
           
          </View>
        </TouchableOpacity>
        )}
      />
      </>):
     
      (<Text style={{ textAlign: 'center', marginTop: 20,color:'#F2F2F2' }}>No songs to play</Text>)
            
    }
        
     

      
    </View>
  )
}

export default PlaylistScreen