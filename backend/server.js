import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend (if you build it)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/api/spin", (req, res) => {
  const result = Math.floor(Math.random() * 37);
  res.json({ number: result });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

