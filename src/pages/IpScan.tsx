import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SEO } from "@/components/SEO";
import { toast } from "@/hooks/use-toast";

export default function IpScan() {
  const [ip, setIp] = useState("");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ geo: string; reputation: string; risk: string } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    if (!ip) return toast({ title: "No IP provided", description: "Enter an IP address." });
    setIsScanning(true);
    setProgress(0);
    setResult(null);
    const total = 100;
    const iv = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18, total);
        if (next >= total) {
          clearInterval(iv);
          setResult({ geo: "Frankfurt, DE", reputation: "Neutral", risk: "Low" });
          setIsScanning(false);
        }
        return next;
      });
    }, 230);
  };

  return (
    <>
      <SEO title="IP Scan | Threat Guardian X" description="Analyze IP addresses for geolocation, reputation scoring, and associated risks." canonical="/ip-scan" />
      <section className="space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">IP Scan</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Evaluate IP risk using geolocation and reputation intel.
          </p>
        </header>

        <Card className="shadow-elegant">
          <CardHeader><CardTitle>IP Lookup</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input placeholder="203.0.113.42" value={ip} onChange={(e) => setIp(e.target.value)} />
              <Button variant="hero" onClick={startScan} disabled={!ip || isScanning}>
                {isScanning ? "Scanning..." : "Scan IP"}
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
              <CardHeader><CardTitle>Geolocation</CardTitle></CardHeader>
              <CardContent>{result.geo}</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Reputation</CardTitle></CardHeader>
              <CardContent>{result.reputation}</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Risk</CardTitle></CardHeader>
              <CardContent>{result.risk}</CardContent>
            </Card>
          </div>
        )}
      </section>
    </>
  );
}
