// const express = require('express')
// const dotenv = require('dotenv')
// const request = require('request')
// const cors = require('cors');
// const fetch = require('node-fetch');
// const {getDevice, switchDevice} = require("./getAPI");
//
// const port = 5000;
//
// dotenv.config()
//
// const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "cde3bf9afce5487bb365120bd3fabbd2";
// const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "76afad7f021a4b608b18971c01986634";
// const DEVICE_ID = process.env.DEVICE_ID || "4f4b839c3c484ad2fc7ffca1c89cb2c203b9bc76"
// var app = express()
//
// app.use(cors())
//
// var generateRandomString = function (length) {  //
//     var text = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//
//     for (var i = 0; i < length; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
//   };
//
// global.access_token =''
//
// app.get('/auth/login',  async (req, res) => {
//     console.log("Enter login")
//     var scope = "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state"
//     var state = generateRandomString(16);
//
//     //
//     var auth_query_parameters = new URLSearchParams({
//         response_type: "code",
//         client_id: SPOTIFY_CLIENT_ID,
//         scope: scope,
//         redirect_uri: "http://localhost:3000/auth/callback",
//         state: state
//     })
//
//     console.log("Client", SPOTIFY_CLIENT_ID)
//     console.log("Secret", SPOTIFY_CLIENT_SECRET)
//
//   res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
// });
//
//
// app.get('/auth/callback', (req, res) => {
//     let code = req.query.code;
//
//     let authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         form: {
//             code: code,
//             redirect_uri: "http://localhost:3000/auth/callback",
//             grant_type: 'authorization_code'
//         },
//         headers: {
//             'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')),
//             'Content-Type' : 'application/x-www-form-urlencoded'
//         },
//         json: true
//     };
//
//
//     request.post(authOptions, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//             access_token = body.access_token; //global var?
//
//             console.log(response.body)
//             res.redirect('/ok')
//         }
//     });
// });
//
// app.get('/auth/token', (req, res) => {
//     res.json({
//         access_token: access_token
//     })
// })
//
// app.get('/auth/getDevice', (req, res) => {
//     //token in header authentication bearer
//     const accessToken = req.headers.authorization.split(' ')[1];
//     console.log("received token: ",  accessToken)
//     console.log("start getting deviceId")
//     getDevice(accessToken);
// });
//
// app.put('/auth/switchDevice', (req, res) => {
//     //token in header authentication bearer
//     const accessToken = req.headers.authorization.split(' ')[1];
//     console.log("received token: ",  accessToken)
//     console.log("start switching device")
//     switchDevice(accessToken);
// });
//
//
//
//
//
const {callback, getToken, login} = require("./Controller/authController");
const {getDeviceHandler, switchDeviceHandler} = require("./Controller/deviceController");
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // for parsing application/json

app.get('/auth/login', login);
app.get('/auth/callback', callback);
app.get('/auth/token', getToken);
app.get('/auth/getDevice', getDeviceHandler);
app.put('/auth/switchDevice', switchDeviceHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});