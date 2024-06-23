const { getDevice, switchDevice } = require('../Services/deviceServices');
const request = require('request');
const dotenv = require('dotenv');

dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "cde3bf9afce5487bb365120bd3fabbd2";
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "76afad7f021a4b608b18971c01986634";
const REDIRECT_URI = 'http://localhost:3000/auth/callback';

const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

global.access_token = '';

const login = (req, res) => {
    const scope = "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";
    const state = generateRandomString(16);

    const auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
    });

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
};

const callback = (req, res) => {
    const code = req.query.code;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            global.access_token = body.access_token;
            res.redirect('/ok');
        } else {
            res.status(response.statusCode).send(body);
        }
    });
};

const getToken = (req, res) => {
    res.json({
        access_token: global.access_token
    });
    console.log("AccessToken", global.access_token);
};

// const getDeviceHandler = (req, res) => {
//     const accessToken = req.headers.authorization.split(' ')[1];
//     getDevice(accessToken)
//         // .then(devices => res.json(devices))
//         // .catch(error => res.status(500).send(error.message));
// };
//
// const switchDeviceHandler = (req, res) => {
//     const accessToken = req.headers.authorization.split(' ')[1];
//     switchDevice(accessToken)
//         // .then(response => res.status(200).send(response))
//         // .catch(error => res.status(500).send(error.message));
// };

module.exports = {
    login,
    callback,
    getToken,
};