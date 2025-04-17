
import { Link } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { KanbanSquare, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <NavLinks />
              </DropdownMenuContent>
            </DropdownMenu>
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
