const makeRequest = require("../Utils/request");
const ArtistInfo = require("../Models/DataTransferObject/ArtistDTO");

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const getArtistWithIdService = async (accessToken, artistId) => {
    const options = {
        method: 'GET',
        url: `${SPOTIFY_API_BASE_URL}/artists/${artistId}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }
    try {
        const result = await makeRequest(options);
        console.log(result)
        const artistInfo = new ArtistInfo(result);
        console.log(artistInfo)
        return artistInfo
    } catch (error) {
        console.error('Error fetching artist info', error);
        throw error;
    }
}

module.exports = {
    getArtistWithIdService
}