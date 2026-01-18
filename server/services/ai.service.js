import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config(); 

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

function buildPrompt(userInput, mode) {
  switch (mode) {
    case "explain":
      return `
You are an experienced university instructor.

Task:
Explain the following concept to a beginner student.

Rules:
- Use simple language
- Keep the explanation under 150 words
- If you are not confident about the topic, respond with:
  "I am not certain about this topic."

Concept:
${userInput}
`;

    case "mcq":
      return `
You are an academic exam creator.

Task:
Generate exactly 3 multiple-choice questions.

Rules:
- Output MUST be valid JSON only
- Each question must have exactly 4 options
- Clearly specify the correct answer
- If reliable information is not available, return:
  { "questions": [] }

Required JSON format:
{
  "questions": [
    {
      "question": "",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": ""
    }
  ]
}

Topic:
${userInput}
`;

    case "summarize":
      return `
You are a professional summarizer.

Task:
Summarize the following text.

Rules:
- Maximum 100 words
- Do NOT add new information
- If unsure, state uncertainty

Text:
${userInput}
`;

    case "improve":
      return `
You are a professional writing editor.

Task:
Improve grammar, clarity, and tone.

Rules:
- Do NOT change the original meaning
- Do NOT add new information

Text:
${userInput}
`;

    default:
      throw new Error("Invalid mode selected");
  }
}

/**
 * Calls OpenRouter LLM
 */
export const generateFromAI = async (userInput, mode) => {
  const structuredPrompt = buildPrompt(userInput, mode);

  const response = await client.chat.completions.create({
    model: "mistralai/devstral-2512:free", // FREE OpenRouter model
    messages: [
      { role: "user", content: structuredPrompt }
    ],
    temperature: 0.3,
  });

  return response.choices[0].message.content;
};
