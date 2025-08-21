import { Card } from "@/components/ui/card";
import { Zap, Shield, Palette, Rocket, Code, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with Vite for incredibly fast development and build times."
  },
  {
    icon: Shield,
    title: "Type Safe",
    description: "Full TypeScript support ensures your code is robust and maintainable."
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Stunning UI components with Tailwind CSS and shadcn/ui."
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Optimized builds and modern best practices out of the box."
  },
  {
    icon: Code,
    title: "Developer Experience",
    description: "Amazing DX with hot reload, ESLint, and modern tooling."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built on proven open-source technologies with great communities."
  }
];

const FeatureGrid = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Why Choose Our Stack?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build modern web applications with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-soft group"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;