
//search of spotify


const {searchSongOnSpotify, recommendSongOnSpotify} = require("../Services/searchService");
const searchSongHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const searchQuery = req.query.searchQuery;
        console.log("Search query: ", searchQuery);
        console.log("Start searching song");

        const searchResult = await searchSongOnSpotify(accessToken, searchQuery);

        console.log(searchResult.body)
        res.status(200).json({ searchResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const recommendSongHandler = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        //const searchQuery = req.query.searchQuery;
//console.log("Search query: ", searchQuery);
        console.log("Start recommending song");

        const recommendResult = await recommendSongOnSpotify(accessToken);

        res.status(200).json({ recommendResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = {
    searchSongHandler, recommendSongHandler
};


