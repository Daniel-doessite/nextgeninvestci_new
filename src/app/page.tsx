import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  TrendingUp, 
  LineChart, 
  BarChart3, 
  BookOpen, 
  Users, 
  MessageCircle, 
  Instagram, 
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="relative min-h-screen flex items-center pt-20">
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
                    Communauté de Trading
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                    Votre réussite en <span className="text-primary">trading</span> commence ici
                  </h1>
                </div>
                
                <p className="text-lg text-muted-foreground max-w-xl">
                  NextGen Invest vous offre les outils et la communauté dont vous avez besoin pour exceller dans le trading. Suivez vos performances, apprenez et échangez avec d'autres traders.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="hover-scale">
                    <Link href="/beginners" className="flex items-center">
                      Commencer <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="hover-scale">
                    <Link href="/about">À propos de nous</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-6 pt-6">
                  <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    <span>Discord</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
              
              <div className="lg:w-1/2 mt-12 lg:mt-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl transform rotate-6 scale-105 blur-xl opacity-70"></div>
                  <div className="relative glass rounded-2xl p-2 shadow-lg hover-scale">
                    <Image 
                      src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070" 
                      alt="Analyse de marché financier"
                      width={800}
                      height={600}
                      className="rounded-xl w-full h-auto object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-secondary/50 dark:bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <span className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Fonctionnalités
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Les outils pour booster votre trading
              </h2>
              <p className="text-muted-foreground text-lg">
                Notre plateforme offre tous les outils dont vous avez besoin pour analyser vos trades et améliorer vos performances.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="trading-card">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary">
                  <LineChart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Journal de Trading</h3>
                <p className="text-muted-foreground">Suivez chaque trade avec précision et visualisez vos performances à travers des graphiques détaillés.</p>
              </div>
              
              <div className="trading-card">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Suivi de Performance</h3>
                <p className="text-muted-foreground">Analysez vos gains, pertes et statistiques clés pour comprendre vos forces et faiblesses.</p>
              </div>
              
              <div className="trading-card">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Analyse de Marché</h3>
                <p className="text-muted-foreground">Accédez à des outils d'analyse avancés pour identifier les meilleures opportunités.</p>
              </div>
              
              <div className="trading-card">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ressources Débutants</h3>
                <p className="text-muted-foreground">Des tutoriels et guides pour vous aider à démarrer votre parcours dans le trading.</p>
              </div>
              
              <div className="trading-card">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Communauté Active</h3>
                <p className="text-muted-foreground">Rejoignez une communauté de traders pour partager vos expériences et apprendre ensemble.</p>
              </div>
              
              <div className="trading-card">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Support Personnalisé</h3>
                <p className="text-muted-foreground">Un accès direct aux administrateurs pour répondre à vos questions et vous accompagner.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="community" className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform -rotate-3 scale-105 blur-xl opacity-70"></div>
                  <div className="relative glass rounded-2xl p-2 shadow-lg hover-scale">
                    <Image 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070" 
                      alt="Communauté de traders"
                      width={800}
                      height={600}
                      className="rounded-xl w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 space-y-6">
                <span className="inline-block px-3 py-1 mb-2 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  Notre Communauté
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Rejoignez la communauté NextGen Invest
                </h2>
                <p className="text-lg text-muted-foreground">
                  Notre communauté rassemble des traders de tous niveaux unis par la passion des marchés financiers. Nous croyons au partage des connaissances et à l'entraide pour progresser ensemble.
                </p>
                <p className="text-lg text-muted-foreground">
                  Que vous soyez débutant ou expérimenté, vous trouverez des ressources, du soutien et des échanges enrichissants pour développer vos compétences en trading.
                </p>
                
                <div className="pt-4 space-y-4">
                  <h3 className="text-xl font-semibold">Rejoignez-nous sur nos réseaux</h3>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Discord
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Instagram className="w-5 h-5" />
                      Instagram
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-primary/10 dark:bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
              Prêt à prendre le contrôle de votre trading ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Créez votre compte gratuitement et commencez à utiliser notre journal de trading pour améliorer vos performances.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">
                S'inscrire gratuitement
              </Button>
              <Button variant="outline" size="lg">
                En savoir plus
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 