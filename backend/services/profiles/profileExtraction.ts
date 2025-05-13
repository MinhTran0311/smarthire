import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";
import { Profile } from "../../models/profile";
import { extractProfileFromText } from "../llm/llmProcessing";

/**
 * Extract text content from a PDF at a given path.
 * @param pdfPath Absolute path to the PDF file.
 */
export async function extractTextFromPDF(pdfPath: string): Promise<string> {
  try {
    const dataBuffer = await fs.readFile(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(`Error extracting text from PDF ${pdfPath}:`, error);
    throw error;
  }
}

const dataDir = path.join(process.cwd(), "backend", "data");

/**
 * Process all PDF files in the backend/data directory.
 */
export async function processAllProfiles(): Promise<Profile[]> {
  try {
    const files = await fs.readdir(dataDir);
    const pdfFiles = files.filter((file) => file.endsWith(".pdf"));

    const profiles = await Promise.all(
      pdfFiles.map(async (filename): Promise<Profile> => {
        const filePath = path.join(dataDir, filename);
        const content = await extractTextFromPDF(filePath);
        const profile = await extractProfileFromText(content);
        profile.id = crypto.randomUUID();
        profile.pathToResume = filePath;
        return profile;
      })
    );

    return profiles;
  } catch (error) {
    console.error("Error processing profiles:", error);
    throw error;
  }
}

/**
 * Process a PDF from an uploaded buffer (e.g., via form submission).
 */
export async function processUploadedPDF(
  buffer: Buffer,
  filename: string
): Promise<Profile> {
  try {
    const filePath = path.join(dataDir, filename);
    await fs.writeFile(filePath, buffer);
    const content = await extractTextFromPDF(filePath);
    const profile = await extractProfileFromText(content);
    profile.id = crypto.randomUUID();
    profile.pathToResume = filePath;
    return profile;
  } catch (error) {
    console.error("Error processing uploaded PDF:", error);
    throw error;
  }
}
