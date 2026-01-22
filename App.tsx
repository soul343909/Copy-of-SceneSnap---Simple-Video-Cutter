import React from 'react';
import Header from './components/Header';
import UploadArea from './components/UploadArea';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <Header />

        <main className="mt-10">
          <UploadArea />
        </main>

        <footer className="mt-20 text-center text-slate-400 text-sm">
          <p>Powered by Gemini AI • Google Colab</p>
        </footer>
      </div>
    </div>
  );
};

export default App;