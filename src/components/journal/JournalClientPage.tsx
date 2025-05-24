'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import JournalOverview from "@/components/journal/JournalOverview";

export default function JournalClientPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center font-semibold">
              Reversal Swing Forex
              <div className="ml-2 rounded-md bg-primary/10 px-2 py-1 text-xs text-primary-foreground">
                Journal
              </div>
            </div>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Button>Ajouter un Trade</Button>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Journal de Trading</h2>
            <div className="flex items-center space-x-2">
              <Button>Ajouter un Trade</Button>
            </div>
          </div>
          <JournalOverview />
        </div>
      </div>
    </>
  );
} 