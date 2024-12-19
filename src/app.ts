import express, { type Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
