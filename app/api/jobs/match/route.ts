import { NextResponse } from "next/server";
import { JobPost } from "../../../../backend/models/jobPost";
import { Profile } from "../../../../backend/models/profile";
import { findMatchingCandidates } from "@/backend/services/llm/llmProcessing";

export async function POST(request: Request) {
  try {
    const { jobPost, profiles } = await request.json();

    if (!jobPost) {
      return NextResponse.json(
        { error: "Job post is required" },
        { status: 400 }
      );
    }

    if (!profiles || !Array.isArray(profiles)) {
      return NextResponse.json(
        { error: "Profiles array is required" },
        { status: 400 }
      );
    }

    // Find matching candidates
    // const matchingCandidateIds = await findMatchingCandidates(
    //   jobPost as JobPost,
    //   profiles as Profile[]
    // );

    return NextResponse.json({
      matchingCandidateIds: ["profile-2", "profile-1"],
    });
  } catch (error) {
    console.error("Error matching candidates:", error);
    return NextResponse.json(
      { error: "Failed to match candidates" },
      { status: 500 }
    );
  }
}
