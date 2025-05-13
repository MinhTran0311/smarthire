import OpenAI from "openai";
import { Profile } from "../../models/profile";
import { JobPost } from "@/backend/models/jobPost";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROFILE_EXTRACTION_PROMPT = `Extract the following information from the resume text and format it as JSON:
- name: Full name of the person
- title: Current or most recent job title
- skills: Array of technical skills and competencies
- yearsOfExperience: Total years of professional experience (as a number)
- aboutMe: A brief professional summary
- education: Array of education entries, each containing:
  - degree: Degree name
  - institution: School/University name
  - year: Graduation year
  - gpa: GPA if mentioned
- experience: Array of work experience entries, each containing:
  - title: Job title
  - company: Company name
  - duration: Duration of employment
  - description: Brief description of responsibilities and achievements

Format the response as a valid JSON object matching the Profile interface.`;

export async function extractProfileFromText(text: string): Promise<Profile> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a resume parser that extracts structured information from resume text.",
        },
        {
          role: "user",
          content: `${PROFILE_EXTRACTION_PROMPT}\n\nResume Text:\n${text}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }
    const extractedProfile = JSON.parse(content) as Profile;

    // Add the original extracted text to the profile
    extractedProfile.extractedText = text;

    return extractedProfile;
  } catch (error) {
    console.error("Error extracting profile from text:", error);
    throw error;
  }
}

const JOB_MATCHING_PROMPT = `Given a job description and a list of candidate profiles, find the top candidates that best match the job requirements.
Consider the following factors:
- Skills match with job requirements
- Years of experience
- Education background
- Previous work experience relevance

Return a JSON array of candidate IDs sorted by match quality, with the best matches first. The field returned should be called "result".
Limit the number of candidates to the specified maxCandidates.`;

export async function findMatchingCandidates(
  jobPost: JobPost,
  candidates: Profile[],
  maxCandidates: number = 2
): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a job matching expert that finds the best candidates for job positions.",
        },
        {
          role: "user",
          content: `${JOB_MATCHING_PROMPT}\n\nJob Description:\n${JSON.stringify(
            jobPost
          )}\n\nCandidates:\n${JSON.stringify(
            candidates
          )}\n\nMax Candidates: ${maxCandidates}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    console.log(
      "Job post:",
      `${JOB_MATCHING_PROMPT}\n\nJob Description:\n${JSON.stringify(
        jobPost
      )}\n\nCandidates:\n${JSON.stringify(
        candidates
      )}\n\nMax Candidates: ${maxCandidates}`
    );
    console.log("Completion:", completion.choices[0].message);

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }
    const result = JSON.parse(content);
    console.log("Result:", result);
    return result.result;
  } catch (error) {
    console.error("Error finding matching candidates:", error);
    throw error;
  }
}
