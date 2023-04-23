import mongoose from 'mongoose'

const Pokemon = mongoose.model('Pokemon', new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: String,
    user: {
        required: true,
        type: String,
        ref: 'User',
    }
}, { versionKey: false, timestamps: true }));

export default Pokemon;


