import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-background" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary-foreground">Devora</span>
        </div>
        <Button variant="outline" size="sm" className="border-primary/30 text-primary-foreground bg-primary/10 hover:bg-primary/20" onClick={onGetStarted}>
          Get Started
        </Button>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 md:pt-28 pb-20">
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Resume Intelligence</span>
        </div>

        <h1 className="animate-fade-up text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl mb-6" style={{ animationDelay: '0.1s' }}>
          <span className="text-primary-foreground">Build Resumes That</span>
          <br />
          <span className="text-gradient">Get You Hired</span>
        </h1>

        <p className="animate-fade-up text-lg md:text-xl max-w-2xl mb-10 text-muted-foreground" style={{ animationDelay: '0.2s' }}>
          Devora analyzes your resume against job descriptions, scores ATS compatibility, and generates proof-based, human-tone resumes that stand out.
        </p>

        <div className="animate-fade-up flex flex-col sm:flex-row gap-4 mb-20" style={{ animationDelay: '0.3s' }}>
          <Button size="lg" className="gradient-primary text-primary-foreground px-8 py-6 text-lg font-semibold shadow-soft hover:opacity-90 transition-opacity" onClick={onGetStarted}>
            Analyze My Resume <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: Shield, title: 'ATS Score Analysis', desc: 'Know exactly how your resume performs against applicant tracking systems' },
            { icon: Zap, title: 'One-Click Improve', desc: 'AI rewrites your bullets with action verbs and quantified achievements' },
            { icon: Sparkles, title: 'Proof-Based Resume', desc: 'Skill confidence scores backed by your GitHub, projects & experience' },
          ].map((f, i) => (
            <div key={i} className="group p-6 rounded-2xl bg-card/5 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-soft">
              <f.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-primary-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
