const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

const ROOMS_FILE = "./rooms.json";

// load rooms from file
async function loadRooms() {
    try {
        const data = await fs.readFile(ROOMS_FILE, "utf8");
        return JSON.parse(data);
    } catch {
        return {};
    }
}

// save rooms to file
async function saveRooms(rooms) {
    await fs.writeFile(ROOMS_FILE, JSON.stringify(rooms, null, 2));
}

// 🥀 middleware → checks userId header
router.use((req, res, next) => {
    const userId = req.headers["user-id"];

    if (!userId) {
        return res.status(400).json({ error: "no userId provided 🥀" });
    }

    req.userId = userId;
    next();
});

// 🥀 test endpoint
router.get("/ping", (req, res) => {
    res.json({ msg: "pong 🥀 server alive", yourId: req.userId });
});

// 🥀 create a room
router.post("/create-room", async (req, res) => {
    const userId = req.userId;

    const rooms = await loadRooms();
    const roomCode = Math.random().toString(36).substring(2, 7);

    rooms[roomCode] = {
        owner: userId,
        members: [userId],
        assignments: {},
        locked: false
    };

    await saveRooms(rooms);

    res.json({ msg: "room created 🥀", roomCode });
});

// 🥀 join a room
router.post("/join-room", async (req, res) => {
    const userId = req.userId;
    const roomCode = req.body.roomCode;

    const rooms = await loadRooms();
    const room = rooms[roomCode];

    if (!room) {
        return res.json({ error: "room not found 🥀💀" });
    }

    if (room.locked) {
        return res.json({ error: "room is locked 🔒🥀" });
    }

    if (!room.members.includes(userId)) {
        room.members.push(userId);
        await saveRooms(rooms);
    }

    res.json({ msg: "joined room 🥀", members: room.members });
});

// 🥀 generate secret santa assignments
router.post("/assign", async (req, res) => {
    const roomCode = req.body.roomCode;

    const rooms = await loadRooms();
    const room = rooms[roomCode];

    if (!room) {
        return res.json({ error: "room not found 🥀" });
    }

    // 🧠 BLOCK RE-ASSIGN (THIS WAS MISSING BEFORE)
    if (room.locked && room.assignments && Object.keys(room.assignments).length > 0) {
        return res.json({ error: "already assigned 🔒🥀" });
    }

    const members = [...room.members];

    const shuffle = arr => arr.sort(() => Math.random() - 0.5);

    let givers = [...members];
    let receivers = shuffle([...members]);

    // anti self-assign
    for (let i = 0; i < givers.length; i++) {
        if (givers[i] === receivers[i]) {
            let swap = (i + 1) % givers.length;
            [receivers[i], receivers[swap]] = [receivers[swap], receivers[i]];
        }
    }

    const assignments = {};
    for (let i = 0; i < givers.length; i++) {
        assignments[givers[i]] = receivers[i];
    }

    room.assignments = assignments;
    room.locked = true; // 🔒 lock room after assign

    await saveRooms(rooms);

    res.json({ msg: "assignments ready 🥀" });
});

// 🥀 get ONLY my assignment
router.post("/my-assignment", async (req, res) => {
    const roomCode = req.body.roomCode;
    const userId = req.userId;

    const rooms = await loadRooms();
    const room = rooms[roomCode];

    if (!room || !room.assignments) {
        return res.json({ error: "assignments not ready 🥀" });
    }

    const myTarget = room.assignments[userId];

    if (!myTarget) {
        return res.json({ error: "you not assigned 🥀💀" });
    }

    res.json({ yourPerson: myTarget });
});

module.exports = router;
