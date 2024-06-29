const dotenv = require('dotenv');
const makeRequest = require("../Utils/request");

dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "cde3bf9afce5487bb365120bd3fabbd2";
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "76afad7f021a4b608b18971c01986634";
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';


const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const getAuthUrl = () => {
    const scope = "streaming user-read-email user-top-read user-read-private user-read-playback-state user-modify-playback-state";
    const state = generateRandomString(16);
    const REDIRECT_URI = CLIENT_URL + '/auth/callback';

    const auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
    });
    return `https://accounts.spotify.com/authorize/?${auth_query_parameters.toString()}`;
};

const getAccessToken = async (code) => {
    REDIRECT_URI = CLIENT_URL + '/auth/callback';
    const options = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: new URLSearchParams({
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        })
    };

    return await makeRequest(options);
};


const getRefreshAccessToken = async (refreshToken) => {
    const options = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    };

    return await makeRequest(options);
};

module.exports = {
    getAuthUrl,
    getAccessToken,
    getRefreshAccessToken
};
