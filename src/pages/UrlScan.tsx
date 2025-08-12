import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SEO } from "@/components/SEO";
import { toast } from "@/hooks/use-toast";

export default function UrlScan() {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ score: number; threats: string[]; history: number[] } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    if (!url) return toast({ title: "No URL provided", description: "Enter a URL to analyze." });
    setIsScanning(true);
    setProgress(0);
    setResult(null);
    const total = 100;
    const iv = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 15, total);
        if (next >= total) {
          clearInterval(iv);
          const score = Math.round(100 - Math.random() * 35);
          const threats = score > 80 ? ["No known threats"] : ["Phishing indicators", "Suspicious redirects"];
          const history = Array.from({ length: 12 }, () => Math.round(100 - Math.random() * 50));
          setResult({ score, threats, history });
          setIsScanning(false);
        }
        return next;
      });
    }, 220);
  };

  return (
    <>
      <SEO
        title="URL Scan | Threat Guardian X"
        description="Analyze URLs for safety scores, linked threats, and historical risk trends."
        canonical="/url-scan"
      />
      <section className="space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">URL Scan</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Submit a URL to check for phishing, malware hosting, and risky redirects.
          </p>
        </header>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Submit URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
              <Button variant="hero" onClick={startScan} disabled={!url || isScanning}>
                {isScanning ? "Scanning..." : "Scan URL"}
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
              <CardHeader><CardTitle>Safety Score</CardTitle></CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{result.score}</div>
                <p className="text-muted-foreground">out of 100</p>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader><CardTitle>Linked Threats</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {result.threats.map((t, i) => (
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
