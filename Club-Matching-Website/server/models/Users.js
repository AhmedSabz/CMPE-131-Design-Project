import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    interests: [],
    joinedClubs: []
});

export const UserModel = mongoose.model("Users", UserSchema);