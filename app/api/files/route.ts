import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
import { mkdir } from "fs/promises";
import Busboy from "busboy";
import { Readable } from "stream";
import { processUploadedPDF } from "@/backend/services/profiles/profileExtraction";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get("fileName");

  if (!fileName) {
    return new Response("File name is required", { status: 400 });
  }

  // Prevent path traversal by sanitizing the file name
  const safeFileName = path.basename(fileName);
  const filePath = path.join(process.cwd(), "files", safeFileName); // or 'files', if that's your folder

  try {
    const fileBuffer = fs.readFileSync(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFileName}"`,
      },
    });
  } catch (error) {
    console.error("Error reading file:", error);
    return new Response("File not found", { status: 404 });
  }
}

function webStreamToNodeReadable(
  webStream: ReadableStream<Uint8Array>
): Readable {
  const reader = webStream.getReader();

  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) this.push(null);
      else this.push(Buffer.from(value));
    },
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const uploadDir = path.join(process.cwd(), "/files");
    await mkdir(uploadDir, { recursive: true });

    const nodeReadable = webStreamToNodeReadable(req.body!);
    const busboy = Busboy({ headers: Object.fromEntries(req.headers) });

    const result = await new Promise<{ profile: any }>((resolve, reject) => {
      let fileBuffer: Buffer[] = [];
      let fileName = "";

      busboy.on("file", (fieldname, file, filename) => {
        fileName = filename.filename;
        file.on("data", (data) => fileBuffer.push(data));
        file.on("end", async () => {
          // File fully read
        });
      });

      busboy.on("finish", async () => {
        try {
          const buffer = Buffer.concat(fileBuffer);
          const profile = await processUploadedPDF(buffer, fileName);
          resolve({ profile });
        } catch (err) {
          reject(err);
        }
      });

      busboy.on("error", reject);
      nodeReadable.pipe(busboy);
    });

    return NextResponse.json({
      message: "File uploaded and processed successfully",
      ok: true,
      ...result,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}
