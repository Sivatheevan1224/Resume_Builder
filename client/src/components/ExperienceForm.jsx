import { Briefcase, Plus, Sparkles, Trash2 } from 'lucide-react'
import React from 'react'

const ExperienceForm = ({data, onChange}) => {

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",  
            start_date: "",
            end_date: "",
            description: "",
            is_current: false,
        };
        onChange([...data, newExperience]);
    };

    const removeExperience = (index) => {
        const updatedExperience = data.filter((_, i) => i !== index);
        onChange(updatedExperience);
    }

    const updateExperience = (index, field, value) => {
        const updatedExperience = [...data];
        updatedExperience[index] = {
            ...updatedExperience[index],
            [field]: value,
        };
        onChange(updatedExperience);
    }

  return (
    <div className='space-y-6'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='text-lg flex items-center gap-2 font-semibold text-gray-900'>Professional Experience</h3>
                <p className='text-sm text-gray-500'>Add your job experience for your resume.</p>
            </div>
            <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors '>
                <Plus className=' size-4'/>
                Add Experience
            </button>
        </div>
        {data.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
                <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
                <p>No professional experience added yet.</p>
                <p className='text-sm'>Click "Add Experience" to get started.</p>
            </div>
        ):(
            <div className='space-y-4'>
                {data.map((experience, index) => (
                    <div key={index} className='p-4 border border-gray-200 rounded-lg  space-y-3'>
                        <div className='flex justify-between items-start'>
                            <h4 className='font-semibold text-gray-800'>Experience {index + 1}</h4>
                            <button onClick={() => removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                <Trash2 className='size-4'/>
                            </button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-3'> 
                            <input type="text" className='px-3 py-2 text-sm rounded-lg' placeholder='Company Name' value={experience.company || ""} onChange={(e) => updateExperience(index, 'company', e.target.value)} />

                            <input type="text" className='px-3 py-2 text-sm rounded-lg' placeholder='Position/Title' value={experience.position || ""} onChange={(e) => updateExperience(index, 'position', e.target.value)} />

                            <input type="month" className='px-3 py-2 text-sm rounded-lg' value={experience.start_date || ""} onChange={(e) => updateExperience(index, 'start_date', e.target.value)} />

                            <input type="month" className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100'
                            disabled={experience.is_current} value={experience.end_date || ""} onChange={(e) => updateExperience(index, 'end_date', e.target.value)} />
                        </div>
                        <label className='flex items-center gap-2'>
                            <input type="checkbox" className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' checked={experience.is_current || false} onChange={(e) => updateExperience(index, 'is_current', e.target.checked ? true : false)} />
                            <span className='text-sm text-gray-700'>
                                Currently Working Here
                            </span>
                        </label>
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <label className='text-sm font-medium text-gray-700'>Job Description</label>
                                <button className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                                    <Sparkles className='w-3 h-3'/>
                                    Enhance with AI
                                </button>
                            </div>
                            <textarea className='w-full text-sm px-3 py-2 rounded-lg resize-none' placeholder='Describe your key responsibilities and achievements...' rows={4} value={experience.description || ""} onChange={(e)=>updateExperience(index,"description", e.target.value)}/>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ExperienceForm