import heroImage from "@/assets/hero-cyber-shield.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Shield, ScanLine, Link2, Network, MapPinned, Globe, Mail, Info } from "lucide-react";

const features = [
  { to: "/file-scan", title: "File Scan", desc: "Upload files for multi-engine AI analysis.", icon: ScanLine },
  { to: "/url-scan", title: "URL Scan", desc: "Check URLs for phishing and malware.", icon: Link2 },
  { to: "/dns-scan", title: "DNS Scan", desc: "Inspect DNS records and anomalies.", icon: Network },
  { to: "/ip-scan", title: "IP Scan", desc: "Geolocation and reputation scoring.", icon: MapPinned },
  { to: "/domain-scan", title: "Domain Scan", desc: "Reputation, WHOIS, and intel.", icon: Globe },
  { to: "/about", title: "About", desc: "Mission, tech and team.", icon: Info },
  { to: "/contact", title: "Contact", desc: "Support and inquiries.", icon: Mail },
];

const Index = () => {
  return (
    <>
      <SEO
        title="Threat Guardian X — AI Malware Detection Platform"
        description="Futuristic, sleek platform for malware, URL, IP, DNS and domain scanning with real-time visualizations and premium UX."
        canonical="/"
      />
      <div className="min-h-[60vh] rounded-xl overflow-hidden relative mb-10">
        <img
          src={heroImage}
          alt="Futuristic AI malware detection shield with network mesh"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          loading="eager"
        />
        <div className="relative z-10 h-full w-full bg-gradient-to-t from-background/80 to-background/10 p-10 md:p-16 flex flex-col justify-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
              <Shield className="h-3.5 w-3.5" /> AI-driven threat intelligence
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Malware Detection, Reimagined.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Scan files, URLs, IPs, DNS and domains with precision. Experience real-time visualizations and delightful performance.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild variant="hero" size="lg" className="hover-scale">
                <Link to="/file-scan">Start a File Scan</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/url-scan">Scan a URL</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ to, title, desc, icon: Icon }) => (
          <Link key={to} to={to} className="hover-scale">
            <Card className="h-full shadow-elegant">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-lg">{title}</h2>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </>
  );
};

export default Index;
