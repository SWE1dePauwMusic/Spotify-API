const PlaylistInfo = require("../Models/DataTransferObject/PlaylistDTO");

async function searchSongOnSpotifyService(accessToken, searchQuery) {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`;

    const searchOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await fetch(url, searchOptions);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error searching song: ${response.statusText} - ${errorData.error.message}`);
        }

        return await response.json();
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

    // const params = {
    //     limit: 5,
    //     min_tempo: 120,
    //     min_popularity: 30,
    //     max_popularity: 60,
    //     min_instrumentalness: 0.5,
    //     seed_genres: 'acoustic,alt-rock,indie',
    //     seed_artists: '0du5cEVh5yTK9QJze8zA0C',
    //     seed_tracks: '0c6xIDDpzE81m2q797ordA',
    // }

    try {
        console.log(`${apiURL}?${new URLSearchParams(params)}`)
        const response = await fetch(`${apiURL}?${new URLSearchParams(params)}`, searchOptions);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error recommending song: ${response.statusText} - ${errorData.error.message}`);
        }
        const result = await response.json();
        console.log(result)

        const tracks = new PlaylistInfo(result, `recommend-tracks`)
        return tracks;
    } catch (error) {
        console.error('Error recommending song:', error);
        throw error;
    }
}

module.exports = {searchSongOnSpotifyService, recommendSongOnSpotifyService}