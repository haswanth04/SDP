import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.json({ text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.listen(8080, () => console.log("server is running"));