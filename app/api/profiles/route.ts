import { NextRequest, NextResponse } from "next/server";
import {
  processAllProfiles,
  processUploadedPDF,
} from "../../../backend/services/profiles/profileExtraction";

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "No file uploaded",
        },
        { status: 400 }
      );
    }

    // Check if the file is a PDF
    if (!file.type.includes("pdf")) {
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

// data: [
//   {
//     id: "profile-1",
//     name: "Viet-Tham Huynh",
//     title: "Researcher at VNUHCM - University of Science",
//     skills: [
//       "Software Development",
//       "Virtual Reality (VR)",
//       "Augmented Reality (AR)",
//     ],
//     yearsOfExperience: 7,
//     aboutMe:
//       "Viet-Tham Huynh is currently a researcher at Software Engineering Laboratory (SELab), University of Science, VNU-HCM. His research interests are Augmented Reality, Virtual Reality and Mixed Reality.",
//     education: [
//       {
//         degree: "Master of Science - MS",
//         institution: "VNUHCM - University of Science",
//         year: 2023,
//       },
//       {
//         degree: "Bachelor's degree",
//         institution: "VNUHCM - University of Science",
//         year: 2020,
//       },
//     ],
//     experience: [
//       {
//         title: "Researcher",
//         company: "VNUHCM - University of Science",
//         duration: "January 2021 - Present",
//         description:
//           "Research methods in Human-Computer Interaction (HCI), Augmented Reality (AR), Virtual Reality (VR), Mixed Reality (MR)",
//       },
//       {
//         title: "Research Intern",
//         company:
//           "National Institute of Informatics [Japan] 国立情報学研究所",
//         duration: "March 2024 - September 2024",
//         description:
//           "Worked as a research intern focusing on advanced informatics studies.",
//       },
//       {
//         title: "Software Developer",
//         company: "City Science Lab @ Ho Chi Minh City",
//         duration: "May 2021 - March 2024",
//         description:
//           "Developed software solutions and collaborated in interdisciplinary projects.",
//       },
//       {
//         title: "Virtual Reality & Augmented Reality Software Engineer",
//         company: "Drone Orange",
//         duration: "October 2020 - January 2021",
//         description: "Focused on VR and AR applications development.",
//       },
//       {
//         title: "Teacher Assistant",
//         company: "American Center",
//         duration: "June 2019 - July 2019",
//         description: "Assisted in the MOOC Web Programming course.",
//       },
//       {
//         title: "Teacher Assistant",
//         company: "American Center",
//         duration: "January 2018 - December 2018",
//         description: "Teaching at the Robotics Club.",
//       },
//     ],
//     extractedText:
//       "\n\n  \nContact\nwww.linkedin.com/in/hvtham\n(LinkedIn)\nTop Skills\nSoftware Development\nVirtual Reality (VR)\nAugmented Reality (AR)\nCertifications\nMachine Learning with TensorFlow\non Google Cloud Platform\nSpecialization\nLaunching into Machine Learning\nHow Google does Machine Learning\nArt and Science of Machine Learning\nFeature Engineering\nHonors-Awards\nTop 3 in Student Scientific Research\nPrize Euréka 2020\nViet-Tham Huynh\nResearcher at VNUHCM - University of Science\nHo Chi Minh City, Vietnam\nSummary\nViet-Tham Huynh is currently a researcher at Software Engineering\nLaboratory (SELab), University of Science, VNU-HCM. His research\ninterests are Augmented Reality, Virtual Reality and Mixed Reality.\nExperience\nVNUHCM - University of Science\nResearcher\nJanuary 2021 - Present (4 years 5 months)\nResearch methods in Human-Computer Interaction (HCI), Augmented Reality\n(AR), Virtual Reality (VR), Mixed Reality (MR)\nNational Institute of Informatics [Japan] 国立情報学研究所\nResearch Intern\nMarch 2024 - September 2024 (7 months)\nChiyoda, Tokyo, Japan\nCity Science Lab @ Ho Chi Minh City\nSoftware Developer\nMay 2021 - March 2024 (2 years 11 months)\nDrone Orange\nVirtual Reality & Augmented Reality Software Engineer\nOctober 2020 - January 2021 (4 months)\nAmerican Center\nTeacher Assistant\nJune 2019 - July 2019 (2 months)\nHo Chi Minh City, Vietnam\nTeaching Assistance to the Massive Open Online Course (MOOC) Web\nProgramming\nAmerican Center\nTeacher Assistant\n \nPage 1 of 2\n\n  \nJanuary 2018 - December 2018 (1 year)\nHo Chi Minh City, Vietnam\nTeaching at the Robotics Club\nEducation\nVNUHCM - University of Science\nMaster of Science - MS, Computer Science · (December 2021 - December\n2023)\nVNUHCM - University of Science\nBachelor's degree, Information Technology · (2016 - 2020)\n \nPage 2 of 2",
//     pathToResume:
//       "Profile1.pdf",
//   },
//   {
//     id: "profile-2",
//     name: "Võ Huyền Trang",
//     title: "Full Stack Developer",
//     skills: ["React.js", "Node.js", "Web Applications"],
//     yearsOfExperience: 4,
//     aboutMe:
//       "Experienced Frontend Developer with a demonstrated history of working in the information technology and services industry. Skilled in Web development and English. Strong engineering professional with a Bachelor of Science in Computer Science focused in Computer Science from VNUHCM-University of Information Technology.",
//     education: [
//       {
//         degree: "Bachelor's degree",
//         institution: "University of Information Technology",
//         year: 2020,
//         gpa: null,
//       },
//     ],
//     experience: [
//       {
//         title: "Full Stack Developer",
//         company: "GEO system solutions Vietnam",
//         duration: "April 2021 - Present",
//         description:
//           "Working as a Full Stack Developer at GEO system solutions Vietnam.",
//       },
//       {
//         title: "Frontend Developer",
//         company: "GEO system solutions Vietnam",
//         duration: "January 2021 - April 2021",
//         description:
//           "Worked as a Frontend Developer at GEO system solutions Vietnam.",
//       },
//     ],
//     extractedText:
//       "\n\n  \nContact\nwww.linkedin.com/in/võ-huyền-\ntrang-5988511b9 (LinkedIn)\nTop Skills\nReact.js\nNode.js\nWeb Applications\nLanguages\nEnglish (Professional Working)\nVõ Huyền Trang\nFull-stack dev at GEO system solutions Vietnam\nHo Chi Minh City, Vietnam\nSummary\nExperienced Frontend Developer with a demonstrated history of\nworking in the information technology and services industry. Skilled\nin Web development and English. Strong engineering professional\nwith a Bachelor of Science in Computer Science focused in\nComputer Science from VNUHCM-University of Information\nTechnology. \nExperience\nGEO system solutions Vietnam\n4 years 5 months\nFull Stack Developer\nApril 2021 - Present (4 years 2 months)\nHo Chi Minh City, Vietnam\nFrontend Developer\nJanuary 2021 - April 2021 (4 months)\nHo Chi Minh City, Vietnam\nEducation\nUniversity of Information Technology\nBachelor's degree, Computer Science · (September 2016 - November 2020)\n \nPage 1 of 1",
//     pathToResume:
//       "Profile2.pdf",
//   },
//   {
//     id: "profile-3",
//     name: "Thang Nguyen Tien",
//     title:
//       "AI Engineer - Student at University of Information Technology",
//     skills: ["Deep Learning", "Machine Learning", "SQL"],
//     yearsOfExperience: 0,
//     aboutMe: "",
//     education: [
//       {
//         degree: "Currently pursuing a degree",
//         institution: "University of Information Technology",
//         year: 2027,
//         gpa: null,
//       },
//     ],
//     experience: [],
//     extractedText:
//       "\n\n  \nContact\nwww.linkedin.com/in/thangnt2508\n(LinkedIn)\nTop Skills\nDeep Learning\nMachine Learning\nSQL\nCertifications\nFundamentals of Agents\nSecond Finalists - SoICT Hackathon\n2024 (Track Traffic Vehicle\nDetection)  \nCertificate of Presentation\nCertificate of Sciencetific Research\nPublication \nHonors-Awards\nSecond Finalists of Ho Chi Minh AI\nChallenge 2024\nSecond Finalist of SoICT Hackathon\n2024, Track Traffic Vehicle Detection\nThang Nguyen Tien\nAI Engineer - Student at University of Information Technology\nHo Chi Minh City, Ho Chi Minh City, Vietnam\nEducation\nUniversity of Information Technology\n · (2023 - 2027)\n \nPage 1 of 1",
//     pathToResume:
//       "Profile3.pdf",
//   },
//   {
//     id: "profile-4",
//     name: "Thiet Su Nguyen",
//     title: "AI Engineer",
//     skills: [
//       "Stable Diffusion",
//       "Large Language Models (LLM)",
//       "Optimize AI Model",
//     ],
//     yearsOfExperience: 3,
//     aboutMe:
//       "An AI engineer with expertise in Stable Diffusion, Large Language Models, and AI model optimization. Currently working at VinFast, with extensive experience in generative AI.",
//     education: [],
//     experience: [
//       {
//         title: "AI Engineer",
//         company: "VINFAST",
//         duration: "May 2025 - Present",
//         description:
//           "Working on advanced AI technologies and contributing to innovative projects.",
//       },
//       {
//         title: "AI Engineer",
//         company: "VinAI",
//         duration: "December 2024 - May 2025",
//         description:
//           "Involved in developing cutting-edge AI models, with a focus on language processing.",
//       },
//       {
//         title: "Generative AI Engineer",
//         company: "ILLUMINUS AI",
//         duration: "March 2024 - December 2024",
//         description:
//           "Specialized in generative AI projects, implementing novel AI techniques.",
//       },
//       {
//         title: "AI Engineer",
//         company: "GSOFT",
//         duration: "August 2022 - March 2024",
//         description:
//           "Developed AI solutions, optimized models, and enhanced AI systems performance.",
//       },
//     ],
//     extractedText:
//       "\n\n  \nContact\nwww.linkedin.com/in/sunt33\n(LinkedIn)\nTop Skills\nStable Diffusion\nLarge Language Models (LLM)\nOptimize AI Model\nThiet Su Nguyen\nAI Engineer at VinFast\nHo Chi Minh City, Vietnam\nExperience\nVINFAST \nAI Engineer\nMay 2025 - Present (1 month)\nHo Chi Minh City, Vietnam\nVinAI\nAI Engineer\nDecember 2024 - May 2025 (6 months)\nHo Chi Minh City, Vietnam\nILLUMINUS AI\nGenerative AI Engineer\nMarch 2024 - December 2024 (10 months)\nVietnam\nGSOFT\nAI Engineer\nAugust 2022 - March 2024 (1 year 8 months)\n235 Lý Thường Kiệt, Phường 6, Tân Bình\n \nPage 1 of 1",
//     pathToResume:
//       "Profile4.pdf",
//   },
// ],
