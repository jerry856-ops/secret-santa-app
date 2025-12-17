const API_URL = "http://localhost:3000/api"; // backend

// add userId header always
function headers(userId) {
    return {
        "Content-Type": "application/json",
        "user-id": userId
    };
}

export async function ping(userId) {
    const res = await fetch(`${API_URL}/ping`, {
        headers: headers(userId)
    });
    return res.json();
}

export async function createRoom(userId) {
    const res = await fetch(`${API_URL}/create-room`, {
        method: "POST",
        headers: headers(userId)
    });
    return res.json();
}

export async function joinRoom(userId, roomCode) {
    const res = await fetch(`${API_URL}/join-room`, {
        method: "POST",
        headers: headers(userId),
        body: JSON.stringify({ roomCode })
    });
    return res.json();
}

export async function assign(userId, roomCode) {
    const res = await fetch(`${API_URL}/assign`, {
        method: "POST",
        headers: headers(userId),
        body: JSON.stringify({ roomCode })
    });
    return res.json();
}
