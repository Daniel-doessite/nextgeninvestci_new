'use client';

import { useState } from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export default function BeginnersPage() {
  const [activeTab, setActiveTab] = useState("basics");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-4">
                Apprendre le <span className="text-primary">Trading</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Bienvenue dans l'espace débutants de NextGen Invest. Découvrez les bases du trading, des tutoriels vidéo et des ressources pour commencer votre parcours.
              </p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basics">Bases</TabsTrigger>
                <TabsTrigger value="videos">Vidéos</TabsTrigger>
                <TabsTrigger value="resources">Ressources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basics" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Introduction au Trading</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                        <span>Comprendre les marchés financiers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                        <span>Les différents types d'actifs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                        <span>Comment fonctionne le trading</span>
                      </li>
                    </ul>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Premiers Pas</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                        <span>Choisir un broker</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                        <span>Ouvrir un compte</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                        <span>Gérer son capital</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="videos" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Video className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Tutoriels Vidéo</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Nos vidéos explicatives vous guideront pas à pas dans l'apprentissage du trading.
                    </p>
                    <Button variant="outline" className="w-full">
                      Voir les vidéos
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Guides PDF</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Téléchargez nos guides détaillés pour apprendre à votre rythme.
                    </p>
                    <Button variant="outline" className="w-full">
                      Télécharger
                    </Button>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Bibliothèque</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Accédez à notre collection de livres et articles sur le trading.
                    </p>
                    <Button variant="outline" className="w-full">
                      Explorer
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <ArrowRight className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-semibold">Prochaines Étapes</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Découvrez comment passer à l'étape suivante de votre apprentissage.
                    </p>
                    <Button variant="outline" className="w-full">
                      En savoir plus
                    </Button>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 