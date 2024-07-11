const TrackInfo = require("./TrackDTO");

class PlaylistInfo {
    constructor(result, type ) {
        this.id = result.id ;
        this.images = result.images;

        if (type === 'id'){
            this.name = result.name ;
            this.trackList = result.tracks.items.map(track => new TrackInfo(track.track));
        }
        else if (type === 'top-tracks'){
            this.name = type;
            this.trackList = result.items.map(track => new TrackInfo(track));
        }
        else{
            this.name = type;
            this.trackList = result.tracks.map(track => new TrackInfo(track));
        }
    }
}

module.exports = PlaylistInfo;