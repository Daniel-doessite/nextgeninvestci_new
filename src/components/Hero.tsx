
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Éléments de fond décoratifs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-12 w-64 h-64 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-1/4 -right-12 w-80 h-80 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-1/4 w-40 h-40 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
          <div className="lg:w-1/2 space-y-8 animate-slide-in">
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Un design minimaliste
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Créez des expériences <span className="text-primary">mémorables</span>
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Une plateforme qui combine élégance et fonctionnalité, inspirée des principes de design les plus raffinés pour des résultats exceptionnels.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="hover-scale">
                Découvrir
              </Button>
              <Button variant="outline" size="lg" className="hover-scale">
                En savoir plus
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl transform rotate-6 scale-105 blur-xl opacity-70"></div>
              <div className="relative glass rounded-2xl p-2 shadow-lg hover-scale">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  className="rounded-xl w-full h-auto object-cover"
                  alt="Interface design moderne"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
