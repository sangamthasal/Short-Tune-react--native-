

import { StyleSheet } from "react-native";

const AlbumStyles = StyleSheet.create({
  
outercontainer:{
  height:250,
  width:180,
  borderRadius:10,
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#E6E6E620',
  margin:2,
  borderRadius:10,
  marginBottom:10
  

},


imagestyle:{
  width:150,
  height:140,
  marginTop:20,
  borderRadius:10

  
},
stylefortext:{
  color:'#F2F2F2',
  fontSize:14,
  fontWeight:'bold'
},

playPauseButton: {
  position: 'absolute',
  opacity:10,
  bottom: 58,
  right: 8,
  width: 38,
  height: 38,
  borderRadius: 24,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
},

  
})

export default AlbumStyles;