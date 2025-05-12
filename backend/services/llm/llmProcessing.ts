import OpenAI from "openai";
import { Profile } from "../../models/profile";

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
