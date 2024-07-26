const {getPlaylist, createPlaylist, updatePlaylistDetails, deletePlaylist, getMyFavPlaylist, updateMyFavPlaylist,
    deleteMyFavPlaylist
} = require("../Services/trackPlaylistService");
const makeResponse = require("../Utils/response");


const getPlaylistHandler = async (req, res) => {
    console.log("Start get Playlist by Id....")
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { playlistId } = req.query;

        const playlistInfo = await getPlaylist(accessToken, playlistId);

        makeResponse(res, 200, {playlistInfo});
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
}

const createPlaylistHandler = async (req, res) => {
    console.log("Start create playlist ...")
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { userId, playlistName } = req.body;

        const newPlaylist = await createPlaylist(accessToken, userId, playlistName);

        makeResponse(res, 201, { newPlaylist })
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message)
    }
};

const updatePlaylistDetailsHandler = async (req, res) => {
    console.log("Start updating playlist...")
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { playlistId } = req.params;
        const details = req.body;

        const updatedPlaylist = await updatePlaylistDetails(accessToken, playlistId, details);

        makeResponse(res, 200, { updatedPlaylist })
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message)
    }
};

const deletePlaylistHandler = async (req, res) => {
    console.log("Start deleting playlist...")
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { playlistId } = req.params;

        await deletePlaylist(accessToken, playlistId);

        makeResponse(res, 204, null);
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
};

const getMyFavPlaylistHandler = async (req, res) => {
    console.log("Start get my liked playlist....")
    try {
        const accessToken = req.headers.authorization.split(' ')[1];

        const playlistInfo = await getMyFavPlaylist(accessToken);

        makeResponse(res, 200, {playlistInfo});
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);

    }
}

const updateTracksMyFavPlaylistHandler = async (req, res) => {
    console.log("Start updating my liked playlist...")
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const details = req.body;

        const updatedPlaylist = await updateMyFavPlaylist(accessToken, details);

        makeResponse(res, 200, {message: "Successfully update the playlist"} )
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message)
    }

}

const deleteTracksMyFavPlaylistHandler = async (req, res) => {
    console.log("Start deleting tracks from my liked playlist...")
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const details = req.body;

        await deleteMyFavPlaylist(accessToken, details);

        makeResponse(res, 200, {message: "Successfully deleted tracks from my favorite playlist"});
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
}


module.exports = {
    createPlaylistHandler,
    updatePlaylistDetailsHandler,
    deletePlaylistHandler,
    getPlaylistHandler,
    getMyFavPlaylistHandler,
    updateTracksMyFavPlaylistHandler,
    deleteTracksMyFavPlaylistHandler,
}