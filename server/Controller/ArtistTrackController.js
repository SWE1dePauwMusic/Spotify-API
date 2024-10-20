const {getPlaylistService} = require("../Services/PlaylistService");
const makeResponse = require("../Utils/response");
const {getArtistWithIdService} = require("../Services/ArtistTrackService");


const getArtistWithIdHandler = async (req, res) => {
    console.log("Start get Artist by Id....")
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { artistId } = req.query;

        const artistInfo = await getArtistWithIdService(accessToken, artistId);

        makeResponse(res, 200, {artistInfo});
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
}

const getArtistAlbumWithIdHandler = async (req, res) => {
    console.log("Start get Artist Album by Id....")
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const { artistId } = req.query;

        const artistAlbum = await getArtistAlbumWithIdService(accessToken, artistId);

        makeResponse(res, 200, {artistAlbum});
    } catch (error) {
        makeResponse(res, error.statusCode || 500, null, error.message);
    }
}

module.exports = {

    getArtistWithIdHandler
}