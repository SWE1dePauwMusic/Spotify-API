
const {callback, getToken, login, refreshAccessToken} = require("./Controller/authController");
const {getDeviceHandler, switchDeviceHandler} = require("./Controller/deviceController");
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {searchSongHandler, recommendSongHandler} = require("./Controller/searchController");
const {getTopArtistsHandler, getTopTracksHandler, getUserInfoHandler, getUserPlaylistsHandler} = require("./Controller/userInfoController");
const {getPlaylistHandler, getMyFavPlaylistHandler, deleteTracksMyFavPlaylistHandler, updateTracksMyFavPlaylistHandler} = require("./Controller/trackPlaylistController");


dotenv.config();

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json()); // for parsing application/json

//Auth
app.get('/auth/login', login);
app.get('/auth/callback', callback);
app.get('/auth/token', getToken);
app.post('/auth/refreshToken', refreshAccessToken);

app.get('/auth/getDevice', getDeviceHandler);
app.put('/auth/switchDevice', switchDeviceHandler);

//Search
app.get('/search', searchSongHandler);
app.get('/recommendations', recommendSongHandler);
//User-top
app.get('/top-artists', getTopArtistsHandler);
app.get('/top-tracks', getTopTracksHandler);
//User-info
app.get('/user-info', getUserInfoHandler);
app.get('/user-playlists', getUserPlaylistsHandler);
app.get('/get-playlist', getPlaylistHandler)

//Liked list
app.get('/my-fav', getMyFavPlaylistHandler)
app.delete('/my-fav', deleteTracksMyFavPlaylistHandler)
app.put('/my-fav', updateTracksMyFavPlaylistHandler)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});