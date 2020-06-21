import { Router } from "express";
import client from "./routes/client"

const app: Router = Router();
client(app);

export default app;