const makeRequest = require("../Utils/request");
const PlaylistInfo = require("../Models/DataTransferObject/PlaylistDTO");

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

const getPlaylistWithIdService = async (accessToken, playlistId) => {
    const options = {
        method: 'GET',
        url: `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };
    try {
        const result = await makeRequest(options)
        // console.log(result)
        const playlistInfo = new PlaylistInfo(result, true)
        return playlistInfo
    } catch (error) {
        console.error('Error fetching playlist_sample.json with Id:', error);
        throw error;
    }
}

const createPlaylist = async (accessToken, userId, playlistName) => {
    const options = {
        method: 'POST',
        url: `${SPOTIFY_API_BASE_URL}/`,
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


const updatePlaylistWithIdService = async (accessToken, playlistId, details) => {
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


const deletePlaylistWithIdService = async (accessToken, playlistId) => {
    const options = {
        method: 'DELETE',
        url: `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/followers`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    return makeRequest(options);
};

//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

const getMyFavPlaylist = async (accessToken) => {
    const options = {
        method: 'GET',
        url: `${SPOTIFY_API_BASE_URL}/me/tracks`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            limit: 50
        }
    }
    try {
        const result = await makeRequest(options)
        const playlistInfo = new PlaylistInfo(result, 'my-fav')
        return playlistInfo
    } catch (error) {
        console.error('Error fetching my favorite playlist', error);
        throw error;
    }
}

const updateMyFavPlaylist = async (accessToken, details) => {
    const options = {
        method: 'PUT',
        url: `${SPOTIFY_API_BASE_URL}/me/tracks`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        data: details
    }

    try {
        await makeRequest(options)
    } catch(error) {
        console.error('Error updating my favorite playlist', error);
        throw error;
    }
}

const deleteMyFavPlaylist = async (accessToken, details) => {
    const options = {
        method: 'DELETE',
        url: `${SPOTIFY_API_BASE_URL}/me/tracks`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        data: details
    }

    console.log(options.data)
    try {
        await makeRequest(options)
    } catch(error) {
        console.error('Error delete track from my favorite playlist', error);
        throw error;
    }
}

const getAudioFeatures = async (accessToken, trackId) => {
    const options = {
        method: 'GET',
        url: `${SPOTIFY_API_BASE_URL}/audio-analysis/${trackId}`,
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    try {
        const result = await makeRequest(options)
        return result
    } catch (error) {
        console.error('Error fetching audio features', error);
        throw error;
    }
}

const getPlaylistAudioFeatures = async (accessToken, playlistId) => {
    //task 1: Get playlist
    //loop through each song and get the audio Analysis of each song
    //return the audio features of the playlist

    const playlist = await getPlaylistWithIdService(accessToken, playlistId);
    const tracks = playlist.trackList;
    const audioFeatures = [];
    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        const trackId = track.spotifyId;
        const audioFeature = await getAudioFeatures(accessToken, trackId);
        audioFeatures.push(audioFeature);
    }
    const lengthLs = audioFeatures.length;
    return {lengthLs, audioFeatures};
}





module.exports = {
    getPlaylistWithIdService,
    createPlaylist,
    updatePlaylistWithIdService,
    deletePlaylistWithIdService,


    getMyFavPlaylist,
    updateMyFavPlaylist,
    deleteMyFavPlaylist,

    getPlaylistAudioFeatures,
}