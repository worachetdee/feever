"use client";

import { useState } from "react";
import { Loader2, ShoppingCart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/format";

interface BuyButtonProps {
  productId: string;
  price: number;
  hasPurchased: boolean;
}

export function BuyButton({ productId, price, hasPurchased }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (hasPurchased) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-success">
        <CheckCircle className="size-4" />
        Purchased
      </div>
    );
  }

  const handleBuy = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to create checkout session");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleBuy}
        disabled={loading}
        className="w-full bg-primary text-white hover:bg-primary/90"
        size="lg"
      >
        {loading ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <ShoppingCart className="mr-2 size-4" />
        )}
        Buy for {formatPrice(price)}
      </Button>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
