"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart2, LayoutDashboard, PieChart, BookOpen, LineChart, Calendar } from "lucide-react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const items = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />
    },
    {
      href: "/journal",
      label: "Journal",
      active: pathname === "/journal",
      icon: <BookOpen className="mr-2 h-4 w-4" />
    },
    {
      href: "/analytics",
      label: "Analyses",
      active: pathname === "/analytics",
      icon: <BarChart2 className="mr-2 h-4 w-4" />
    },
    {
      href: "/calendar",
      label: "Calendrier",
      active: pathname === "/calendar",
      icon: <Calendar className="mr-2 h-4 w-4" />
    },
    {
      href: "/portfolio",
      label: "Portfolio",
      active: pathname === "/portfolio",
      icon: <PieChart className="mr-2 h-4 w-4" />
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            item.active
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </nav>
  );
} 