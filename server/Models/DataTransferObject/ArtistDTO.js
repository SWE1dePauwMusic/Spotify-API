

class ArtistInfo {
    constructor(artist) {
        this.spotifyId = artist.id;
        this.name = artist.name;
        this.popularity = artist.popularity;
        this.genres = artist.genres;
        this.image = artist?.images?.[0] ;
    }
}

module.exports = ArtistInfo;