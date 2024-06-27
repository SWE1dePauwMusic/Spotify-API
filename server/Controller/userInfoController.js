const {getTopArtistsOnSpotify, getTopTracksOnSpotify, getUserInfo, getUserPlaylists, getPlaylist, deletePlaylist,
    createPlaylist, updatePlaylistDetails
} = require("../Services/userInfoService");



const getTopArtistsHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log("Start fetching top artists");

        const topArtists = await getTopArtistsOnSpotify(accessToken);

        res.status(200).json({ topArtists });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const getTopTracksHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log("Start fetching top tracks");

        const topTracks = await getTopTracksOnSpotify(accessToken);

        res.status(200).json({ topTracks });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const getUserInfoHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log("Start fetching user info");

        const userInfo = await getUserInfo(accessToken);

        res.status(200).json({ userInfo });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const getUserPlaylistsHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log("Start fetching user playlists");

        const userPlaylists = await getUserPlaylists(accessToken);

        res.status(200).json({ userPlaylists });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const getPlaylistHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { playlistId } = req.query;

        console.log("Start fetching playlist", playlistId);

        const playlist = await getPlaylist(accessToken, playlistId);
        console.log(playlist.name, playlist.tracks.items.length)
        res.status(200).json({ name: playlist.name, length: playlist.tracks.items.length });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }

}

const createPlaylistHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { userId, playlistName } = req.body;
        console.log("Start creating playlist");

        const newPlaylist = await createPlaylist(accessToken, userId, playlistName);

        res.status(201).json({ newPlaylist });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const updatePlaylistDetailsHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { playlistId } = req.params;
        const details = req.body;
        console.log("Start updating playlist details");

        const updatedPlaylist = await updatePlaylistDetails(accessToken, playlistId, details);

        res.status(200).json({ updatedPlaylist });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const deletePlaylistHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { playlistId } = req.params;
        console.log("Start deleting playlist");

        await deletePlaylist(accessToken, playlistId);

        res.status(204).send();
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
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


