import http from "http";
import { readFile } from "fs/promises";

const server = http.createServer(async (req, res) => {
  try {
    const data = await readFile("example.json", "utf-8");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(data);
    return res.end();
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server Error: Could not read file.");
    console.error("Error: ", err);
  }
});

server.listen(8080);
