const fs = require("fs");
const path = require("path");

// imports express + cors so the frontend can talk to backend
const express = require("express");
const cors = require("cors");

// create app
const app = express();
app.use(cors());
app.use(express.json()); // lets us read JSON from frontend

// path to rooms.json
const roomsFile = path.join(__dirname, "data", "rooms.json");

// load saved rooms at startup
function loadRooms() {
    try {
        return JSON.parse(fs.readFileSync(roomsFile, "utf8"));
    } catch (err) {
        console.log("🥀 no rooms saved yet.");
        return {};
    }
}

// save rooms to file
function saveRooms(data) {
    fs.writeFileSync(roomsFile, JSON.stringify(data, null, 2));
}

module.exports = { loadRooms, saveRooms };

// import routes (all secret santa logic will land there later)
const santaRoutes = require("./routes/santaRoutes");
app.use("/api/santa", santaRoutes);

// start server (change port if u want)
app.listen(3000, () => {
    console.log("🥀 backend vibing on port 3000");
});
