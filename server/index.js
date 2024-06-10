const express = require('express')
const dotenv = require('dotenv')
const request = require('request')
const cors = require('cors');
const fetch = require('node-fetch');

const port = 5000;

dotenv.config()

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

var app = express()

app.use(cors())

global.access_token =''

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  

app.get('/auth/login',  async (req, res) => {
    var scope = "streaming user-read-email user-read-private"
    var state = generateRandomString(16);

    console.log('[haha]: ', SPOTIFY_CLIENT_ID);

    var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: "http://localhost:3000/auth/callback",
        state: state
    })

    const apiCheck = await fetch("https://accounts.spotify.com/authorize",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
  });
    const data = apiCheck;
    console.log(SPOTIFY_CLIENT_ID)
    const apiToken = data.access_token;
    console.log("apitoken:", apiToken);


  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

app.get('/auth/callback', (req, res) => {
    var code = req.query.code;

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: "http://localhost:3000/auth/callback",
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };

  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        console.log(response.body)
        res.redirect('/ok')
      }
    });
}); 

app.get('/auth/token', (req, res) => {
    res.json({
        access_token: access_token
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});