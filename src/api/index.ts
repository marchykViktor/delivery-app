import { Router } from "express";
import client from "./routes/client";
import courier from "./routes/courier";
import restaurant from "./routes/restaurant";

const app: Router = Router();
client(app);
courier(app);
restaurant(app);

export default app;