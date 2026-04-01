import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ResumeForm from '@/components/ResumeForm';
import AnalysisDashboard from '@/components/AnalysisDashboard';
import LoadingScreen from '@/components/LoadingScreen';
import { ResumeData, AnalysisResult } from '@/lib/types';
import { analyzeResume } from '@/lib/analysis-engine';

type View = 'hero' | 'form' | 'loading' | 'dashboard';

const Index = () => {
  const [view, setView] = useState<View>('hero');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleSubmit = (data: ResumeData) => {
    setResumeData(data);
    setView('loading');
    setTimeout(() => {
      const result = analyzeResume(data);
      setAnalysis(result);
      setView('dashboard');
    }, 3000);
  };

  if (view === 'hero') return <HeroSection onGetStarted={() => setView('form')} />;
  if (view === 'form') return <ResumeForm onSubmit={handleSubmit} onBack={() => setView('hero')} />;
  if (view === 'loading') return <LoadingScreen />;
  if (view === 'dashboard' && resumeData && analysis) {
    return <AnalysisDashboard data={resumeData} analysis={analysis} onBack={() => setView('form')} />;
  }
  return <HeroSection onGetStarted={() => setView('form')} />;
};

export default Index;
