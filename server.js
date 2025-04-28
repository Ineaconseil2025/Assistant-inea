const express = require("express");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");
require("dotenv").config();console.log("TEST CLE API :", process.env.OPENAI_API_KEY);




const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/ask", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: "Tu es CONSEILLER PÉDAGOGIQUE INÉA. Tu poses les questions du questionnaire pour recommander une formation INÉA adaptée." },
        { role: "user", content: userMessage }
      ]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur de l'assistant.");
  }
});

app.listen(port, () => {
  console.log(`Assistant INÉA prêt sur http://localhost:${port}`);
});

