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

/**
 * Process all PDF files in the backend/data directory.
 */
export async function processAllProfiles(): Promise<Profile[]> {
  try {
    const dataDir = path.resolve(process.cwd(), "backend", "data");
    const files = await fs.readdir(dataDir);
    const pdfFiles = files.filter((file) =>
      file.toLowerCase().endsWith(".pdf")
    );

    if (pdfFiles.length === 0) {
      console.log("No PDF files found in directory");
      return [];
    }

    const profiles = await Promise.all(
      pdfFiles.map(async (filename): Promise<Profile> => {
        const filePath = path.join(dataDir, filename);
        const content = await extractTextFromPDF(filePath);
        const profile = await extractProfileFromText(content);
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
  fileBuffer: Buffer,
  filename: string
): Promise<Profile> {
  try {
    const data = await pdfParse(fileBuffer);
    const profile = await extractProfileFromText(data.text);
    profile.pathToResume = filename;
    return profile;
  } catch (error) {
    console.error(`Error processing uploaded PDF ${filename}:`, error);
    throw error;
  }
}
