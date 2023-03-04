const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node')
const cors =require("cors")
const bodyparser = require("body-parser")
const app = express()
app.use(cors())
app.use(bodyparser.json())



app.post('/refresh',(req,res)=>{
    const refreshToken= req.body.refreshToken
    console.log('hi')
    const spotifyApi = new SpotifyWebApi({
        redirectUri:'exp://192.168.216.114:19000/',
        clientId:'4d936fa291cf421083503b258650e149',
        clientSecret:'838098a430014abdb5c6a17b86fbe8cd',
        refreshToken
    })

    spotifyApi.refreshAccessToken().then((data)=>{
            console.log("the access token has been refreshed");
                console.log(data.body)
                res.json({
                    accessToken:data.body.access_token,
                    refreshToken:data.body.refresh_token,
                 
                    expiresIn:data.body.expires_in
                })


          //  spotifyApi.setAccessToken(data.body['access_token']);
        }).catch((err)=>{
            console.log(err)
            res.status(400).send('faild')
        })
})


app.post('/login',(req,res)=>{
  
    console.log(req.body.code)
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri:'exp://192.168.216.114:19000/',
        clientId:'4d936fa291cf421083503b258650e149',
        clientSecret:'838098a430014abdb5c6a17b86fbe8cd'
    })


    spotifyApi.authorizationCodeGrant(code).then(data=>{
        res.json({
            accessToken:data.body.access_token,
            refreshToken:data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch((err)=>{
        console.log(err)
        res.status(400).send('faild')
        
        
    })
})




app.listen(3001,()=>{
    console.log('server is running on 3001')
})