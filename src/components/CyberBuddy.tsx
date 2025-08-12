import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Simple floating AI chat assistant. Real-time provider calls are enabled when a user supplies an API key.
export const CyberBuddy = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("ai_api_key") || "");
  const [model, setModel] = useState<string>(() => localStorage.getItem("ai_model") || "gpt-4o-mini");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const system = useMemo(
    () =>
      "You are CyberBuddy, the assistant for CyberRakshak. Be concise, helpful, and reference the app's features: File, URL, Email, DNS, IP, Domain scans.",
    []
  );

  const saveKeys = () => {
    localStorage.setItem("ai_api_key", apiKey.trim());
    localStorage.setItem("ai_model", model.trim());
    toast({ title: "Saved", description: "API key stored locally for browser use." });
  };

  const ask = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);

    if (!apiKey) {
      toast({ title: "Add an AI API key", description: "Enter an OpenAI-compatible key to enable live answers." });
      return;
    }

    try {
      setSending(true);
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: system },
            ...messages,
            { role: "user", content: text },
          ],
          temperature: 0.2,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      toast({ title: "Chat error", description: "Check your key or use a server proxy to avoid CORS limits." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!open && (
        <Button variant="default" size="lg" onClick={() => setOpen(true)} aria-label="Open CyberBuddy">
          CyberBuddy
        </Button>
      )}

      {open && (
        <Card className="w-[360px] max-w-[92vw] shadow-glow">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">CyberBuddy</h2>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </div>

            <div className="space-y-2 rounded-md border p-3">
              <label className="text-xs">OpenAI-compatible API key</label>
              <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="sk-..." />
              <label className="text-xs">Model</label>
              <Input value={model} onChange={(e) => setModel(e.target.value)} placeholder="gpt-4o-mini" />
              <div className="flex gap-2">
                <Button size="sm" onClick={saveKeys}>Save</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Keys are stored locally. For production, proxy calls via a Supabase Edge Function.
              </p>
            </div>

            <div ref={listRef} className={cn("h-56 overflow-auto rounded-md border p-3 space-y-2", "bg-background/50")}> 
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground">Ask me about scans, results, or how to configure providers.</p>
              )}
              {messages.map((m, i) => (
                <div key={i} className={cn("text-sm", m.role === "assistant" ? "" : "text-foreground")}> 
                  <span className="font-medium">{m.role === "assistant" ? "Assistant" : "You"}:</span> {m.content}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={2} placeholder="Type your question..." />
              <Button onClick={ask} disabled={sending}>{sending ? "..." : "Send"}</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
