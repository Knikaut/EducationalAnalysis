import React from 'react';
import { AnalysisResult as AnalysisResultType } from '../types';
import { Download, RefreshCw, FileJson, FileText } from 'lucide-react';

interface AnalysisResultProps {
  result: AnalysisResultType;
  onReset: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onReset }) => {
  
  const downloadTxt = () => {
    const blob = new Blob([result.rawText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.universityName.replace(/\s+/g, '_')}_Analysis.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadJson = () => {
    const blob = new Blob([result.scrapedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.universityName.replace(/\s+/g, '_')}_Data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-50">
        
        {/* Header */}
        <div className="bg-indigo-600 px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Анализ завершен</h2>
            <p className="text-indigo-100 text-sm mt-1">Сгенерировано Gemini Flash 2.5</p>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={downloadJson}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <FileJson size={16} />
              <span>Raw JSON</span>
            </button>
            <button 
              onClick={downloadTxt}
              className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg text-sm font-medium shadow-sm transition-colors"
            >
              <Download size={16} />
              <span>Скачать отчет</span>
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <div className="p-8">
          <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm uppercase tracking-wider font-semibold">
            <FileText size={16} />
            <h3>Предпросмотр отчета</h3>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 h-96 overflow-y-auto font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed shadow-inner">
            {result.rawText}
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={onReset}
              className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors px-6 py-3 rounded-full hover:bg-slate-50"
            >
              <RefreshCw size={18} />
              <span>Проверить другой ВУЗ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;