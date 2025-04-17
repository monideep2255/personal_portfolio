
import { Link } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { KanbanSquare, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";

export function Navbar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  const isMobile = useIsMobile();

  const NavLinks = () => (
    <>
      {links.map((link) => (
        <Link 
          key={link.href} 
          href={link.href}
          className="hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <KanbanSquare className="h-8 w-8 text-primary" />
          <span className="hidden sm:inline">Monideep's Portfolio</span>
          <span className="sm:hidden">Portfolio</span>
        </Link>

        <div className="flex items-center gap-4">
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="flex flex-col gap-4">
                  <NavLinks />
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          ) : (
            <div className="flex items-center gap-6">
              <NavLinks />
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
