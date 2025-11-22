import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = [
    "#9333ea",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];
  const [allResumes, setAllResumes] = React.useState([]);
  const [showCreateResume, setShowCreateResume] = React.useState(false);
  const [showUploadResume, setShowUploadResume] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [resume, setResume] = React.useState(null);
  const [editResumeId, setEditResumeId] = React.useState("");

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    //fetch all resumes from backend
    setAllResumes(dummyResumeData);
  };

  const createResume = async (e) => {
    e.preventDefault();
    //create resume api call
    setShowCreateResume(false);
    navigate("/app/builder/resume123");
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setShowUploadResume(false);
    //upload resume api call
    navigate("/app/builder/resume123");
  };

  const editTitle = async (e) => {
    e.preventDefault();
    //edit resume title api call
  }

  const deleteResume = async (resumeId) => {
    //delete resume api call
    const confirm = window.confirm("Are you sure you want to delete this resume?");
    if (confirm) {
      //proceed to delete
      setAllResumes(prev=> prev.filter(resume=> resume._id !== resumeId));
    }
  };
  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          {" "}
          welcome , john doe
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all  duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm  group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>
          <button 
          onClick={()=> setShowUploadResume(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <UploadCloudIcon className="size-11 transition-all  duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm  group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="my-6 border-slate-300 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={index} onClick={()=>navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48  flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div  onClick={(e) => e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-white/50 rounded  transition-colors"
                    style={{ color: baseColor }}
                  />
                  <PencilIcon
                    onClick={() => {setEditResumeId(resume._id); setTitle(resume.title);}}
                    className="size-7 p-1.5 hover:bg-white/50 rounded  transition-colors"
                    style={{ color: baseColor }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 focus:border-green-600 right-green-6000"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors ">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 focus:border-green-600 right-green-6000"
                required
              />
              <div>
                <label htmlFor="resume-input" className="block text-sm text-slate-700">
                  Select Resume File
                  <div className="flex flex-col items-center justify-center gap-2 border group  text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4  hover:border-green-500 hover:text-green-700 transition-colors cursor-pointer">
                    {resume ? (
                      <p className=" text-green-700">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p className="text-sm">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-500">
                          (Supported format: .pdf)
                        </p>
                      </>
                    )}
                  </div>
                </label>
                <input type="file" id="resume-input" hidden accept=".pdf" onChange={(e)=>setResume(e.target.files[0])}/>
              </div>
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors ">
                Upload Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 focus:border-green-600 right-green-6000"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors ">
                Update Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}


      </div>
    </div>
  );
};

export default Dashboard;
