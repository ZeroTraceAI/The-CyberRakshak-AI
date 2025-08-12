import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, Shield, ScanLine, Globe, Link2, Network, MapPinned, Info, Mail } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

const navItems = [
  { to: "/file-scan", label: "File Scan", icon: ScanLine },
  { to: "/url-scan", label: "URL Scan", icon: Link2 },
  { to: "/dns-scan", label: "DNS Scan", icon: Network },
  { to: "/ip-scan", label: "IP Scan", icon: MapPinned },
  { to: "/domain-scan", label: "Domain Scan", icon: Globe },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Mail },
];

export const SiteHeader = () => {
  const isMobile = useIsMobile();

  const Nav = () => (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-1">
        {navItems.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-muted/50"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open navigation">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Threat Guardian X</span>
                </div>
                <nav>
                  <ul className="space-y-1">
                    {navItems.map(({ to, label, icon: Icon }) => (
                      <li key={to}>
                        <NavLink
                          to={to}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-md ${
                              isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-muted/50"
                            }`
                          }
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" aria-hidden />
            <span className="font-bold tracking-tight">Threat Guardian X</span>
          </Link>
        </div>

        {!isMobile && <Nav />}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="hero" size="sm">
            <Link to="/file-scan" aria-label="Start a new scan">Start Scan</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
