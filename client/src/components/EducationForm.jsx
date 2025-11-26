import { GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updatedEducation = data.filter((_, i) => i !== index);
    onChange(updatedEducation);
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...data];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    onChange(updatedEducation);
  };
  return (
     <div className='space-y-6'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='text-lg flex items-center gap-2 font-semibold text-gray-900'>Education</h3>
                <p className='text-sm text-gray-500'>Add your educational background for your resume.</p>
            </div>
            <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors '>
                <Plus className=' size-4'/>
                Add Education
            </button>
        </div>
        {data.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
                <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
                <p>No educational background added yet.</p>
                <p className='text-sm'>Click "Add Education" to get started.</p>
            </div>
        ):(
            <div className='space-y-4'>
                {data.map((education, index) => (
                    <div key={index} className='p-4 border border-gray-200 rounded-lg  space-y-3'>
                        <div className='flex justify-between items-start'>
                            <h4 className='font-semibold text-gray-800'>Education {index + 1}</h4>
                            <button onClick={() => removeEducation(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                <Trash2 className='size-4'/>
                            </button>
                        </div>

                        <div className='grid md:grid-cols-2 gap-3'>

                            <input type="text" className='px-3 py-2 text-sm rounded-lg' placeholder='Institution Name' value={education.institution || ""} onChange={(e) => updateEducation(index, 'institution', e.target.value)} />

                            <input type="text" className='px-3 py-2 text-sm rounded-lg' placeholder="Degree (e.g., Bachelor's , Master's)" value={education.degree || ""} onChange={(e) => updateEducation(index, 'degree', e.target.value)} />

                            <input type="text" className='px-3 py-2 text-sm rounded-lg' placeholder='Field of Study' value={education.field || ""} onChange={(e) => updateEducation(index, 'field', e.target.value)} />

                            <input type="month" className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100'
                             value={education.graduation_date || ""} onChange={(e) => updateEducation(index, 'graduation_date', e.target.value)} />

                            <input type="text" className='px-3 py-2 text-sm rounded-lg' placeholder='GPA (optional)' value={education.gpa || ""} onChange={(e) => updateEducation(index, 'gpa', e.target.value)} />

                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default EducationForm;
