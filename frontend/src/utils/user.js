// get userId or create one
export function getUserId() {
    let id = localStorage.getItem("userId");

    if (!id) {
        id = "u_" + Math.random().toString(36).substring(2, 10);
        localStorage.setItem("userId", id);
    }

    return id;
}
