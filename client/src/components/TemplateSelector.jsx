import { Check, Layout } from "lucide-react";
import React from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume  format with  clear section and professional typography.",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "A sleek design with strategic use of color and modern font choices.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultre_clean design that puts your content front and center.",
    },
    {
      id: "minimal-image",
      name: "Minimal with Image",
      preview: "A minimalist design with a single image and clean typography.",
    },
  ];
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Layout className="cursor-pointer" size={14} />
        <span className="max-sm:hidden">Template</span>
      </button>
      {isOpen && (
        <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md shadow-sm border border-gray-200">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                    <div className="size-5 bg-blue-00 rounded-full flex items-center justify-center">
                       <Check className="w-3 h-3 text-white" /> 
                    </div>
                </div>
              ) }
              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">{template.preview}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
