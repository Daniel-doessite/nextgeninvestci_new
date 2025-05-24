import { Instagram , MessageSquare, MessageCircle, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/70b17fa1-7e3c-489f-b4be-52ee05b67aad.png" 
                alt="NextGen Invest Logo" 
                className="h-10 w-auto mr-2 dark:invert-0 invert" 
              />
              <h3 className="text-xl font-bold">Next<span className="text-primary">Gen</span> Invest</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              La communauté qui accompagne les traders de tous niveaux vers la réussite financière.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Accueil</a></li>
              <li><a href="/journal" className="hover:text-primary transition-colors">Journal de Trading</a></li>
              <li><a href="/beginners" className="hover:text-primary transition-colors">Espace Débutants</a></li>
              <li><a href="/messages" className="hover:text-primary transition-colors">Messagerie</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">À Propos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>NextGenInvest@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>+225 0152556255 / +225 0150896633</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Abidjan, Côte d'Ivoire</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">Abonnez-vous pour recevoir nos conseils et analyses.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
