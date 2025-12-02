import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// controller for create a new resume
//POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({
      userId,
      title,
    });

    ///return success message with new resume
    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

///controller for deleting a resume
//DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.userId;

    //check if resume exists
    const existingResume = await Resume.findOne({ _id: resumeId, userId });
    if (!existingResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    //delete resume
    await Resume.findOneAndDelete({ _id: resumeId, userId });

    //return success message
    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for get user resume by id
//GET: /api/resumes/get

export const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.userId;
    //check if resume exists
    const existingResume = await Resume.findOne({ _id: resumeId, userId });
    if (!existingResume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    //return resume data

    existingResume.__v = undefined; //hide __v in response
    existingResume.createdAt = undefined; //hide createdAt in response
    existingResume.updatedAt = undefined; //hide updatedAt in response

    return res.status(200).json({ resume: existingResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get resume by id public
//GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    //check if resume exists and is public
    const existingResume = await Resume.findOne({
      _id: resumeId,
      public: true,
    });
    if (!existingResume) {
      return res.status(404).json({ message: "Public resume not found" });
    }
    //return resume data
    existingResume.__v = undefined; //hide __v in response
    existingResume.createdAt = undefined; //hide createdAt in response
    existingResume.updatedAt = undefined; //hide updatedAt in response

    return res.status(200).json({ resume: existingResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for updating a resume
//PUT: /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy = JSON.parse(resumeData);

    if (image) {

        const imageBufferData= fs.createReadStream(image.path);

      //upload image to imagekit

      const response = await imagekit.files.upload({
        file: imageBufferData, //required
        fileName: image.originalname,
        folder: "user-resumes",
        transformation:{
            pre:'w-300, h-300, fo-face , z-0.75'+ (removeBackground ? ', e-bgremove' : '')
        }
      });

      resumeDataCopy.personal_info.image = response.url;

        //remove temp file
    //   fs.unlinkSync(image.path);
    //   console.log(response);
    }

    const resume = await Resume.findByIdAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Resume updated successfully", resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
