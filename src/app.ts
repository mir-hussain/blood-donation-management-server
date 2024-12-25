import express, { type Application } from "express";
import cors from "cors";
import routes from "./routes";
import notFound from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
