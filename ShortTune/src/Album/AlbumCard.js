import { View, Text,Image,  TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import AlbumStyles from './AlbumStyles'
import { MaterialIcons } from '@expo/vector-icons'



const AlbumCard = (props,{navigation}) => {


    
const [isPlaying, setIsPlaying] = useState(false);

const handlePlayPause = () => {
    setIsPlaying(!isPlaying);

   
    
    
  };




 return(
<TouchableOpacity activeOpacity={0.8} onPress={()=>{ props.navigation.navigate('PlaylistScreen',{ Listname:props.data.Mainname, AlbumId:props.data.albumid, PlaylistId:props.data.playlistid, CategoryId:props.data.categoryid,Imageurl:props.data.image,Nav:navigation })}}>
    <View style={AlbumStyles.outercontainer}  >
    
            <View style={{width:160,height:140 ,display:'flex',justifyContent:'center',alignItems:'center'}} >
            <Image source={{uri: props.data.image}} style={AlbumStyles.imagestyle}  alt="Not showing" />
            </View>
            <View style={{height:60,width:160,justifyContent:'center',alignItems:'center',marginTop:5}} >
            <Text style={AlbumStyles.stylefortext}>{props.data.Mainname}</Text>
            </View>
  
    </View>
</TouchableOpacity>
 )
}
export default AlbumCard

