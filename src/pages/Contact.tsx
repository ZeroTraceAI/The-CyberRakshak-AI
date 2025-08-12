import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";

export default function Contact() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks! We'll get back to you shortly.");
  };

  return (
    <>
      <SEO title="Contact Us | Threat Guardian X" description="Get in touch with our team for support, partnerships, or general inquiries." canonical="/contact" />
      <section className="space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">We usually respond within one business day.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-elegant">
            <CardHeader><CardTitle>Send a Message</CardTitle></CardHeader>
            <CardContent>
              <form className="space-y-3" onSubmit={onSubmit}>
                <Input placeholder="Your name" required aria-label="Your name" />
                <Input type="email" placeholder="Email" required aria-label="Email" />
                <Textarea placeholder="How can we help?" rows={5} required aria-label="Message" />
                <Button variant="hero" type="submit">Send</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>FAQ</CardTitle></CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How fast are scans?</AccordionTrigger>
                  <AccordionContent>
                    Most scans complete within seconds. Deeper behavioral analysis may take longer.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Do you store uploaded files?</AccordionTrigger>
                  <AccordionContent>
                    For this demo, nothing is uploaded. In production, storage is optional and encrypted.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
