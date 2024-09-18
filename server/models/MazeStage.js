const mongoose = require('mongoose');

const mazeStageSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    mazeSize: {
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MazeStage', mazeStageSchema);