const {getTopArtistsOnSpotify, getTopTracksOnSpotify, getUserInfo, getUserPlaylists, getPlaylist, deletePlaylist,
    createPlaylist, updatePlaylistDetails
} = require("../Services/userInfoService");
const makeResponse = require("../Utils/response");


const getTopArtistsHandler = async (req, res) => {
    console.log("Start fetching top artists...");
    try {
        const accessToken = req.headers.authorization.split(' ')[1];

        const topArtists = await getTopArtistsOnSpotify(accessToken);
        makeResponse(res, 200, { topArtists });
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

const getTopTracksHandler = async (req, res) => {
    console.log("Start fetching top tracks...");

    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const limit = req.query.limit;
        const time_range = req.query.time_range;

        const playlistInfo = await getTopTracksOnSpotify(accessToken, limit, time_range);
        makeResponse(res, 200, { playlistInfo })
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

const getUserInfoHandler = async (req, res) => {
    console.log("Start fetching user info...");

    try {
        const accessToken = req.headers.authorization.split(' ')[1];

        const userInfo = await getUserInfo(accessToken);
        makeResponse(res, 200, { userInfo })
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

const getUserPlaylistsHandler = async (req, res) => {
    console.log("Start fetching user playlists...");
    try {
        const accessToken = req.headers.authorization.split(' ')[1];

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


