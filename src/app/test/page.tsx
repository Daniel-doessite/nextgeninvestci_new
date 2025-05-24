export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-8 max-w-md w-full space-y-4 text-center">
        <h1 className="text-2xl font-bold text-primary">Page de Test</h1>
        <p className="text-muted-foreground">
          Si vous voyez ce message, le routage de base de Next.js fonctionne correctement.
        </p>
        <div className="pt-4">
          <a 
            href="/"
            className="text-primary hover:underline"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
} 