import http from "http";
import { readFile, writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, "books.json");
const distPath = path.join(__dirname, "dist"); // Path to your frontend files

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url);

  if (req.method === "GET" && parsedUrl.pathname === "/api/books") {
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
  } else if (req.method === "POST" && parsedUrl.pathname === "/api/books") {
    // 📌 Handle JSON writing
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const newData = JSON.parse(body);
        let existingData = {};
        try {
          const fileContent = await readFile(filePath, "utf-8");
          existingData = JSON.parse(fileContent);
        } catch (error) {
          console.error("📂 No existing file found, creating new.", error);
        }

        const updatedData = { ...existingData, ...newData };
        await writeFile(filePath, JSON.stringify(updatedData, null, 2), "utf-8");

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("✅ JSON file updated successfully!");
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error: Could not write file.");
        console.error("Error writing file:", err);
      }
    });
  } else {
    // 📌 Serve Static Frontend Files
    let filePath = path.join(distPath, parsedUrl.pathname);
    if (parsedUrl.pathname === "/") filePath = path.join(distPath, "index.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        let ext = path.extname(filePath);
        let contentType = "text/html";
        if (ext === ".css") contentType = "text/css";
        else if (ext === ".js") contentType = "application/javascript";
        else if (ext === ".json") contentType = "application/json";

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  }
});

server.listen(8080, "0.0.0.0", () =>
  console.log("🚀 Server running at http://<your-raspberry-ip>:8080")
);
