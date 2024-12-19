import express, { type Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
