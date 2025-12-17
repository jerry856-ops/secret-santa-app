// check if userId exists in browser
let userId = localStorage.getItem("userId");

// if not, generate one
if (!userId) {
    userId = crypto.randomUUID(); // creates unique ID
    localStorage.setItem("userId", userId);
    console.log("🥀 new user created:", userId);
} else {
    console.log("🥀 welcome back user:", userId);
}

// button test — calls backend with userId
document.getElementById("pingBtn").addEventListener("click", async () => {
    const res = await fetch("http://localhost:3000/api/santa/ping", {
        headers: { "user-id": userId }
    });
    const data = await res.json();
    document.getElementById("result").innerText = data.msg + " | id: " + userId;
});

// create room
document.getElementById("createRoomBtn").addEventListener("click", async () => {
    const res = await fetch("http://localhost:3000/api/santa/create-room", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "user-id": userId 
        }
    });

    const data = await res.json();
    document.getElementById("roomResult").innerText = "created: " + JSON.stringify(data);
});


// join room
document.getElementById("joinRoomBtn").addEventListener("click", async () => {
    const roomCode = document.getElementById("roomCodeInput").value;

    const res = await fetch("http://localhost:3000/api/santa/join-room", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "user-id": userId 
        },
        body: JSON.stringify({ roomCode })
    });

    const data = await res.json();
    document.getElementById("roomResult").innerText = "joined: " + JSON.stringify(data);
});

// assign secret santa
document.getElementById("assignBtn").addEventListener("click", async () => {
    const roomCode = document.getElementById("roomCodeInput").value;

    const res = await fetch("http://localhost:3000/api/santa/assign", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-id": userId
        },
        body: JSON.stringify({ roomCode })
    });

    const data = await res.json();
    document.getElementById("assignResult").innerText = JSON.stringify(data, null, 2);
});

// see only MY assignment
document.getElementById("myGiftBtn").addEventListener("click", async () => {
    const roomCode = document.getElementById("roomCodeInput").value;

    const res = await fetch("http://localhost:3000/api/santa/my-assignment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-id": userId
        },
        body: JSON.stringify({ roomCode })
    });

    const data = await res.json();
    document.getElementById("myGiftResult").innerText =
        data.yourPerson ? "You gift 🥀 → " + data.yourPerson : JSON.stringify(data);
});
