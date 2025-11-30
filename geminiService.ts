import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectBrief = async (userPrompt: string): Promise<AIResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `The user is a potential client describing a design project: "${userPrompt}". 
      Act as a senior creative director at a high-end design agency called "Aether".
      Analyze their request and create a structured project brief proposal.
      Return JSON only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            briefTitle: { type: Type.STRING, description: "A catchy, professional title for the project" },
            summary: { type: Type.STRING, description: "A 2-sentence professional summary of the project goals" },
            recommendedServices: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3-4 specific agency services needed (e.g. UI Design, Branding, Motion)"
            },
            estimatedTimeline: { type: Type.STRING, description: "A realistic timeline range (e.g. 4-6 weeks)" },
            creativeDirection: { type: Type.STRING, description: "A short paragraph describing the suggested visual vibe and aesthetic" }
          },
          required: ["briefTitle", "summary", "recommendedServices", "estimatedTimeline", "creativeDirection"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIResponse;
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate brief. Please try again.");
  }
};