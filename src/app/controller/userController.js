const UserDB = require('../models/userdb');
const jwt = require('jsonwebtoken');
const randomId = require('random-id');
require('dotenv').config();
const bcrypt = require("bcrypt");

const linkAvartDefault = 'https://vsmcamp.com/wp-content/uploads/2020/11/JaZBMzV14fzRI4vBWG8jymplSUGSGgimkqtJakOV.jpeg';

function _randomID(){
    const length = 50;
    const pattern = 'US';
    return randomId(length, pattern)
}

class userController{
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
    getAllUser(req,res, next){
        UserDB.find()
            .then((user)=>{
                res.json(user)
                console.log(user)
            })
            .catch(next)
    }
    // [POST]
    async RegisterUser(req, res, next){
        const users = await UserDB.find({$or: [{email: req.body.email}, {userName: req.body.userName}]});
        if (users.length !== 0){
            res.json({
                userCreated: true,
                message: 'Email or UserName already exists !!!!'
            })
        }else{
            const idUser = _randomID();
            const userJWT = {
                idUser: idUser,
                email: req.body.email,
                userName: req.body.userName
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(req.body.password, salt);
            const user = {
                idUser: idUser,
                fullName: req.body.userName,
                userName: req.body.userName,
                email: req.body.email,
                password: passwordHash,
                avatar: linkAvartDefault,
                background: null,
                blance: 0,
                likeTracks: [],
                likeArtists: [],
                likeAlbum: []
            }
            const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET);
            const userCreate = new UserDB(user)
            userCreate.save()
                .then(()=>console.log('sucessful resgister'))
                .catch(next)
            res.json({
                userCreated: false,
                message: 'Register sucessful !!!!',
                accessToken: accessToken,
                userJWT
            })
        }
    }
    //[POST]
    login(req,res,next){
        console.log('123')
    }
    //[GET]
    getMusicByUserId(req,res,next){
    }
}

module.exports = new userController();