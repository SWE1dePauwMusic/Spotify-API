
async function searchSongOnSpotify(accessToken, searchQuery) {
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


async function recommendSongOnSpotify(accessToken) {
    const apiURL = `https://api.spotify.com/v1/recommendations`;
    const searchOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    const params = {
        limit: 5,
        min_tempo: 120,
        min_popularity: 30,
        max_popularity: 60,
        min_instrumentalness: 0.5,
        seed_genres: 'acoustic,alt-rock,indie',
    }

    try {
        console.log(`${apiURL}?${new URLSearchParams(params)}`)
        const response = await fetch(`${apiURL}?${new URLSearchParams(params)}`, searchOptions);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error recommending song: ${response.statusText} - ${errorData.error.message}`);
        }
        const result = await response.json();
        const tracks = result.tracks.map(track => (
            {
                name: track.name,
                popularity: track.popularity,
                id: track.id,
                artists: track.artists.map(artist => artist.name),
            }));
        console.log(tracks)
        return tracks;
    } catch (error) {
        console.error('Error recommending song:', error);
        throw error;
    }
}

module.exports = {searchSongOnSpotify, recommendSongOnSpotify}