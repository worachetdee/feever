"use client";

import { useCallback, useState } from "react";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.hits ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  return { query, results, loading, search };
}
