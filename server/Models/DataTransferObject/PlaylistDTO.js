const {TrackInfo} = require("./TrackDTO");
const ArtistInfo = require("./ArtistDTO");
const UserInfo = require("./UserDTO");



class PlaylistInfo {
    constructor(result, withTrack) {
        this.spotifyId = result.id;            //spotifyId
        this.image = result.images[0];
        this.name = result.name;
        this.description = result.description;

        this.owner = new UserInfo(result.owner.display_name, result.owner.id);

        if (withTrack){
            this.trackList = result.tracks.items.map(track => new TrackInfo(track.track));
        }
    }
}




module.exports = PlaylistInfo;