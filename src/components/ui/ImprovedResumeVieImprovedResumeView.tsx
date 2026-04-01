import { useState, useRef } from 'react';
import { ArrowLeft, Copy, Check, Download, Sparkles, CheckCircle, TrendingUp, BarChart3, Eye, Fingerprint, Star, FileText, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeData, AnalysisResult, ImprovedResume } from '@/lib/types';
import ResumeA4Preview, { TemplateType } from './ResumeA4Preview';

interface Props {
  data: ResumeData;
  analysis: AnalysisResult;
  improved: ImprovedResume;
  onBack: () => void;
}

const ScoreCompare = ({ label, before, after, icon: Icon, color }: { label: string; before: number; after: number; icon: React.ElementType; color: string }) => {
  const diff = after - before;
  return (
    <Card className="shadow-card">
      <CardContent className="p-4 text-center">
        <Icon className="h-5 w-5 mx-auto mb-2" style={{ color }} />
        <p className="text-2xl font-bold text-foreground">{after}%</p>
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
          <TrendingUp className="h-3 w-3" /> +{diff}% from {before}%
        </span>
      </CardContent>
    </Card>
  );
};

const ImprovedResumeView = ({ data, analysis, improved, onBack }: Props) => {
  const [copied, setCopied] = useState(false);
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    const resumeText = buildResumeText(data, improved);
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('resume-a4-preview');
      if (!element) return;

      const opt = {
        margin: 0,
        filename: `${data.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setDownloading(false);
    }
  };

  const { improvedScores } = improved;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-5 w-5" /></Button>
            <h1 className="text-lg font-semibold text-foreground">Improved Resume</h1>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
              improvedScores.rating === 'Expert' ? 'bg-success/10 text-success' :
              improvedScores.rating === 'Strong' ? 'bg-primary/10 text-primary' :
              'bg-warning/10 text-warning'
            }`}>
              <Star className="h-3 w-3" /> {improvedScores.rating}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Template Switcher */}
            <div className="flex items-center bg-muted rounded-lg p-0.5 mr-2">
              <button
                onClick={() => setTemplate('basic')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  template === 'basic' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <FileText className="h-3.5 w-3.5 inline mr-1" />Basic
              </button>
              <button
                onClick={() => setTemplate('modern')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  template === 'modern' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Palette className="h-3.5 w-3.5 inline mr-1" />Modern
              </button>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopy} className="text-foreground">
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              size="sm"
              className="gradient-primary text-primary-foreground"
              onClick={handleDownloadPDF}
              disabled={downloading}
            >
              <Download className="h-4 w-4 mr-1" />
              {downloading ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6 animate-fade-up">
        {/* Success Banner */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20">
          <CheckCircle className="h-6 w-6 text-success shrink-0" />
          <div>
            <p className="font-semibold text-foreground">Resume Successfully Improved!</p>
            <p className="text-sm text-muted-foreground">
              ATS score increased from {analysis.atsScore}% to {improvedScores.atsScore}% — optimized with action verbs, metrics, and ATS-friendly formatting.
            </p>
          </div>
        </div>

        {/* Improved Scores Comparison */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ScoreCompare label="ATS Score" before={analysis.atsScore} after={improvedScores.atsScore} icon={BarChart3} color="hsl(var(--primary))" />
          <ScoreCompare label="Keyword Match" before={analysis.keywordMatchPercent} after={improvedScores.keywordMatchPercent} icon={Eye} color="hsl(var(--accent))" />
          <ScoreCompare label="Readability" before={analysis.readabilityScore} after={improvedScores.readabilityScore} icon={Fingerprint} color="hsl(var(--success))" />
          <ScoreCompare label="Uniqueness" before={analysis.uniquenessScore} after={improvedScores.uniquenessScore} icon={Sparkles} color="hsl(var(--warning))" />
        </div>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="preview">A4 Preview</TabsTrigger>
            <TabsTrigger value="skills">Skills & Confidence</TabsTrigger>
            <TabsTrigger value="changes">What Changed</TabsTrigger>
            <TabsTrigger value="text">Plain Text</TabsTrigger>
          </TabsList>

          {/* ===== A4 PREVIEW TAB ===== */}
          <TabsContent value="preview" className="mt-4">
            <div className="flex justify-center">
              <div className="overflow-auto max-w-full" ref={previewRef}>
                <div className="origin-top" style={{ transform: 'scale(0.75)', transformOrigin: 'top center' }}>
                  <ResumeA4Preview data={data} improved={improved} template={template} />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ===== SKILLS & CONFIDENCE TAB ===== */}
          <TabsContent value="skills" className="mt-4 space-y-6">
            {analysis.skillConfidence.length > 0 && (
              <Card className="shadow-card">
                <CardHeader><CardTitle className="text-foreground">Skill Confidence Scores</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-2">Proof-based scoring from your projects, experience & GitHub</p>
                  {analysis.skillConfidence.map(sc => (
                    <div key={sc.skill} className="flex items-center gap-4">
                      <span className="text-sm font-medium w-28 text-foreground">{sc.skill}</span>
                      <div className="flex-1"><Progress value={sc.score} className="h-2" /></div>
                      <span className="text-xs text-muted-foreground w-28 text-right">{sc.basis}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-foreground">ATS-Optimized Skill Categories</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {improved.skills.map((cat, i) => (
                  <div key={i}>
                    <p className="text-sm font-semibold text-foreground mb-2">{cat.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map(item => (
                        <Badge key={item} className="bg-primary/10 text-primary border-primary/20">{item}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== CHANGES TAB ===== */}
          <TabsContent value="changes" className="mt-4">
            <Card className="shadow-card">
              <CardHeader><CardTitle className="text-foreground flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> What We Improved</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {improved.changes.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />{c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== PLAIN TEXT TAB ===== */}
          <TabsContent value="text" className="mt-4">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
                  {buildResumeText(data, improved)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

function buildResumeText(data: ResumeData, improved: ImprovedResume): string {
  const lines: string[] = [];
  lines.push(data.fullName.toUpperCase());
  lines.push([data.phone, data.email].filter(Boolean).join(' | '));
  if (data.linkedin || data.github) lines.push([data.linkedin, data.github].filter(Boolean).join(' | '));
  lines.push('');

  if (improved.summary) { lines.push('PROFESSIONAL SUMMARY'); lines.push(improved.summary); lines.push(''); }
  if (improved.skills.length) {
    lines.push('SKILLS');
    improved.skills.forEach(cat => lines.push(`${cat.category}: ${cat.items.join(', ')}`));
    lines.push('');
  }
  if (improved.experience.length) {
    lines.push('EXPERIENCE');
    improved.experience.forEach(exp => {
      lines.push(`${exp.position} — ${exp.company} | ${exp.startDate} – ${exp.endDate}`);
      exp.bullets.forEach(b => lines.push(`• ${b}`));
      lines.push('');
    });
  }
  if (improved.projects.length) {
    lines.push('PROJECTS');
    improved.projects.forEach(p => {
      lines.push(`${p.name} (${p.technologies.join(', ')})`);
      lines.push(p.description);
      lines.push('');
    });
  }
  if (improved.education.length) {
    lines.push('EDUCATION');
    improved.education.forEach(edu => {
      lines.push(`${edu.degree} in ${edu.field} — ${edu.institution}${edu.year ? ` (${edu.year})` : ''}${edu.gpa ? ` | CGPA: ${edu.gpa}` : ''}`);
    });
    lines.push('');
  }
  if (improved.certifications.length) {
    lines.push('CERTIFICATIONS');
    improved.certifications.forEach(c => lines.push(`• ${c}`));
  }
  return lines.join('\n');
}

export default ImprovedResumeView;
