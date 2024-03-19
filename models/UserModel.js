const mongoose = require("mongoose");

// Define the movie schema
const movieSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    // Add more fields as needed
});

// Define the user schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50, // Use "maxlength" instead of "max"
    },
    likedMovies: [movieSchema], // Embed the movie schema within the array
});

// Create and export the User model
module.exports = mongoose.model("user", UserSchema); // Use singular "User" as model name
