export default {
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    // CORS
    if (method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders()
      });
    }

    // /ping
    if (path === "/ping" && method === "GET") {
      return json({ ok: true, message: "pong 🥀" });
    }

    // /create-room
    if (path === "/create-room" && method === "POST") {
      const roomCode = Math.random().toString(36).slice(2, 8).toUpperCase();
      return json({ ok: true, roomCode });
    }

    // /join-room
    if (path === "/join-room" && method === "POST") {
      const body = await req.json();
      return json({ ok: true, joined: body.roomCode });
    }

    // /assign
    if (path === "/assign" && method === "POST") {
      return json({ ok: true, assigned: true });
    }

    return new Response("Not found", { status: 404 });
  }
};

function json(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders()
    }
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, user-id",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
  };
}
