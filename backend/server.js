import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import youtubeRoutes from "./routes/youtube.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/youtube", youtubeRoutes);

app.get("/", (req, res) => {
  res.json({ status: "JP Movies Backend Running 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
