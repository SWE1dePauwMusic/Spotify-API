
//search of spotify


const {recommendSongOnSpotifyService, searchSongOnSpotifyService} = require("../Services/searchService");
const makeResponse = require("../Utils/response");
const searchSongHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const searchQuery = req.query.searchQuery;
        console.log("Search query: ", searchQuery);
        console.log("Start searching song");

        const searchResult = await searchSongOnSpotifyService(accessToken, searchQuery);

        console.log(searchResult.body)
        res.status(200).json({ searchResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const recommendSongHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log("Start recommending song");
        // Construct the search query from the searchParams
        const transformSearchParams = (searchParams) => {
            const transformedParams = {};
            Object.keys(searchParams).forEach(key => {
                transformedParams[key] = `${searchParams[key]}`;
            });

            return transformedParams;
        };

        const searchQuery = transformSearchParams(req.query);

        // Log the constructed search query
        console.log("Search query: ", searchQuery);

        const playlistInfo = await recommendSongOnSpotifyService(accessToken, searchQuery);
        makeResponse(res, 200, { playlistInfo});
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }

}

module.exports = {
    searchSongHandler, recommendSongHandler
};


