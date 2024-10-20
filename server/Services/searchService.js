const PlaylistInfo = require("../Models/DataTransferObject/PlaylistDTO");
const makeRequest = require("../Utils/request");
const {createPlaylist} = require("./PlaylistService");
const {response} = require("express");
const {ListTracks} = require("../Models/DataTransferObject/TrackDTO");

async function searchSongOnSpotifyService(accessToken, searchQuery) {

    const searchOptions = {
        method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        params: searchQuery
    };
    try {
        let responseData = await makeRequest(searchOptions);
        if (!searchQuery.type || searchQuery.type === 'track') {
            responseData = new PlaylistInfo(responseData, `search-tracks-${searchQuery.q}`)
            return responseData;
        }
        // else if (searchQuery.type === 'album') {
        //     const responseData = new AlbumlistInfo(responseData, `search-albums-${searchQuery.q}`)
        //     return responseData;
        // }
        // if (!response.ok)
        //     const errorData = await response.json();
        //     throw new Error(`Error searching song: ${response.statusText} - ${errorData.error.message}`);
        // }
        return responseData

    } catch (error) {
        console.error('Error searching song:', error);
        throw error;
    }
}


async function recommendSongOnSpotifyService(accessToken, params) {
    const apiURL = `https://api.spotify.com/v1/recommendations`;
    const searchOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };


    try {
        console.log(`${apiURL}?${new URLSearchParams(params)}`)
        const response = await fetch(`${apiURL}?${new URLSearchParams(params)}`, searchOptions);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error recommending song: ${response.statusText} - ${errorData.error.message}`);
        }
        const result = await response.json();
        console.log(result)

        const tracks = new ListTracks(result, `recommend-tracks`)
        return tracks;
    } catch (error) {
        console.error('Error recommending song:', error);
        throw error;
    }
}

module.exports = {searchSongOnSpotifyService, recommendSongOnSpotifyService}