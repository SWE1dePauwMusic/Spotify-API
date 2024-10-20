const TrackInfo = require("./TrackDTO");
const ArtistInfo = require("./ArtistDTO");

class AlbumInfo {
    constructor(result, withTrack) {
        this.spotifyId = result.id;
        this.name = result.name;

        this.artists = result.artists.map(artist => new ArtistInfo(artist));

        this.image = result.images[0];
        this.albumType = result.album_type;
        this.releaseDate = result.release_date;

        if (withTrack){
            this.trackList = result.tracks.items.map(track => new TrackInfo(track));
        }
    }

}

module.exports = AlbumInfo;