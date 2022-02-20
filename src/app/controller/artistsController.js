const artistsDB = require('../models/artistsdb')

class ArtistController{
    // [GET]
    getAllArtists(req,res, next){
        artistsDB.find()
            .then((artist)=>{
                console.log(artist)
                res.json(artist)
            })
            .catch(next)
    }
}

module.exports = new ArtistController();