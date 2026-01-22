import React from 'react';
import { ProcessedScene } from '../types';
import { Download, Layers } from 'lucide-react';
import JSZip from 'jszip';
import saveAs from 'file-saver';

interface ResultsGridProps {
  scenes: ProcessedScene[];
  onReset: () => void;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ scenes, onReset }) => {

  const handleDownloadSingle = (url: string, name: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder("scenes");
    
    if (!folder) return;

    scenes.forEach((scene) => {
      // Convert Data URL to Blob for Zip
      const startData = scene.startFrameUrl.split(',')[1];
      const endData = scene.endFrameUrl.split(',')[1];
      
      folder.file(`scene_${scene.id}_start.jpg`, startData, { base64: true });
      folder.file(`scene_${scene.id}_end.jpg`, endData, { base64: true });
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "all_scenes.zip");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">We found {scenes.length} scenes!</h2>
          <p className="text-slate-500">Here are the start and end photos for each one.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onReset}
            className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
          >
            Start Over
          </button>
          <button 
            onClick={handleDownloadAll}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
          >
            <Layers size={20} />
            Download All (ZIP)
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenes.map((scene) => (
          <div key={scene.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 group">
            <div className="p-4 border-b border-slate-50 flex justify-between items-center">
              <span className="font-bold text-slate-700">Scene {scene.id}</span>
              <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md truncate max-w-[150px]">
                {scene.description}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-px bg-slate-100">
              {/* Start Frame */}
              <div className="relative bg-white">
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md">START</div>
                <img src={scene.startFrameUrl} alt={`Scene ${scene.id} Start`} className="w-full h-40 object-cover" />
                <button 
                  onClick={() => handleDownloadSingle(scene.startFrameUrl, `scene_${scene.id}_start.jpg`)}
                  className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-white text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Download Start Frame"
                >
                  <Download size={16} />
                </button>
              </div>

              {/* End Frame */}
              <div className="relative bg-white">
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md">END</div>
                <img src={scene.endFrameUrl} alt={`Scene ${scene.id} End`} className="w-full h-40 object-cover" />
                <button 
                  onClick={() => handleDownloadSingle(scene.endFrameUrl, `scene_${scene.id}_end.jpg`)}
                  className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-white text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Download End Frame"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsGrid;