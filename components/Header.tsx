import React from 'react';
import { Scissors } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center space-y-4">
      <div className="flex justify-center items-center gap-3">
        <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg">
          <Scissors size={32} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
          Scene<span className="text-indigo-600">Snap</span>
        </h1>
      </div>
      <p className="text-lg text-slate-500 max-w-md mx-auto">
        Your simple video helper. Use our cloud tool to detect scenes and extract photos.
      </p>
    </header>
  );
};

export default Header;