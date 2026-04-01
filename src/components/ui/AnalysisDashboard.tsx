import { useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle, XCircle, TrendingUp, Star, Copy, Check, Shield, Eye, Fingerprint, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AnalysisResult, ResumeData, ImprovedResume } from '@/lib/types';
import { generateImprovedResume } from '@/lib/analysis-engine';
import ImprovedResumeView from './ImprovedResumeView';

interface DashboardProps {
  data: ResumeData;
  analysis: AnalysisResult;
  onBack: () => void;
}

const ScoreCircle = ({ score, label, color, tooltip }: { score: number; label: string; color: string; tooltip: string }) => {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col items-center gap-2 animate-count-up">
          <div className="relative w-28 h-28">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="8"
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round" className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{score}%</span>
            </div>
          </div>
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent><p className="max-w-xs">{tooltip}</p></TooltipContent>
    </Tooltip>
  );
};

const RatingBadge = ({ rating }: { rating: string }) => {
  const colors: Record<string, string> = {
    Beginner: 'bg-destructive/10 text-destructive',
    Intermediate: 'bg-warning/10 text-warning',
    Strong: 'bg-primary/10 text-primary',
    Expert: 'bg-success/10 text-success',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${colors[rating] || ''}`}>
      <Star className="h-4 w-4" /> {rating}
    </span>
  );
};

const AnalysisDashboard = ({ data, analysis, onBack }: DashboardProps) => {
  const [showImproved, setShowImproved] = useState(false);
  const [improved, setImproved] = useState<ImprovedResume | null>(null);
  const [improving, setImproving] = useState(false);

  const handleImprove = () => {
    setImproving(true);
    setTimeout(() => {
      const result = generateImprovedResume(data, analysis);
      setImproved(result);
      setImproving(false);
      setShowImproved(true);
    }, 2500);
  };

  if (showImproved && improved) {
    return <ImprovedResumeView data={data} analysis={analysis} improved={improved} onBack={() => setShowImproved(false)} />;
  }

  if (improving) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-up">
          <div className="h-20 w-20 rounded-full gradient-primary mx-auto mb-6 flex items-center justify-center animate-pulse-glow">
            <Sparkles className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Improving Your Resume</h2>
          <p className="text-muted-foreground">Applying AI enhancements with human-like tone...</p>
          <div className="mt-6 w-64 mx-auto">
            <Progress value={66} className="h-2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-5 w-5" /></Button>
            <h1 className="text-lg font-semibold text-foreground">Resume Analysis</h1>
          </div>
          <RatingBadge rating={analysis.rating} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8 animate-fade-up">
        {/* Score Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          <ScoreCircle score={analysis.atsScore} label="ATS Score" color="hsl(var(--primary))"
            tooltip="ATS Score measures how well your resume will perform against Applicant Tracking Systems. Above 70% is good." />
          <ScoreCircle score={analysis.keywordMatchPercent} label="Keyword Match" color="hsl(var(--accent))"
            tooltip="Percentage of job description keywords found in your resume." />
          <ScoreCircle score={analysis.readabilityScore} label="Readability" color="hsl(var(--success))"
            tooltip="How easy your resume is to read. Considers bullet length, structure, and formatting." />
          <ScoreCircle score={analysis.uniquenessScore} label="Uniqueness" color="hsl(var(--warning))"
            tooltip="Measures use of action verbs, quantified metrics, and unique project evidence." />
        </div>

        {/* Improve Button */}
        <div className="text-center">
          <Button size="lg" className="gradient-primary text-primary-foreground px-10 py-6 text-lg shadow-soft hover:opacity-90 transition-opacity" onClick={handleImprove}>
            <Sparkles className="h-5 w-5 mr-2" /> One-Click Improve Resume
          </Button>
        </div>

        {/* Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-foreground flex items-center gap-2"><CheckCircle className="h-5 w-5 text-success" /> Matched Keywords</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.matchedKeywords.length > 0 ? analysis.matchedKeywords.map(kw => (
                  <Badge key={kw} className="bg-success/10 text-success border-success/20">{kw}</Badge>
                )) : <p className="text-sm text-muted-foreground">No keywords matched</p>}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-foreground flex items-center gap-2"><XCircle className="h-5 w-5 text-destructive" /> Missing Keywords</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.length > 0 ? analysis.missingKeywords.map(kw => (
                  <Badge key={kw} variant="outline" className="border-destructive/30 text-destructive">{kw}</Badge>
                )) : <p className="text-sm text-muted-foreground">All keywords matched!</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-foreground flex items-center gap-2"><TrendingUp className="h-5 w-5 text-success" /> Strengths</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-foreground flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Improvements</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.improvements.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <XCircle className="h-4 w-4 text-warning mt-0.5 shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Skill Confidence */}
        {analysis.skillConfidence.length > 0 && (
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-foreground flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Skill Confidence Scores</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Based on your projects, experience, and GitHub activity</p>
              <div className="space-y-3">
                {analysis.skillConfidence.map(sc => (
                  <div key={sc.skill} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-24 text-foreground">{sc.skill}</span>
                    <div className="flex-1"><Progress value={sc.score} className="h-2" /></div>
                    <span className="text-xs text-muted-foreground w-28 text-right">{sc.basis}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bullet Improvements Preview */}
        {analysis.improvedBullets.length > 0 && (
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-foreground flex items-center gap-2"><BarChart3 className="h-5 w-5 text-accent" /> Bullet Point Improvements</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {analysis.improvedBullets.map((b, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm text-destructive line-through">{b.original}</p>
                  <p className="text-sm text-success">{b.improved}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AnalysisDashboard;
