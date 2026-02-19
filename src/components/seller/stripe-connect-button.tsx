"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, ExternalLink } from "lucide-react";

interface StripeConnectButtonProps {
  isConnected: boolean;
}

export function StripeConnectButton({ isConnected }: StripeConnectButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConnect() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/connect", { method: "POST" });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Failed to start Stripe onboarding");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
        <CheckCircle2 className="size-4" />
        <span>Stripe Connected</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleConnect} disabled={loading}>
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <ExternalLink />
        )}
        {loading ? "Redirecting..." : "Connect with Stripe"}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
