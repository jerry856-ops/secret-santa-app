// 🥀 BACKEND URL (Cloudflare Worker)
const API_URL = "https://cf-backend.jeremyelaysrankota.workers.dev";

// 🥀 get or create userId
let userId = localStorage.getItem("userId");

if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
    console.log("🥀 new user created:", userId);
} else {
    console.log("🥀 welcome back user:", userId);
}

// 🥀 ping backend
document.getElementById("pingBtn").addEventListener("click", async () => {
    const res = await fetch(`${API_URL}/ping`, {
        headers: { "user-id": userId }
    });
    const data = await res.json();
    document.getElementById("result").innerText =
        data.msg + " | id: " + userId;
});

// 🥀 create room
document.getElementById("createRoomBtn").addEventListener("click", async () => {
    const res = await fetch(`${API_URL}/create-room`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-id": userId
        }
    });

    const data = await res.json();
    document.getElementById("roomResult").innerText =
        "created: " + JSON.stringify(data);
});

// 🥀 join room
document.getElementById("joinRoomBtn").addEventListener("click", async () => {
    const roomCode = document.getElementById("roomCodeInput").value;

    const res = await fetch(`${API_URL}/join-room`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-id": userId
        },
        body: JSON.stringify({ roomCode })
    });

    const data = await res.json();
    document.getElementById("roomResult").innerText =
        "joined: " + JSON.stringify(data);
});

// 🥀 assign secret santa
document.getElementById("assignBtn").addEventListener("click", async () => {
    const roomCode = document.getElementById("roomCodeInput").value;

    const res = await fetch(`${API_URL}/assign`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-id": userId
        },
        body: JSON.stringify({ roomCode })
    });

    const data = await res.json();
    document.getElementById("assignResult").innerText =
        JSON.stringify(data, null, 2);
});

// 🥀 see ONLY my assignment
document.getElementById("myGiftBtn").addEventListener("click", async () => {
    const roomCode = document.getElementById("roomCodeInput").value;

    const res = await fetch(`${API_URL}/my-assignment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-id": userId
        },
        body: JSON.stringify({ roomCode })
    });

    const data = await res.json();
    document.getElementById("myGiftResult").innerText =
        data.yourPerson
            ? "You gift 🥀 → " + data.yourPerson
            : JSON.stringify(data);
});
