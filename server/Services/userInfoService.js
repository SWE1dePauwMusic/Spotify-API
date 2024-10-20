const makeRequest = require("../Utils/request");
const PlaylistInfo = require("../Models/DataTransferObject/PlaylistDTO");
const ArtistInfo = require("../Models/DataTransferObject/ArtistDTO");
const {ListTracks} = require("../Models/DataTransferObject/TrackDTO");
const UserInfo = require("../Models/DataTransferObject/UserDTO");

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
        console.log(result)
        // Get only the name, popularity, id, and genres of the artist
        const artists = result.items.map(artist => new ArtistInfo(artist));
        return artists;
    } catch (error) {
        console.error('Error fetching top artists:', error);
        throw error;
    }
};

const getTopTracksOnSpotify = async (accessToken, limit, time_range) => {
    const params = {
        limit: limit,
        time_range: time_range // 4 weeks
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
        console.log(result)
        // Get only the name, popularity, id, and artists of the track
        const tracks = new ListTracks(result, 'top-tracks')
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
        const user = new UserInfo(display_name, id)
        return user;
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

        listPlaylists = playlistsData.items.map(playlist => new PlaylistInfo(playlist, false));
        console.log(listPlaylists)
        return listPlaylists;


    } catch (error) {
        console.error('Error fetching user playlists:', error);
        throw error;
    }
};



module.exports = {
    getTopArtistsOnSpotify,
    getTopTracksOnSpotify,
    getUserInfo,
    getUserPlaylists,
};
