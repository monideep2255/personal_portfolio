import { SiGithub, SiLinkedin } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/monideep2255" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <SiGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/monideepc/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <SiLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}