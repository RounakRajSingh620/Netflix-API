const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/netflix")
    .then(() => {
        console.log("DB Connection Successful");
    })
    .catch((err) => {
        console.error("DB Connection Error:", err.message);
    });


app.use("/api/user", userRoutes);

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
