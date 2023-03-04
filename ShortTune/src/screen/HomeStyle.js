import { StyleSheet } from "react-native";


const Homestyle = StyleSheet.create({
    Outercomponent:{
       paddingTop:'2%',
       paddingLeft:'1%',
       paddingRight:'1%',
       height:'98%',
       marginTop:'10%',
       backgroundColor:'#333333'
    },
    innercomponent:{
        marginBottom:'5%',
       
    },
   
  
    albumrow:{
        display:'flex' ,
        height:210,
        width:'100%', 
        flexDirection:'row',
        justifyContent:'space-around'
      
    },
    heading:{
        color:'#FFFFFF'
    }


})


export default Homestyle;