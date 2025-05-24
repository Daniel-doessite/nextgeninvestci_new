
import { LayoutGrid, Lightbulb, RefreshCw, Shield } from "lucide-react";

const features = [
  {
    icon: <LayoutGrid className="w-10 h-10" />,
    title: "Design Intuitif",
    description: "Interface utilisateur conçue pour être simple et agréable, offrant une expérience fluide et sans friction."
  },
  {
    icon: <Lightbulb className="w-10 h-10" />,
    title: "Innovation Constante",
    description: "Des solutions créatives qui anticipent les besoins utilisateurs et intègrent les meilleures pratiques du design."
  },
  {
    icon: <RefreshCw className="w-10 h-10" />,
    title: "Adaptabilité Totale",
    description: "Un système qui s'adapte parfaitement à tous les appareils pour une expérience cohérente."
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Fiabilité Garantie",
    description: "Une attention méticuleuse aux détails pour assurer performance et sécurité à chaque interaction."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Fonctionnalités
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Une expérience utilisateur exceptionnelle
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez comment notre approche centrée sur l'utilisateur transforme chaque interaction en une expérience mémorable.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
