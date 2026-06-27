import express from "express";
import cors from "cors";
import "./config/database.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("/test", (req, res) => {
  res.json({
    message: "Testing api is working",
  });
});

app.listen(5000, () => {
  console.log(`Server is running`);
});
