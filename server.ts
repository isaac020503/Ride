import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client to avoid crashes on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it in AI Studio Secrets settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST API endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Chatbot endpoint utilizing gemini-3.5-flash with custom guide personality
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGemini();

    // Prepare systemic travel guide instruction context
    const systemInstruction = 
      "You are 'Morena Bot', a premium, highly knowledgeable local Basotho tour guide and AI assistant for Visit Lesotho. " +
      "Your tone is warm, extremely welcoming (using Basotho greetings like 'Khotso' meaning peace, 'Morena' meaning sir/lord, and 'Mme' for mother/ma'am), and deeply proud of the Kingdom in the Sky. " +
      "Provide precise, rich details about Lesotho's history (King Moshoeshoe I, Thaba Bosiu fortress, 1966 Independence), " +
      "water resources (Southern Africa's Water Tower, Lesotho Highlands Water Project LHWP, Katse Dam, Mohale Dam), " +
      "diamond mining (Letseng, Liqhobong, Mothae, high dollar-per-carat gems, Lesotho Legend, Lesotho Promise), " +
      "traditional foods (Papa, Moroho, Motoho sorghum porridge, Nyekoe, Lekhotloane pounded meat, stews), " +
      "top destinations (Maletsunyane Falls near Semonkong, Sani Pass road, Sehlabathebe, Afriski, Liphofung Caves), " +
      "and cultural symbols (Basotho blankets like Seanamarena, Mokorotlo straw hat, Mokhibo and Mohobelo traditional dances, mountain pony trekking). " +
      "Always structure your response with elegant bullet points, clear sections, or short digestible paragraphs so it reads like a premium guide. " +
      "Ensure you answer travel questions, suggest customized itineraries based on user's requests, recommend local foods, and solve Lesotho tourism FAQs. " +
      "If the query is totally unrelated to Lesotho, answer politely but gently guide the user back to the wonders of Lesotho.";

    // Format chat history array into correct GoogleGenAI model structures
    const formattedContents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((turn: any) => {
        formattedContents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text || turn.message || "" }],
        });
      });
    }

    // Append current user message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Khotso! I am having a quiet moment overlooking Maletsunyane Falls. Please, let me know how I can guide you today!";
    res.json({ text: reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "Could not retrieve response from travel assistant", 
      details: error.message || String(error) 
    });
  }
});

// Mount Vite middleware for development or serve compiled static bundle in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Visit Lesotho Server listening on port ${PORT}`);
  });
}

startServer();
