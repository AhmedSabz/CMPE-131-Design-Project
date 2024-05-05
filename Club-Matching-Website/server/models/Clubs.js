import mongoose from 'mongoose';

const ClubSchema = new mongoose.Schema({
    clubName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: [],
    members: []
});

export const ClubModel = mongoose.model("Clubs", ClubSchema)