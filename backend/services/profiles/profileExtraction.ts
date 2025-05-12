import fs from "fs/promises";
import path from "path";
import parser from "pdf-parse";

interface Profile {
  filename: string;
  content: string;
}

export async function extractTextFromPDF(pdfPath: string): Promise<string> {
  try {
    const dataBuffer = await fs.readFile(pdfPath);
    const data = await parser(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(`Error extracting text from PDF ${pdfPath}:`, error);
    throw error;
  }
}

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
        return { filename, content };
      })
    );

    return profiles;
  } catch (error) {
    console.error("Error processing profiles:", error);
    throw error;
  }
}

export async function processUploadedPDF(
  fileBuffer: Buffer,
  filename: string
): Promise<Profile> {
  try {
    const data = await parser(fileBuffer);
    return {
      filename,
      content: data.text,
    };
  } catch (error) {
    console.error(`Error processing uploaded PDF ${filename}:`, error);
    throw error;
  }
}
