export default {
  async fetch(req) {
    return new Response("backend alive 🥀", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
  }
}
