const makeRequest = require("../Utils/request");
const PlaylistInfo = require("../Models/ResponseModels/RequestPlaylistModel");
const ArtistInfo = require("../Models/ResponseModels/RequestArtistModel");
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

const getTopArtistsOnSpotify = async (accessToken) => {
    const params = {
        limit: 10,
        time_range: 'short_term' // 4 weeks
    };

    const options = {
        method: 'GET',
        url: `${SPOTIFY_API_BASE_URL}/me/top/artists?${new URLSearchParams(params)}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const result = await makeRequest(options);
        // Get only the name, popularity, id, and genres of the artist
        const artists = new ArtistInfo(result)
        return artists;
    } catch (error) {
        console.error('Error fetching top artists:', error);
        throw error;
    }
};

const getTopTracksOnSpotify = async (accessToken, limit) => {
    const params = {
        limit: limit,
        time_range: 'short_term' // 4 weeks
    };
    const options = {
        method: 'GET',
        url: `${SPOTIFY_API_BASE_URL}/me/top/tracks?${new URLSearchParams(params)}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const result = await makeRequest(options);
        // Get only the name, popularity, id, and artists of the track
        const tracks = new PlaylistInfo(result, 'top-tracks')
        return tracks;
    } catch (error) {
        console.error('Error fetching top tracks:', error);
        throw error;
    }
};


const getUserInfo = async (accessToken) => {
    const options = {
        method: 'GET',
        url: `${SPOTIFY_API_BASE_URL}/me`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const userInfo = await makeRequest(options);
        const { display_name, email, id } = userInfo;
        return { displayName: display_name, email:email, id:id};
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

const getUserPlaylists = async (accessToken) => {
    const options = {
        method: 'GET',
        url: `${SPOTIFY_API_BASE_URL}/me/playlists`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const playlistsData = await makeRequest(options);
        const { items } = playlistsData;
        const playlists = items.map(playlist => ({
            name: playlist.name,
            id: playlist.id,
            images: playlist.images,
            trackNumber: playlist.tracks.total,
            links: playlist.tracks.href,
        }));
        console.log(playlistsData)
        return playlists;
    } catch (error) {
        console.error('Error fetching user playlists:', error);
        throw error;
    }
};

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
    getTopArtistsOnSpotify,
    getTopTracksOnSpotify,
    getUserInfo,
    getUserPlaylists,
    getPlaylist,
    createPlaylist,
    updatePlaylistDetails,
    deletePlaylist
};
