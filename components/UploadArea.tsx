import React from 'react';
import { ExternalLink, Cpu } from 'lucide-react';

const UploadArea: React.FC = () => {
  const handleOpenColab = () => {
    window.open("https://colab.research.google.com/drive/1DnLykhsDUbHtq1IYbq_GSOACVtIbG1gT?usp=sharing", "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
      <div className="bg-white border-2 border-indigo-100 rounded-3xl p-10 text-center shadow-sm hover:shadow-md transition-all">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-indigo-50 text-indigo-600 p-4 rounded-full">
            <Cpu size={48} />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Free Video Processor</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              We use a powerful Google Colab notebook to analyze your video and extract scenes. It's free and secure.
            </p>
          </div>

          <button 
            onClick={handleOpenColab}
            className="group flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1"
          >
            Open Free Processor
            <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="text-xs font-medium text-slate-400 bg-slate-50 px-4 py-2 rounded-full">
            Runs on Google Servers
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
        <p className="text-sm font-bold text-slate-700 mb-3 text-center">How to use it:</p>
        <div className="grid gap-3 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-indigo-600 shadow-sm">1</span>
            <span>Click the button above to open the notebook.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-indigo-600 shadow-sm">2</span>
            <span>Click the <strong>Play</strong> button in the notebook to start.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-indigo-600 shadow-sm">3</span>
            <span>Follow the instructions to upload your video.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;