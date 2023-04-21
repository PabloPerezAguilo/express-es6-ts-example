import mongoose from 'mongoose'

const User = mongoose.model('User', new mongoose.Schema({
    password: {
        type: String,
        required: true,
        select: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['USER', 'ADMIN']
    },
}, { versionKey: false, timestamps: true }));

export default User;