import { generateFromAI } from "../services/ai.service.js";

export const generateAIResponse = async (req, res) => {
  try {
    const { prompt, mode } = req.body;

    if (!prompt || !mode) {
      return res.status(400).json({ error: "Prompt and mode are required." });
    }

    const aiResponse = await generateFromAI(prompt, mode);
    res.json({ result: aiResponse });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI generation failed." });
  }
};
