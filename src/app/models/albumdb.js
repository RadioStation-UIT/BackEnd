const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Album = new Schema({
    idNotification: { type: String, maxlength: 255 },
    idTrack: Array,
    artists: [
        {
            idArtist: String,
            nameArtist: String
        }
    ],
    listener: Number,
    name: { type: String, maxlength: 255},
    image: String
},
{
    timestamps: true,
});

module.exports = mongoose.model('albumDB', Album, 'Albums');
