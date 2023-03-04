import { View, Text,ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';
import AlbumCard from '../Album/AlbumCard';

const spotifyApi = new SpotifyWebApi({
  clientId:'4d936fa291cf421083503b258650e149'
})

const ReasultScreen = ({route,navigation}) => {


    const[ResultList,setplaylistforsearch] = useState([])
    // console.log(route.params.data.accessToken)
   

    useEffect(()=>{
        console.log('passed tone' , route.params.data.accessToken)
        spotifyApi.setAccessToken(route.params.data.accessToken)
        spotifyApi.searchPlaylists(route.params.Expressionvalue,{limit:8})
        .then(data=>{
          console.log('Found playlists are', data.body.playlists.items.map((data)=>{return data.name,data.id}));
          const resultdata = data.body.playlists.items.map(data=>{
            return{
                Mainname:data.name,
                artist: data.owner.display_name,
                image: data.images[0].url,
                url: data.external_urls.spotify,
                playlistid:data.id
            }
          });
          setplaylistforsearch(resultdata)
        }).catch( err => {
            console.log('Something went wrong when retrieving recommendations', err);
        })
  
    },[route.params.Expressionvalue])

   

  return (
    <View style={{height:'100%',backgroundColor:'#333333'}}>
        <View style={{height:'98%'}} >

        <Text style={{fontSize:20,fontWeight:'500',color:'white'}}>Search result for {route.params.Expressionvalue}</Text>
        <View style={{height:'97%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <ScrollView >
        { 
            ResultList.map((result,id)=>  
            <View key={id} style={{display:'flex',flexDirection:'row',alignItems:'center',height:'12%',backgroundColor:'#333333',borderBottomColor:'#999999',borderBottomWidth:2 ,marginTop:3}}>
            <AlbumCard data={result} key={id} navigation={navigation}/>
            <View style={{width:'50%',justifyContent:'center',alignItems:'flex-start'}}>
              <View><Text style={{fontSize:17,color:'white'}}>Details of Playlist </Text></View>
              <Text style={{fontSize:14,color:'white'}}>Created by: {result.artist}</Text>
              <Text style={{fontSize:14,color:'white'}}>Playlist Name: {result.Mainname}</Text>
              </View>
             
            </View>
            
          )
        }
       </ScrollView>
        </View>
        </View>
    </View>
  )
}

export default ReasultScreen