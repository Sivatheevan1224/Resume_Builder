import React from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import Loader from '../components/Loader';
import ResumePreview from '../components/ResumePreview';
import { ArrowLeftIcon } from 'lucide-react';
import api from '../configs/api';

const Preview = () => {
  const{resumeId} = useParams();

  const[resumeData, setResumeData] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(true);

  const loadResume = async() => {
    //  setResumeData(dummyResumeData.find(resume => resume._id === resumeId) || null);
    //  setIsLoading(false);
    try {
      const {data} = await api.get(`/api/resumes/public/${resumeId}`);
      setResumeData(data.resume);
    } catch (error) {
      console.log("Error fetching public resume:", error);
    }finally{
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    loadResume();
  }, [resumeId]);

  return resumeData ? (
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes='py-4 bg-white'/>
      </div>
    </div>
  ):(
    <div>
      {isLoading ? <Loader/> : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-6xl text-slate-400 font-medium'>Resume not found</p>
          <a href='/' className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors'>
            <ArrowLeftIcon className='mr-2 size-4'/>
            Go to Home Page
          </a>
        </div>
      )}
    </div>
  )
}

export default Preview