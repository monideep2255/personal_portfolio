import { Link } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { KanbanSquare } from "lucide-react";

export function Navbar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold flex items-center gap-2">
            <KanbanSquare className="h-8 w-8 text-primary" />
            <span>Portfolio</span>
          </a>
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="hover:text-primary transition-colors">{link.label}</a>
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}