const artistsDB = require('../models/artistsdb');
const UserDB = require('../models/userdb');
const jwt = require('jsonwebtoken');

class ArtistController{
    //Middelware
    authenticateToken(req,res,next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        if (token == null) return res.send(401);
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if(err) return res.sendStatus(403)
            req.user = user
            next()
        })
    }
    // [GET]
    getAllArtists(req,res, next){
        artistsDB.find()
            .then((artist)=>{
                artist.sort((a, b) => (a.like < b.like) ? 1 : (b.like < a.like) ? -1 : 0)
                res.status(200).json(artist)
            })
            .catch(next)
    }
    //[GET] /country
    getArtistsByCountry(req, res, next){
        artistsDB.find({nation: req.query.nation})
            .then((artists)=>{
                console.log(artists)
                res.status(200).json({
                    artists
                })
            })
            .catch(next)
    }
    //[PUT]
    likeArtists(req,res, next){
        const liked = req.body.like + 1;
        artistsDB.updateOne({idArtists: req.body.idArtists}, {$set:{like:liked}})
            .then(()=>{
                res.status(200).json({
                    message: 'liked'
                })
            })
            .catch(()=>{
                res.status(200).json({
                    message: 'fail'
                })
            })
        next()
    }
}

module.exports = new ArtistController();