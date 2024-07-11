class UserPlaylistInfo {
    constructor(playlist) {
        this.name = playlist.name;
        this.id = playlist.id;
        this.images = playlist.images;
        this.trackNumber = playlist.trackNumber;
        this.links = playlist.links;
    }
}

module.exports = UserPlaylistInfo;