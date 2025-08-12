import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SEO } from "@/components/SEO";
import { toast } from "@/hooks/use-toast";

export default function DomainScan() {
  const [domain, setDomain] = useState("");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ whois: string; reputation: string; intel: string[] } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    if (!domain) return toast({ title: "No domain provided", description: "Enter a domain to analyze." });
    setIsScanning(true);
    setProgress(0);
    setResult(null);
    const total = 100;
    const iv = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 16, total);
        if (next >= total) {
          clearInterval(iv);
          setResult({
            whois: "Registrar: Example LLC — Created: 2019-07-04",
            reputation: "Good",
            intel: ["No malware hosting detected", "DNSSEC enabled"],
          });
          setIsScanning(false);
        }
        return next;
      });
    }, 210);
  };

  return (
    <>
      <SEO title="Domain Scan | Threat Guardian X" description="Check domain reputation, WHOIS records, and threat intelligence." canonical="/domain-scan" />
      <section className="space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Domain Scan</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Inspect a domain's ownership, configuration, and risk profile.
          </p>
        </header>

        <Card className="shadow-elegant">
          <CardHeader><CardTitle>Domain Check</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input placeholder="example.com" value={domain} onChange={(e) => setDomain(e.target.value)} />
              <Button variant="hero" onClick={startScan} disabled={!domain || isScanning}>
                {isScanning ? "Scanning..." : "Scan Domain"}
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>

        {result && (
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader><CardTitle>WHOIS</CardTitle></CardHeader>
              <CardContent className="text-sm whitespace-pre-wrap">{result.whois}</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Reputation</CardTitle></CardHeader>
              <CardContent>{result.reputation}</CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader><CardTitle>Threat Intelligence</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {result.intel.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </>
  );
}
