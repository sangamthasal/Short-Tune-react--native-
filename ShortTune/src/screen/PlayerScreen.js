import { View, Text,Image,StyleSheet ,TouchableOpacity} from 'react-native'
import { Slider } from 'native-base';
import React, { useState,useEffect } from 'react'
import { MaterialIcons,AntDesign } from '@expo/vector-icons';
import {Audio} from 'expo-av';

const PlayerScreen = ({route}) => {
  const [sound, setSound] = useState(null);
  const [songname,setname] = useState('')
  const [Data,setData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
 
 
 
 console.log('image to show',route.params.Imagetoshow)
 //const songUrl= 'https://p.scdn.co/mp3-preview/24f200411ae44bd97d580719e5d23096bb8e1d83?cid=4d936fa291cf421083503b258650e149'

 useEffect(()=>{

  const songData = route.params.datalist.map((data)=>{

    return{
      
      Songname: data.name,
      PreviewUrl:data.Previewurl
    }
  })
  
     setData(songData)
     
 },[route])

 console.log('data',Data)


   const loadsound= async()=>{
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: Data[currentSongIndex].PreviewUrl },
        { shouldPlay: true },
        onPlaybackStatusUpdate
       
      );
      setSound(sound);
      setname(Data[currentSongIndex].Songname)
      const status = await sound.getStatusAsync();
      setDurationMillis(status.durationMillis);
   
    } catch (error) {
      console.log('Error occurred while loading the song.', error);
    }

   }

   const playSound = async () => {
    try {

     
      setIsPlaying(true);
      await loadsound();
      await sound.playSound() 
      
    } catch (error) {
      console.log('Error occurred while playing the song.', error);
    }
      
   };


   const onPlaybackStatusUpdate = async(playbackStatus) => {

    console.log('gets called')
    if (playbackStatus.didJustFinish) {
      setIsPlaying(false)
      await sound.unloadAsync()
     pauseSound();
     await nextSong();
    }
  };

 
   const pauseSound = async () => {
     try {
       await sound.pauseAsync();
       setIsPlaying(false);
     } catch (error) {
       console.log('Error occurred while pausing the song.', error);
     }
   };
 
   const nextSong = async () => {

    console.log('get called next')
     try {
      if(sound){
        await sound.unloadAsync();
      }
      
       setCurrentSongIndex(
         currentSongIndex == Data.length - 1 ? 0 : currentSongIndex + 1
        
       );
       playSound();
     } catch (error) {
       console.log('Error occurred while loading the next song.', error);
     }
   };
 
   const previousSong = async () => {
    if(sound){
      await sound.unloadAsync()
    }
     try {
      
       setCurrentSongIndex(
         currentSongIndex === 0 ? Data.length - 1 : currentSongIndex - 1
       );
       playSound();
     } catch (error) {
       console.log('Error occurred while loading the previous song.', error);
     }
   };
   
  

   return (
     <View style={{display:'flex',justifyContent:'center',alignItems:'center',gap:10,backgroundColor: '#333333'}}>
    <View style={{width:'100%',height:'60%' ,display:'flex',alignItems:'center',justifyContent:'space-around',marginTop:'10%'}}>
    <View style={{width:'70%',height:'50%' ,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Image source={{uri:route.params.Imagetoshow}} style={{height:300,width:300,borderRadius:50}}/>
    </View>
      <View style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center' }}>
      <Text style={{fontSize:14,color:'#FFFFFF'}}>Song Name:</Text>
        {
          Data? <Text style={{display:'flex',fontSize:20,textAlign:'center',color:'#FFFFFF'}}> {songname} </Text>: <Text style={{display:'flex',textAlign:'center'}}> loading </Text>
        }
      </View>
    </View>
    <View style={{display:'flex',justifyContent:'center',alignItems:'center',height:'40%',width:'100%'}}>
    <View  style={styles.container}>
       
       <TouchableOpacity onPress={() => previousSong()}>
       <MaterialIcons name="arrow-back-ios" size={24} color="black" />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => (isPlaying ? pauseSound() : playSound())}>
         <MaterialIcons size={40} name={isPlaying ? 'pause': 'play-arrow'} />
       </TouchableOpacity>
       <TouchableOpacity onPress={() => nextSong()}>
       <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
       </TouchableOpacity>
       </View>
      </View>
     </View>
   );
 };

 const styles = StyleSheet.create({
   container: {
     flexDirection: 'row',
     paddingHorizontal:50,
     justifyContent: 'space-around',
     alignItems: 'center',
     width: '100%',
     height: '30%',
     borderRadius:50,
     backgroundColor: '#fff',
     borderTopWidth: 1,
     borderTopColor: '#eee',
   },
 });

 export default PlayerScreen;
 