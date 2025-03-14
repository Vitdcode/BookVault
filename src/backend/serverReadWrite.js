import http from "http";
import { readFile, writeFile } from "fs/promises";

const filePath = "books.json";

const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    // 📌 Handle JSON reading
    try {
      const data = await readFile(filePath, "utf-8");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error: Could not read file.");
      console.error("Error reading file:", err);
    }
  } else if (req.method === "POST") {
    // 📌 Handle JSON writing
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        await writeFile(filePath, body, "utf-8");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("✅ JSON file updated successfully!");
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error: Could not write file.");
        console.error("Error writing file:", err);
      }
    });
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("❌ Method Not Allowed");
  }
});

server.listen(8080, () => "🚀 Server running on http://localhost:8080");
