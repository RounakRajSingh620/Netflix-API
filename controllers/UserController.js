const User = require("../models/UserModel");

module.exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ msg: "success", movies: user.likedMovies });
        } else {
            return res.status(404).json({ msg: "User with given email not found." });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Error fetching movies." });
    }
};

module.exports.addToLikedMovies = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const movieAlreadyLiked = user.likedMovies.find(movie => movie.id === data.id);
            if (!movieAlreadyLiked) {
                await User.findOneAndUpdate(
                    { email },
                    { $push: { likedMovies: data } },
                    { new: true }
                );
                return res.json({ msg: "Movie successfully added to liked list." });
            } else {
                return res.json({ msg: "Movie already added to the liked list." });
            }
        } else {
            await User.create({ email, likedMovies: [data] });
            return res.json({ msg: "Movie successfully added to liked list." });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Error adding movie to the liked list" });
    }
};

module.exports.removeFromLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const movieIndex = user.likedMovies.findIndex(movie => movie.id === movieId);
            if (movieIndex !== -1) {
                user.likedMovies.splice(movieIndex, 1);
                await user.save();
                return res.json({ msg: "Movie successfully removed.", movies: user.likedMovies });
            } else {
                return res.status(404).json({ msg: "Movie not found." });
            }
        } else {
            return res.status(404).json({ msg: "User with given email not found." });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Error removing movie from the liked list" });
    }
};
