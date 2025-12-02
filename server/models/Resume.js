import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title:{type:String, default:"My Resume"},
    public: { type: Boolean, default: false },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },
    professional_summary: { type: String, default: "" },
    personal_info: {
        image:{ type:String, default:""},
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        // github: { type: String, default: "" },
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
  { timestamps: true , minimize: false}
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;