import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts.js";
import jobsRouter from "./routes/jobs.js";
import companyRoutes from "./routes/companyRoutes.js"
import categoriesRouter from "./routes/categories.js";
import connectDB from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Failed to connect to DB", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/posts", postsRouter);
app.use("/api/stories", postsRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/company", companyRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

if (!process.env.VERCEL) {
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
}

export default app;
