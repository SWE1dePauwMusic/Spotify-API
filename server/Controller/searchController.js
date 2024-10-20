const {recommendSongOnSpotifyService, searchSongOnSpotifyService} = require("../Services/searchService");
const makeResponse = require("../Utils/response");


const searchSongHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const searchQuery = {
            "q": req.query.q,
            "type": req.query.type || "track",
            "limit": req.query.limit || 5,
        };

        console.log("Search query: ", searchQuery);
        console.log("Start searching song");

        const playlistInfo = await searchSongOnSpotifyService(accessToken, searchQuery);

        console.log(playlistInfo.body)
        makeResponse(res, 200, { playlistInfo })
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
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


