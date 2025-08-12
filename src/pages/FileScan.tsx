import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { SEO } from "@/components/SEO";

const COLORS = ["#16a34a", "#ef4444"];

export default function FileScan() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ detections: number; clean: number } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const chartData = useMemo(() => {
    if (!results) return [];
    return [
      { name: "Clean", value: results.clean },
      { name: "Detections", value: results.detections },
    ];
  }, [results]);

  const startScan = async () => {
    if (!file) return toast({ title: "No file selected", description: "Please choose a file to scan." });
    setIsScanning(true);
    setProgress(0);
    setResults(null);

    const total = 100;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 17, total);
        if (next >= total) {
          clearInterval(interval);
          // mock result
          const detections = Math.floor((Math.random() * 0.2 + 0.02) * 100);
          const clean = 100 - detections;
          setResults({ detections, clean });
          setIsScanning(false);
          toast({ title: "Scan completed", description: `${detections}% detection rate` });
        }
        return next;
      });
    }, 250);
  };

  const downloadReport = () => {
    if (!results || !file) return;
    const report = {
      file: file.name,
      size: file.size,
      detections: results.detections,
      clean: results.clean,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.[^/.]+$/, "")}-report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareReport = async () => {
    if (!results || !file) return;
    const text = `Threat Guardian X — File Scan Report\nFile: ${file.name}\nDetections: ${results.detections}%\nClean: ${results.clean}%`;
    if ((navigator as any).share) {
      try { await (navigator as any).share({ title: "Scan Report", text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Report copied to clipboard" });
    }
  };

  return (
    <>
      <SEO
        title="File Scan | Threat Guardian X — AI Malware Detection"
        description="Upload and scan files for malware with AI-driven detection, progress indicators, and shareable reports."
        canonical="/file-scan"
      />

      <section className="space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">File Scan</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Upload a file to analyze it with our multi-engine AI detection. View detection rates and behavioral insights.
          </p>
        </header>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Upload and Analyze</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                aria-label="Select file for scanning"
              />
              <Button variant="hero" onClick={startScan} disabled={!file || isScanning}>
                {isScanning ? "Scanning..." : "Start Scan"}
              </Button>
            </div>

            <div aria-live="polite" className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>

        {results && (
          <Tabs defaultValue="summary" className="mt-2">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Detection Overview</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>File:</strong> {file?.name}</p>
                  <p><strong>Size:</strong> {file ? `${(file.size / 1024).toFixed(1)} KB` : "-"}</p>
                  <p><strong>Detections:</strong> {results.detections}%</p>
                  <p><strong>Clean:</strong> {results.clean}%</p>
                  <p className="text-muted-foreground">This report is generated using simulated engines for demo purposes.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="behavior">
              <Card>
                <CardHeader>
                  <CardTitle>Behavioral Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Monitors system calls and suspicious API usage.</li>
                    <li>Flags persistence mechanisms (registry, startup tasks).</li>
                    <li>Detects obfuscation and packing patterns.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="actions">
              <Card>
                <CardHeader>
                  <CardTitle>Report Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-3">
                  <Button variant="secondary" onClick={downloadReport}>Download JSON</Button>
                  <Button variant="outline" onClick={shareReport}>Share</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </section>
    </>
  );
}
