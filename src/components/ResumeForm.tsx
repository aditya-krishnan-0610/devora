import { useState } from 'react';
import { Plus, Trash2, ArrowLeft, ArrowRight, Upload, Briefcase, GraduationCap, Code, FileText, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResumeData, EducationEntry, ExperienceEntry, ProjectEntry } from '@/lib/types';

interface ResumeFormProps {
  onSubmit: (data: ResumeData) => void;
  onBack: () => void;
}

const STEPS = [
  { key: 'personal', label: 'Personal Info', icon: User },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'projects', label: 'Projects & Skills', icon: Code },
  { key: 'job', label: 'Job Description', icon: FileText },
];

const newEducation = (): EducationEntry => ({
  id: crypto.randomUUID(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '',
});
const newExperience = (): ExperienceEntry => ({
  id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', current: false, bullets: [''],
});
const newProject = (): ProjectEntry => ({
  id: crypto.randomUUID(), name: '', description: '', technologies: [], link: '',
});

const ResumeForm = ({ onSubmit, onBack }: ResumeFormProps) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ResumeData>({
    fullName: '', email: '', phone: '', linkedin: '', github: '', summary: '',
    education: [newEducation()],
    experience: [newExperience()],
    projects: [newProject()],
    skills: [],
    jobDescription: '',
    uploadedResumeText: '',
  });
  const [skillInput, setSkillInput] = useState('');

  const update = (field: keyof ResumeData, value: any) =>
    setData(prev => ({ ...prev, [field]: value }));

  const addSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      update('skills', [...data.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (s: string) => update('skills', data.skills.filter(sk => sk !== s));

  const updateExperience = (id: string, field: keyof ExperienceEntry, value: any) => {
    update('experience', data.experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const updateBullet = (expId: string, idx: number, value: string) => {
    update('experience', data.experience.map(e =>
      e.id === expId ? { ...e, bullets: e.bullets.map((b, i) => i === idx ? value : b) } : e
    ));
  };

  const addBullet = (expId: string) => {
    update('experience', data.experience.map(e =>
      e.id === expId ? { ...e, bullets: [...e.bullets, ''] } : e
    ));
  };

  const updateEducation = (id: string, field: keyof EducationEntry, value: any) => {
    update('education', data.education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const updateProject = (id: string, field: keyof ProjectEntry, value: any) => {
    update('projects', data.projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addProjectTech = (projId: string, tech: string) => {
    if (!tech.trim()) return;
    update('projects', data.projects.map(p =>
      p.id === projId && !p.technologies.includes(tech.trim())
        ? { ...p, technologies: [...p.technologies, tech.trim()] }
        : p
    ));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      update('uploadedResumeText', reader.result as string);
    };
    reader.readAsText(file);
  };

  const canProceed = () => {
    if (step === 0) return data.fullName.trim().length > 0;
    if (step === 4) return data.jobDescription.trim().length > 20;
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Build Your Resume</h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => (
            <button key={s.key} onClick={() => i <= step && setStep(i)}
              className={`flex flex-col items-center gap-1 transition-all ${i <= step ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                i === step ? 'gradient-primary text-primary-foreground shadow-soft' :
                i < step ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium hidden sm:block">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step Content */}
        <Card className="shadow-card animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              {(() => { const Icon = STEPS[step].icon; return <Icon className="h-5 w-5 text-primary" />; })()}
              {STEPS[step].label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Full Name *</Label><Input placeholder="John Doe" value={data.fullName} onChange={e => update('fullName', e.target.value)} /></div>
                  <div><Label>Email</Label><Input type="email" placeholder="john@example.com" value={data.email} onChange={e => update('email', e.target.value)} /></div>
                  <div><Label>Phone</Label><Input placeholder="+1 (555) 000-0000" value={data.phone} onChange={e => update('phone', e.target.value)} /></div>
                  <div><Label>LinkedIn URL</Label><Input placeholder="linkedin.com/in/johndoe" value={data.linkedin} onChange={e => update('linkedin', e.target.value)} /></div>
                  <div><Label>GitHub URL</Label><Input placeholder="github.com/johndoe" value={data.github} onChange={e => update('github', e.target.value)} /></div>
                </div>
                <div><Label>Professional Summary</Label><Textarea placeholder="Brief overview of your skills and experience..." rows={4} value={data.summary} onChange={e => update('summary', e.target.value)} /></div>
                <div>
                  <Label>Upload Existing Resume (TXT)</Label>
                  <label className="mt-2 flex items-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload your resume</span>
                    <input type="file" accept=".txt,.pdf,.docx" className="hidden" onChange={handleFileUpload} />
                  </label>
                  {data.uploadedResumeText && <p className="text-xs text-success mt-1">✓ Resume uploaded</p>}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Position {idx + 1}</span>
                      {data.experience.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => update('experience', data.experience.filter(e => e.id !== exp.id))}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div><Label>Company</Label><Input placeholder="Company Name" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} /></div>
                      <div><Label>Position</Label><Input placeholder="Software Engineer" value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} /></div>
                      <div><Label>Start Date</Label><Input placeholder="Jan 2022" value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} /></div>
                      <div><Label>End Date</Label><Input placeholder="Present" value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} /></div>
                    </div>
                    <div className="space-y-2">
                      <Label>Bullet Points</Label>
                      {exp.bullets.map((b, bi) => (
                        <Input key={bi} placeholder="Describe your achievement..." value={b} onChange={e => updateBullet(exp.id, bi, e.target.value)} />
                      ))}
                      <Button variant="ghost" size="sm" onClick={() => addBullet(exp.id)}>
                        <Plus className="h-4 w-4 mr-1" /> Add Bullet
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={() => update('experience', [...data.experience, newExperience()])}>
                  <Plus className="h-4 w-4 mr-2" /> Add Experience
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                {data.education.map((edu, idx) => (
                  <div key={edu.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Education {idx + 1}</span>
                      {data.education.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => update('education', data.education.filter(e => e.id !== edu.id))}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div><Label>Institution</Label><Input placeholder="MIT" value={edu.institution} onChange={e => updateEducation(edu.id, 'institution', e.target.value)} /></div>
                      <div><Label>Degree</Label><Input placeholder="B.S." value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} /></div>
                      <div><Label>Field of Study</Label><Input placeholder="Computer Science" value={edu.field} onChange={e => updateEducation(edu.id, 'field', e.target.value)} /></div>
                      <div><Label>GPA</Label><Input placeholder="3.8" value={edu.gpa} onChange={e => updateEducation(edu.id, 'gpa', e.target.value)} /></div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={() => update('education', [...data.education, newEducation()])}>
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <Label>Skills</Label>
                  <div className="flex gap-2 mt-1">
                    <Input placeholder="Add a skill (e.g., React)" value={skillInput} onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} />
                    <Button variant="outline" onClick={addSkill}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {data.skills.map(s => (
                      <Badge key={s} variant="secondary" className="cursor-pointer hover:bg-destructive/10" onClick={() => removeSkill(s)}>
                        {s} ×
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-4 space-y-4">
                  <Label className="text-base font-semibold">Projects</Label>
                  {data.projects.map((proj, idx) => (
                    <div key={proj.id} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Project {idx + 1}</span>
                        {data.projects.length > 1 && (
                          <Button variant="ghost" size="icon" onClick={() => update('projects', data.projects.filter(p => p.id !== proj.id))}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div><Label>Project Name</Label><Input value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} /></div>
                        <div><Label>Link</Label><Input placeholder="https://..." value={proj.link} onChange={e => updateProject(proj.id, 'link', e.target.value)} /></div>
                      </div>
                      <div><Label>Description</Label><Textarea rows={2} value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)} /></div>
                      <div>
                        <Label>Technologies</Label>
                        <Input placeholder="Press Enter to add" onKeyDown={e => {
                          if (e.key === 'Enter') { e.preventDefault(); addProjectTech(proj.id, (e.target as HTMLInputElement).value); (e.target as HTMLInputElement).value = ''; }
                        }} />
                        <div className="flex flex-wrap gap-1 mt-2">
                          {proj.technologies.map(t => (
                            <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => update('projects', [...data.projects, newProject()])}>
                    <Plus className="h-4 w-4 mr-2" /> Add Project
                  </Button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div>
                  <Label>Paste the Job Description *</Label>
                  <Textarea
                    rows={12}
                    placeholder="Paste the full job description here. Devora will analyze it to match your resume..."
                    value={data.jobDescription}
                    onChange={e => update('jobDescription', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    The more detailed the job description, the better our analysis will be.
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => step > 0 ? setStep(step - 1) : onBack()} className="text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" /> {step === 0 ? 'Home' : 'Back'}
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canProceed()} className="gradient-primary text-primary-foreground">
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={() => onSubmit(data)} disabled={!canProceed()} className="gradient-primary text-primary-foreground animate-pulse-glow">
              Analyze Resume <Sparkles className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
