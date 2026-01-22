import { GoogleGenAI, Type } from "@google/genai";
import { SceneTimestamp } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends the video file to Gemini to detect scene timestamps.
 */
export const analyzeVideoScenes = async (base64Data: string, mimeType: string): Promise<SceneTimestamp[]> => {
  const model = "gemini-2.5-flash-latest";

  const prompt = `
    Analyze this video carefully. 
    Identify every distinct scene or camera cut.
    For each scene, provide the start time (in seconds) and end time (in seconds).
    Also provide a very short, simple 3-word description of the scene.
    Return a JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sceneNumber: { type: Type.INTEGER },
              startTime: { type: Type.NUMBER, description: "Start time of the scene in seconds" },
              endTime: { type: Type.NUMBER, description: "End time of the scene in seconds" },
              description: { type: Type.STRING, description: "3 word description" },
            },
            required: ["sceneNumber", "startTime", "endTime", "description"],
          },
        },
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data as SceneTimestamp[];
    }
    throw new Error("No data received from AI helper.");
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    throw new Error("Our AI helper had trouble watching the video. Please try again.");
  }
};