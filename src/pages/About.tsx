import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function About() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Threat Guardian X",
    url: "https://example.com",
    description: "AI-driven malware detection and threat analysis platform.",
  };

  return (
    <>
      <SEO title="About Us | Threat Guardian X" description="Our mission: elevate security with AI-driven detection and unmatched UX. Learn about our technology and team." canonical="/about" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About Us</h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Threat Guardian X combines advanced machine learning with curated threat intelligence to deliver precise, fast malware detection across files, URLs, IPs, DNS, and domains.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 shadow-elegant">
            <CardHeader><CardTitle>Technology</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Multi-engine AI scoring with ensemble models.</p>
              <p>• Heuristics and behavior emulation for evasive threats.</p>
              <p>• Real-time enrichment from multiple intel feeds.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Advantages</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Faster results with richer context.</p>
              <p>• Intuitive UX with accessible design.</p>
              <p>• Shareable, verifiable reports.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
