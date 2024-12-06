import { PORT } from "./config";
import express, { Router, Request, Response } from "express";
import cors from "cors";
import swaggerDocs from "./swagger";
import { router as hub } from "./routes/routes";

const keys = { port: PORT || 3000 };

const app = express();
const router = Router();

app.use(
  cors({
    origin: "http://moodtimebucket.s3-website.eu-west-2.amazonaws.com",
  }),
);

swaggerDocs(app);

app.listen(keys.port, () => {
  console.log(`Server Listening on Port ${keys.port}`);
});

app.use("/api", hub);

app.get("/", (req: Request, res: Response) => {
  res.redirect("/api/");
});

export { router };
