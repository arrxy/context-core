import express from "express";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
import { registerRoutes } from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: clientUrl,
    credentials: true
  })
)
app.all("/api/auth/{*splat}", toNodeHandler(auth));

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Hello World');
});

registerRoutes(app);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});