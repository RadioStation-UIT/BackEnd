const express = require('express');
const router = express.Router();

const ArtistController = require('../app/controller/artistsController');

router.get('/',ArtistController.getAllArtists);

module.exports = router; 