import { Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

const STEPS = [
  'Parsing your resume...',
  'Extracting job description keywords...',
  'Running ATS compatibility check...',
  'Analyzing keyword match...',
  'Scoring readability & uniqueness...',
  'Generating improvement suggestions...',
];

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + 2, 100);
        setStepIdx(Math.min(Math.floor(next / (100 / STEPS.length)), STEPS.length - 1));
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md px-6 animate-fade-up">
        <div className="h-20 w-20 rounded-full gradient-primary mx-auto mb-6 flex items-center justify-center animate-pulse-glow">
          <Sparkles className="h-10 w-10 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Analyzing Your Resume</h2>
        <p className="text-muted-foreground mb-6">{STEPS[stepIdx]}</p>
        <Progress value={progress} className="h-2 mb-4" />
        <p className="text-xs text-muted-foreground">{progress}% complete</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
