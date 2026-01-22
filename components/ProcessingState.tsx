import React from 'react';
import { Loader2, BrainCircuit, Film, Image as ImageIcon } from 'lucide-react';
import { AppState } from '../types';

interface ProcessingStateProps {
  state: AppState;
  progress?: number;
}

const ProcessingState: React.FC<ProcessingStateProps> = ({ state, progress = 0 }) => {
  if (state === AppState.IDLE || state === AppState.DONE || state === AppState.ERROR) return null;

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full text-center space-y-6 border border-slate-100">
        
        {/* Icon Animation */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-white p-4 rounded-full shadow-md">
             {state === AppState.UPLOADING && <Film className="text-indigo-600 animate-bounce" size={48} />}
             {state === AppState.ANALYZING && <BrainCircuit className="text-indigo-600 animate-pulse" size={48} />}
             {state === AppState.EXTRACTING && <ImageIcon className="text-indigo-600 animate-spin-slow" size={48} />}
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {state === AppState.UPLOADING && "Reading your video..."}
            {state === AppState.ANALYZING && "Looking for scene changes..."}
            {state === AppState.EXTRACTING && "Taking photos of each scene..."}
          </h2>
          <p className="text-slate-500">
            {state === AppState.UPLOADING && "Just getting it ready for the helper."}
            {state === AppState.ANALYZING && "Our AI helper is watching your video now."}
            {state === AppState.EXTRACTING && "Almost there! Extracting the best frames."}
          </p>
        </div>

        {/* Progress Bar (Only for extraction mostly) */}
        {state === AppState.EXTRACTING && (
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        
        <div className="flex items-center justify-center gap-2 text-indigo-600 text-sm font-medium">
          <Loader2 className="animate-spin" size={16} />
          <span>Please wait a moment</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingState;