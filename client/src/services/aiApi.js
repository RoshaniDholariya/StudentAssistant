import axios from "axios";

const API_URL = "http://localhost:5000/api/ai/generate";

export const generateAI = async (prompt, mode) => {
  const response = await axios.post(API_URL, { prompt, mode });
  return response.data.result;
};
