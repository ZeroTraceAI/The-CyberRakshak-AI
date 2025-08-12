import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const EmailScan = () => {
  const { toast } = useToast();
  const [vtKey, setVtKey] = useState<string>(() => localStorage.getItem("virustotal_api_key") || "");
  const [isScanning, setIsScanning] = useState(false);

  const saveKey = () => {
    localStorage.setItem("virustotal_api_key", vtKey.trim());
    toast({ title: "API key saved", description: "VirusTotal key stored locally for browser use." });
  };

  const onAnalyzeHeaders = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Live analysis requires provider keys",
      description: "Add a VirusTotal (attachments) and LLM key (header analysis) to enable real-time results.",
    });
  };

  const onScanAttachment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fileInput = form.elements.namedItem("attachment") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      toast({ title: "No file selected", description: "Choose an email attachment (.eml, .pdf, .zip, etc.)." });
      return;
    }
    if (!vtKey) {
      toast({ title: "Missing VirusTotal API key", description: "Add your key below to enable live scans." });
      return;
    }

    setIsScanning(true);
    // Note: Direct browser calls may be blocked by CORS by providers. A server/edge function proxy is recommended.
    // We surface a friendly note here until keys/proxy are provided.
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "Ready to scan",
        description: "With a proxy and your API key, attachments will be scanned in real time.",
      });
    }, 800);
  };

  return (
    <>
      <SEO
        title="Email Scan — CyberRakshak"
        description="Analyze emails, headers and attachments in real time with multi-engine intelligence."
        canonical="/email-scan"
      />

      <div className="space-y-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Email Scan</h1>
          <p className="text-muted-foreground max-w-2xl">
            Detect phishing, malware and spoofing by analyzing message headers, body and attachments.
          </p>
        </header>

        <Tabs defaultValue="headers" className="w-full">
          <TabsList>
            <TabsTrigger value="headers">Analyze Headers / Body</TabsTrigger>
            <TabsTrigger value="attachment">Scan Attachment</TabsTrigger>
            <TabsTrigger value="settings">Provider Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="headers">
            <Card>
              <CardContent className="p-6 space-y-4">
                <form onSubmit={onAnalyzeHeaders} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="e.g. Urgent: Verify your account" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headers">Raw Headers</Label>
                    <Textarea id="headers" name="headers" placeholder="Paste full email headers here" rows={6} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="body">Body (optional)</Label>
                    <Textarea id="body" name="body" placeholder="Paste email body (plain text)" rows={6} />
                  </div>
                  <Button type="submit" disabled={isScanning}>{isScanning ? "Analyzing..." : "Analyze"}</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attachment">
            <Card>
              <CardContent className="p-6 space-y-4">
                <form onSubmit={onScanAttachment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="attachment">Attachment</Label>
                    <Input id="attachment" name="attachment" type="file" />
                    <p className="text-xs text-muted-foreground">Supported: .eml, .msg, .pdf, .docx, archives, etc.</p>
                  </div>
                  <Button type="submit" disabled={isScanning}>{isScanning ? "Uploading..." : "Scan Attachment"}</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vt">VirusTotal API Key</Label>
                  <Input id="vt" value={vtKey} onChange={(e) => setVtKey(e.target.value)} placeholder="Paste your key" />
                  <div className="flex gap-2">
                    <Button type="button" onClick={saveKey} size="sm">Save</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Keys are stored locally in your browser. For production, route provider calls via a secure Edge Function.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default EmailScan;
