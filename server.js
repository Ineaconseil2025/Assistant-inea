const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


app.post("/ask", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
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


