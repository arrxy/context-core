import express from "express";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

dotenv.config();

const app = express();

app.all("/api/auth/{*splat}", toNodeHandler(auth));

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});