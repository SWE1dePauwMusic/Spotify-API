const {getTopArtistsOnSpotify, getTopTracksOnSpotify, getUserInfo, getUserPlaylists, getPlaylist, deletePlaylist,
    createPlaylist, updatePlaylistDetails
} = require("../Services/userInfoService");
const makeResponse = require("../Utils/response");


const getTopArtistsHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log("Start fetching top artists");

        const topArtists = await getTopArtistsOnSpotify(accessToken);
        makeResponse(res, 200, { topArtists });
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

const getTopTracksHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const limit = req.query.limit;
        const time_range = req.query.time_range;
        console.log("Start fetching top tracks", limit);

        const playlistInfo = await getTopTracksOnSpotify(accessToken, limit, time_range);
        makeResponse(res, 200, { playlistInfo })
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

const getUserInfoHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log("Start fetching user info");

        const userInfo = await getUserInfo(accessToken);
        makeResponse(res, 200, { userInfo })
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

const getUserPlaylistsHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];

        console.log("Start fetching user playlists");

        const userPlaylists = await getUserPlaylists(accessToken);
        makeResponse(res, 200, { userPlaylists })
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};



module.exports = {
    getTopArtistsHandler,
    getTopTracksHandler,
    getUserInfoHandler,
    getUserPlaylistsHandler,
};


