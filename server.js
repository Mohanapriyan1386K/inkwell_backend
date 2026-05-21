import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts.js";
import jobsRouter from "./routes/jobs.js";
import categoriesRouter from "./routes/categories.js";
import connectDB from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/posts", postsRouter);
app.use("/api/stories", postsRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/categories", categoriesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const port = process.env.PORT || 4000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });
