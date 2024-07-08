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
        console.log("Start fetching top tracks", limit);

        const playlistInfo = await getTopTracksOnSpotify(accessToken, limit);
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

const getPlaylistHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { playlistId } = req.query;

        console.log("Start fetching playlist_sample.json", playlistId);

        const playlistInfo = await getPlaylist(accessToken, playlistId);

        makeResponse(res, 200, {playlistInfo});
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
}


const createPlaylistHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { userId, playlistName } = req.body;
        console.log("Start creating playlist_sample.json");

        const newPlaylist = await createPlaylist(accessToken, userId, playlistName);

        makeResponse(res, 201, { newPlaylist })
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message)
    }
};

const updatePlaylistDetailsHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { playlistId } = req.params;
        const details = req.body;
        console.log("Start updating playlist_sample.json details");

        const updatedPlaylist = await updatePlaylistDetails(accessToken, playlistId, details);

        makeResponse(res, 200, { updatedPlaylist })
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message)
    }
};

const deletePlaylistHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { playlistId } = req.params;
        console.log("Start deleting playlist_sample.json");

        await deletePlaylist(accessToken, playlistId);

        makeResponse(res, 204, null);
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

module.exports = {
    getTopArtistsHandler,
    getTopTracksHandler,
    getUserInfoHandler,
    getUserPlaylistsHandler,
    createPlaylistHandler,
    updatePlaylistDetailsHandler,
    deletePlaylistHandler,
    getPlaylistHandler
};


