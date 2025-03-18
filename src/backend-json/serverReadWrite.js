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
    // 📌 Handle JSON writing (Merging new data)
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const newData = JSON.parse(body); // The data sent from frontend
        // Read existing data from the file
        let existingData = {};
        try {
          const fileContent = await readFile(filePath, "utf-8");
          existingData = JSON.parse(fileContent);
        } catch (error) {
          console.error("📂 No existing file found or JSON is empty, creating new.", error);
        }

        // Merge new data with existing data
        const updatedData = { ...existingData, ...newData };

        // Write back the merged data
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
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("❌ Method Not Allowed");
  }
});

server.listen(8080, () => console.log("🚀 Server running on http://localhost:8080"));
