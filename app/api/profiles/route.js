import { NextResponse } from "next/server";
import {
  processAllProfiles,
  processUploadedPDF,
} from "../../../backend/services/profiles/utils";

export async function GET() {
  try {
    const profiles = await processAllProfiles();
    return NextResponse.json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    console.error("Error in profiles API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process profiles",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file uploaded",
        },
        { status: 400 }
      );
    }

    // Check if the file is a PDF
    if (!file.type || !file.type.includes("pdf")) {
      return NextResponse.json(
        {
          success: false,
          error: "File must be a PDF",
        },
        { status: 400 }
      );
    }

    // Convert the file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process the uploaded PDF
    const result = await processUploadedPDF(buffer, file.name);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error processing uploaded PDF:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process uploaded PDF",
      },
      { status: 500 }
    );
  }
}
