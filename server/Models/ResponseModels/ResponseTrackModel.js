const ArtistInfo = require("./RequestArtistModel");

class TrackInfo {
    constructor(track) {
        this.name = track.name;
        this.artists = track.artists.map(artist => new ArtistInfo(artist))
        this.duration = track.duration_ms;
        this.id = track.id;
        this.images = track.album.images;
        this.popularity = track.popularity;
        this.href = track.href;
    }
}

module.exports = TrackInfo;
