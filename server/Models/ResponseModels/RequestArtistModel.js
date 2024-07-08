

class ArtistInfo {
    constructor(artist) {
        this.name = artist.name;
        this.popularity = artist.popularity;
        this.id = artist.id;
        this.genres = artist.genres;
    }
}

module.exports = ArtistInfo;