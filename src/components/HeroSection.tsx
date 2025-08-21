import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-primary/20 rounded-full blur-xl" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-32 h-32 bg-primary-glow/20 rounded-full blur-xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/10 backdrop-blur-sm border border-border/50 text-sm text-muted-foreground mb-8">
            <Sparkles className="w-4 h-4 text-primary animate-glow" />
            Built with modern technology stack
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-primary-glow bg-clip-text text-transparent leading-tight">
          Build Amazing Apps
          <br />
          <span className="text-primary animate-glow">Lightning Fast</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Create stunning web applications with React, TypeScript, and Tailwind CSS. 
          Experience the power of modern development tools.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="glass" size="lg">
            Learn More
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow" />
              TypeScript
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow" />
              React
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow" />
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;