# NextGenInvest CI

Plateforme de trading pour investisseurs ivoiriens, construite avec Next.js.

## Technologies utilisées

- Next.js 14
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Base de données et authentification)

## Installation

```sh
# 1. Cloner le dépôt
git clone https://github.com/Daniel-doessite/nextgeninvestci_new.git

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
# Créez un fichier .env.local avec les variables suivantes :
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
NEXT_PUBLIC_CLAUDE_API_KEY=votre_clé_api_claude

# 4. Lancer le serveur de développement
npm run dev
```

## Déploiement

Le projet est déployé sur Vercel. Les déploiements sont automatiques à chaque push sur la branche principale.

## Structure du projet

- `/src/app` - Pages et routes Next.js
- `/src/components` - Composants React réutilisables
- `/src/hooks` - Hooks personnalisés
- `/src/lib` - Utilitaires et configurations
- `/src/types` - Types TypeScript
- `/src/integrations` - Intégrations avec des services externes

## Fonctionnalités

- Authentification des utilisateurs
- Journal de trading
- Tableau de bord de performance
- Messagerie avec IA (Domino)
- Interface d'administration
- Thème sombre/clair

## Développement

### Prérequis

- Node.js 18.x (recommandé d'utiliser [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm ou yarn

### Commandes disponibles

```sh
# Développement
npm run dev

# Build pour production
npm run build

# Preview de la version production
npm run preview
```

### Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'feat: Ajout d'une fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request
