const {getPlaylist, createPlaylist, updatePlaylistDetails, deletePlaylist} = require("../Services/trackPlaylistService");
const makeResponse = require("../Utils/response");
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
    createPlaylistHandler,
    updatePlaylistDetailsHandler,
    deletePlaylistHandler,
    getPlaylistHandler
}