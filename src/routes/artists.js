const express = require('express');
const router = express.Router();

const ArtistController = require('../app/controller/artistsController');
const UserController = require('../app/controller/userController');

router.put('/like-artist', ArtistController.authenticateToken, ArtistController.likeArtists, UserController.addArtistToUser);
router.get('/search-by-country',ArtistController.getArtistsByCountry);
router.get('/',ArtistController.getAllArtists);

module.exports = router; 