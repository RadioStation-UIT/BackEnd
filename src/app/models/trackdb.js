const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tracks = new Schema({
    idTrack: { type: String, maxlength: 255 },
    nameSong: { type: String, maxlength: 600 },
    url: { type: String, maxlength: 255 },
    mainImg: String,
    time: Number,
    numberListen: Number,
    artists: [
        {
            idArtist: String,
            nameArtist: String
        }
    ],
    country: String,
    type: Array,
},
{
    timestamps: true,
});

module.exports = mongoose.model('trackDB', Tracks, 'Tracks');
