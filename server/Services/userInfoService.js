const makeRequest = require("../Utils/request");
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
        const artists = result.items.map(artist => ({
            name: artist.name,
            popularity: artist.popularity,
            id: artist.id,
            genres: artist.genres,
        }));
        console.log('Top artists:', artists);
        return artists;
    } catch (error) {
        console.error('Error fetching top artists:', error);
        throw error;
    }
};

const getTopTracksOnSpotify = async (accessToken) => {
    const params = {
        limit: 1,
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
        const tracks = result.items.map(track => ({
            name: track.name,
            popularity: track.popularity,
            id: track.id,
            artists: track.artists.map(artist => artist.name),
            images: track.album.images.map(
                image => {
                    return {
                        url: image.url,
                        height: image.height,
                        width: image.width
                    }
                }
            ),
            duration: track.duration_ms,

        }));
        console.log('Top tracks:', tracks);
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
        const playlistInfo = {
            name: result.name,
            length: result.tracks.items.length,
            images: result.images,
            id: result.id,
            link: result.tracks.href,
            trackList: result.tracks.items.map(track => ({
                name: track.track.name,
                artists: track.track.artists.map(artist => artist.name),
                duration: track.track.duration_ms,
                id: track.track.id,
                images: track.track.album.images,
            }))

        }
        console.log(playlistInfo)
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
