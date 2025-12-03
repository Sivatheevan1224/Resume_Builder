import { Loader2, Sparkles } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);

  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const promt = `Enhance the following professional summary for a resume, making it more compelling and impactful: ${data}`;

      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: promt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent,
      }));
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to enhance professional summary"
      );
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg flex items-center gap-2 font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add a brief summary for your resume.
          </p>
        </div>
        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="text-yellow-400 size-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:rinng focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlights your key strength and  career  objectives..."
          rows={7}
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
          Tip: Keep it concise (3-4 sentences) and focused on your key
          achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
