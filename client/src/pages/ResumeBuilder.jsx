import React from 'react'

const ResumeBuilder = () => {

  const [resumeData, setResumeData] = React.useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    template:"classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async (resumeId) => {
    //api call to load resume data by id
  }

  return (
    <div>

    </div>
  )
}

export default ResumeBuilder