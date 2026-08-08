import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get('/health', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});