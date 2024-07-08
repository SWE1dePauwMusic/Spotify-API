const TrackInfo = require("./ResponseTrackModel");

class PlaylistInfo {
    constructor(result,type ) {
        this.id = result.id ;
        this.images = result.images;

        if (type === 'id'){
            this.name = result.name ;
            this.trackList = result.tracks.items.map(track => new TrackInfo(track.track));
        }
        else{
            this.name = type;
            this.trackList = result.items.map(track => new TrackInfo(track));
        }

    }

}

module.exports = PlaylistInfo;