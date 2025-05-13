import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function getChatResponse(
  messages: ChatMessage[],
  candidateInfo: string,
  jobDescription: string
): Promise<string> {
  const systemPrompt = `You are an AI assistant helping to evaluate the match between a candidate and a job position. 
  Here is the candidate's background information:
  ${candidateInfo}
  
  Here is the job description:
  ${jobDescription}
  
  Please provide insights about the match between the candidate and the job position.`;
  console.log("systemPrompt", systemPrompt);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
    });

    return (
      response.choices[0]?.message?.content ||
      "I apologize, but I couldn't generate a response."
    );
  } catch (error) {
    console.error("Error in chat service:", error);
    throw new Error("Failed to get chat response");
  }
}
