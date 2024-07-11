const makeRequest = require("../Utils/request");
const PlaylistInfo = require("../Models/DataTransferObject/PlaylistDTO");


const getPlaylist = async (accessToken, playlistId) => {
    const options = {
        method: 'GET',
        url: `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };
    try {
        const result = await makeRequest(options)
        console.log(result)
        const playlistInfo = new PlaylistInfo(result, 'id')
        return playlistInfo
    } catch (error) {
        console.error('Error fetching playlist_sample.json with Id:', error);
        throw error;
    }
}

const createPlaylist = async (accessToken, userId, playlistName) => {
    const options = {
        method: 'POST',
        url: `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        data: {
            name: playlistName
        }
    };

    return makeRequest(options);
};


const updatePlaylistDetails = async (accessToken, playlistId, details) => {
    const options = {
        method: 'PUT',
        url: `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        data: details
    };
    return makeRequest(options);
};

const deletePlaylist = async (accessToken, playlistId) => {
    const options = {
        method: 'DELETE',
        url: `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/followers`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    return makeRequest(options);
};


module.exports = {
    getPlaylist,
    createPlaylist,
    updatePlaylistDetails,
    deletePlaylist
}