import { View, Text,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Heading, ScrollView,VStack } from 'native-base'
import AlbumCard from '../Album/AlbumCard'
import url1 from '../assets/image/demo.png'
import url2 from '../assets/image/songcard.jpg'
import Homestyle from './HomeStyle'
import Controller from '../MusicController/Controller'
import SpotifyWebApi from 'spotify-web-api-node';
import url3 from '../assets/image/MyAppLogo.jpg'

const spotifyApi = new SpotifyWebApi({
  clientId:'4d936fa291cf421083503b258650e149'
})

const HomeScreen = ({route,navigation}) => {



  const [INReleases, setinReleases] = useState([]);
  const [featuredplaylists,setfeaturedplaylists] = useState([]);
  const [categorieslist, setcategorieslist]= useState([]);
  const [forcategory,setplaylistforcategory]=useState([]);
  const [UsReleases, setusReleases] = useState([]);


  const {accessToken}= route.params;

  useEffect(() => {

    spotifyApi.setAccessToken(accessToken)


    spotifyApi.getNewReleases({ limit: 6, offset: 0,country:'IN'})
    .then(response => {
      
    
      const INnewRelease = response.body.albums.items.map(album => {
       
        return {
          Mainname: album.name,
          artist: album.artists[0].name,
          image: album.images[1].url,
          url: album.external_urls.spotify,
          albumid:album.id
        };
      });
      setinReleases(INnewRelease);
     
      }).catch( err => {
      console.log('Something went wrong when retrieving recommendations', err);
      })



  spotifyApi.getFeaturedPlaylists({ limit : 5, offset: 1, country: 'IN', locale: 'hi_IN', timestamp:'2022-4-23T09:00:00' })
  .then(response => {

    //console.log(response.body.playlists.items.map((data)=> { return data.external_urls} ))
    const featuredplay_list = response.body.playlists.items.map((album)=>{
     
      return {
        Mainname: album.name,
        artist: album.owner.display_name,
        image: album.images[0].url,
        url: album.external_urls,
        playlistid:album.id
      };
    })

   setfeaturedplaylists(featuredplay_list)
    })
    .catch( err => {
    console.log('Something went wrong when retrieving recommendations', err);
    })

  spotifyApi.getCategories({ limit : 5, offset: 0, country: 'IN', locale: 'en_IN'})
    .then(response => {

     
         
          const categories_list= response.body.categories.items.map((category)=>{
            let imgurl = category.icons.map((icon)=>{
              return icon.url
                  
              
            });
           
            return{
              Mainname: category.name,
           // artist: album.owner.display_name,
              image:`${imgurl}`,
             // url: 
             categoryid:category.id
            }
          })
          setcategorieslist(categories_list);


      })
      .catch( err => {
      console.log('Something went wrong when retrieving recommendations', err);
      })
 
 
    

  spotifyApi.getPlaylistsForCategory('party', {
    country: 'IN',
    limit : 4,
    offset : 0
  })
.then((data)=> {
  
  
  const forcategory=data.body.playlists.items.map((data)=>{
    let imgurl = data.images.map((icon)=>{
      return icon.url
    });
  return{
    Mainname: data.name,
   // artist: album.owner.display_name,
    image: `${imgurl}`,
    playlistid:data.id
   // url: album.external_urls.spotify,
  };
 

   })
   setplaylistforcategory(forcategory)
}).catch(err =>{
  console.log("Something went wrong!", err);
});

spotifyApi.getNewReleases({ limit: 6, offset:6,country:'US'})
.then(response => {

///  console.log(response)
  const UsnewRelease = response.body.albums.items.map(album => {
    
    return {
      Mainname: album.name,
      artist: album.artists[0].name,
      image: album.images[1].url,
      url: album.external_urls.spotify,
      albumid:album.id
      
    };
  });
  setusReleases(UsnewRelease);
 
  }).catch( err => {
  console.log('Something went wrong when retrieving recommendations', err);
  })


 


  },[]);
   


  return (
 <>
    <View style={Homestyle.Outercomponent}>
    
 
     
       
        <Heading style={Homestyle.heading} fontStyle="italic" size='lg'>
            ShortTune
        </Heading>
        
      <ScrollView> 
      <View style={Homestyle.innercomponent} >
        <VStack >
  
      <Heading style={Homestyle.heading} size='sm'>New release in India</Heading>
      <View style={Homestyle.albumrow}>
   
      <ScrollView horizontal={true}>
        { 
           INReleases.map((release,id)=>  

            <AlbumCard data={release} key={id} navigation={navigation}/>
         
          )
        }
       </ScrollView>
       </View>

       <Heading style={Homestyle.heading} size='sm'>More of what you like</Heading>
        <View style={Homestyle.albumrow} >
        <ScrollView horizontal={true} >
        { 
             featuredplaylists.map((list,id)=>  

             <AlbumCard data={list} key={id} navigation={navigation} />
         
          )
        }
       </ScrollView>
        </View>

        <Heading style={Homestyle.heading} size='sm'>Category list</Heading>
        <View style={Homestyle.albumrow}>
        <ScrollView horizontal={true}>
        { 
            categorieslist.map((listdata,id)=>  

            <AlbumCard data={listdata} key={id} navigation={navigation}/>
         
            )
        }
       </ScrollView>
        </View>

        <Heading style={Homestyle.heading} size='sm'>Party Albums</Heading>
        <View style={Homestyle.albumrow}>
        <ScrollView horizontal={true}>
        { 
           forcategory.map((data,id)=>  

           <AlbumCard data={data} key={id}navigation={navigation} />
          )
        }
       </ScrollView>
        </View>

        <Heading style={Homestyle.heading} size='sm'>New release in Us</Heading>
       
        <View style={Homestyle.albumrow}>
        <ScrollView horizontal={true}>
        { 
            UsReleases.map((data,id)=>  

            <AlbumCard data={data} key={id}navigation={navigation} />
          )
        }
       </ScrollView>
        </View>
      </VStack>

    
      </View>

      </ScrollView>
     
      
    </View>
   
 </>    
  )
}

export default HomeScreen

