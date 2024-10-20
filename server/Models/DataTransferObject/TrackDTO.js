const ArtistInfo = require("./ArtistDTO");
const AlbumInfo = require("./AlbumDTO");

class TrackInfo {
    constructor(track) {
        this.spotifyId = track.id;
        this.name = track.name;

        this.artists = track.artists.map(artist => new ArtistInfo(artist))
        this.album = new AlbumInfo(track.album, false);

        this.duration = track.duration_ms;
        this.image = track.album.images[0];
        this.popularity = track.popularity;
    }
}

class ListTracks {
    constructor(result, type ) {
        if (type.includes("search")){
            this.name = type;
            this.trackList = result.tracks.items.map(track => new TrackInfo(track));
        }
        else if (type === 'top-tracks'){
            this.name = type;
            this.trackList = result.items.map(track => new TrackInfo(track));
        }
        //
        else if (type === 'my-fav'){
            this.name = type;
            this.trackList = result.items.map(item => new TrackInfo(item.track));
        }

        else{
            this.name = type;
            this.trackList = result.tracks.map(track => new TrackInfo(track));
        }
    }
}

module.exports = {
    ListTracks,
    TrackInfo
};
