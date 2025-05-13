import { NextRequest } from "next/server";
import { getChatResponse, ChatMessage } from "@/backend/services/chat/chat";

export async function POST(req: NextRequest) {
  try {
    const { messages, candidateInfo, jobDescription } = await req.json();

    if (!messages || !candidateInfo || !jobDescription) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await getChatResponse(
      messages as ChatMessage[],
      candidateInfo,
      jobDescription
    );

    return Response.json({ response });
  } catch (error) {
    console.error("Error in chat route:", error);
    return Response.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
