
import { GoogleGenAI, Type } from "@google/genai";
import { EstimationResult, Machine } from "../types";

export const analyzeSketch = async (imageBuffer: string, mimeType: string = 'image/jpeg'): Promise<EstimationResult | null> => {
  // Create a new instance right before the call to ensure the latest config/key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      // Using gemini-3-pro-preview for complex reasoning and design analysis
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            text: `Act as a senior Creative Director and Project Manager. Analyze this design sketch carefully. Evaluate complexity, layout density, and potential engineering hurdles. Output valid JSON with the following structure: complexity (Low/Medium/High), screen_count (integer), estimated_hours_min (integer), estimated_hours_max (integer), explanation (string), risk_level (Low/Medium/High).`
          },
          {
            inlineData: { mimeType: mimeType, data: imageBuffer }
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            complexity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            screen_count: { type: Type.NUMBER },
            estimated_hours_min: { type: Type.NUMBER },
            estimated_hours_max: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
            risk_level: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
          },
          required: ["complexity", "screen_count", "estimated_hours_min", "estimated_hours_max", "explanation", "risk_level"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as EstimationResult;
  } catch (error) {
    console.error("Error analyzing sketch:", error);
    return null;
  }
};

export const suggestAlternativeMachine = async (unavailableMachine: Machine, allMachines: Machine[]): Promise<string> => {
  // Create a new instance right before the call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const context = `User wanted ${unavailableMachine.name} (${unavailableMachine.category}) but it is currently ${unavailableMachine.status}. 
  Here are other available machines in the lab: ${allMachines.filter(m => m.id !== unavailableMachine.id && m.status === 'Available').map(m => `${m.name} (${m.category})`).join(', ')}.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest a supportive and professional alternative for a student designer based on this context: ${context}. If no direct alternative exists, suggest the nearest related process. Keep it brief, under 30 words.`,
    });
    // Accessing .text property directly (not a method)
    return response.text || "Consult with a lab technician for immediate alternatives.";
  } catch {
    return "Check availability in adjacent labs for similar equipment.";
  }
};
