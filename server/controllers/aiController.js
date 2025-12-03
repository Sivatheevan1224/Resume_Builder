//controller for enhancing a resume's profrssional summary
//POST: /api/ai/enhance-pro-summary

import groq from "../configs/ai.js";
import Resume from "../models/Resume.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res
        .status(400)
        .json({ message: "Professional summary is required" });
    }

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Only return text, no options or anything else."
        },
        {
          role: "user",
          content: userContent
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });
    
    const enhancedContent = completion.choices[0].message.content;
    
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//controller for enhancing resumme job descriptions
//POST: /api/ai/enhance-job-desc

export const enhanceJobDescriptions = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required field" });
    }

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an expert in resume writing. Your task is to enhance the job descriptions of a resume. The job description should be only in 1-2 sentences also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make them compelling and ATS-friendly. Only return text, no options or anything else."
        },
        {
          role: "user",
          content: userContent
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });
    
    const enhancedContent = completion.choices[0].message.content;
    
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//controller for uploading a resume to the database
//POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
  try {

    const {resumeText, title} = req.body;
    const userId= req.userId

    if(!resumeText || !title){
        return res.status(400).json({message:"Missing required fields"});
    }

    const systemPrompt="You are an expert AI Agent to extract data from resume."

    const userPromt=`extract the data from this resume :${resumeText} 
    
    provide data in the following JSON format with no additional text before or after:
    
    professional_summary: { type: String, default: "" },
    personal_info: {
        image:{ type:String, default:""},
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        website: { type: String, default: "" },
    },
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        field: { type: String },
        graduation_date: { type: Date },
        gpa: { type: String },
      },
    ],
    experience: [
      {
        company: { type: String},
        position: { type: String},
        startDate: Date,
        endDate: Date,
        description: { type: String },
        is_current: { type: Boolean},
      },
    ],
    skills: [String],
    projects: [
      {
        name: { type: String },
        type: { type: String },
        description: { type: String }
      },
    ],
  },
    
    `

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPromt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 2000
    });

    const extractedData = completion.choices[0].message.content;
    const parsedData= JSON.parse(extractedData);
    const newResume= await Resume.create({
        userId,
        title,
        ...parsedData
    });

    res.json({resumeId: newResume._id, message:"Resume uploaded successfully"});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
