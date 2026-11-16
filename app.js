import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import programmersRoutes from "./Routes/programmers.js";

const PORT = Number(process.env.PORT) || 8080;
const MONGODB_URI = process.env.MONGODB_URI;
// Comma-separated list of allowed browser origins, e.g. "https://task7-front-end-for-task6.vercel.app".
// Empty = allow all origins (fine for this public demo API).
const CORS_ORIGINS = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Copy .env.example to .env and add your MongoDB connection string.");
  process.exit(1);
}

const app = express();
app.disable("x-powered-by");
app.use(cors(CORS_ORIGINS.length ? { origin: CORS_ORIGINS } : undefined));
app.use(express.json({ limit: "10kb" }));

// Health check for Render and uptime monitors. "db" is "connected" when MongoDB is reachable.
app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ status: connected ? "ok" : "degraded", db: connected ? "connected" : "disconnected" });
});

app.get("/", (req, res) => {
  res.json({ name: "Programmers API", endpoints: ["GET /health", "GET/POST /programmers", "GET/PUT/DELETE /programmers/:id"] });
});

app.use("/programmers", programmersRoutes);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

// Invalid JSON bodies and other unexpected errors.
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") return res.status(400).json({ message: "Invalid JSON body" });
  console.error(err.message);
  res.status(500).json({ message: "Server error" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Database is connected"))
  // Log only the error message: it never contains the connection string's password.
  .catch((err) => console.error("Database connection error:", err.message));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
