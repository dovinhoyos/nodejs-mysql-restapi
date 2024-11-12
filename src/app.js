import express from "express";
import employeesRouter from "./routes/employees.routes.js";

const app = express();

app.use(express.json());

app.use("/api/employees", employeesRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
  next();
});

export default app;
