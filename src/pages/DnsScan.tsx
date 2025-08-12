import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SEO } from "@/components/SEO";
import { toast } from "@/hooks/use-toast";

export default function DnsScan() {
  const [host, setHost] = useState("");
  const [progress, setProgress] = useState(0);
  const [records, setRecords] = useState<{ type: string; value: string; risk: string }[] | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    if (!host) return toast({ title: "No host provided", description: "Enter a domain or host." });
    setIsScanning(true);
    setProgress(0);
    setRecords(null);
    const total = 100;
    const iv = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 20, total);
        if (next >= total) {
          clearInterval(iv);
          setRecords([
            { type: "A", value: "203.0.113.42", risk: "low" },
            { type: "AAAA", value: "2001:db8::8a2e:370:7334", risk: "low" },
            { type: "MX", value: "mail.example.com", risk: "medium" },
            { type: "TXT", value: "v=spf1 include:spf.example.com ~all", risk: "low" },
          ]);
          setIsScanning(false);
        }
        return next;
      });
    }, 200);
  };

  return (
    <>
      <SEO title="DNS Scan | Threat Guardian X" description="Query DNS records and highlight suspicious or anomalous resolutions." canonical="/dns-scan" />
      <section className="space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">DNS Scan</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Inspect DNS responses to surface misconfigurations and suspicious entries.
          </p>
        </header>

        <Card className="shadow-elegant">
          <CardHeader><CardTitle>Host Lookup</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input placeholder="example.com" value={host} onChange={(e) => setHost(e.target.value)} />
              <Button variant="hero" onClick={startScan} disabled={!host || isScanning}>
                {isScanning ? "Scanning..." : "Scan DNS"}
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

        {records && (
          <Card>
            <CardHeader><CardTitle>Records</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Risk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell>{r.type}</TableCell>
                      <TableCell className="font-mono">{r.value}</TableCell>
                      <TableCell className="capitalize">{r.risk}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </section>
    </>
  );
}
