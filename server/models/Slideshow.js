const mongoose = require('mongoose');

const slideshowSchema = new mongoose.Schema({
    slides: [{
        slide: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Slide'
        },
        position: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Slideshow', slideshowSchema);