"use client";

import { useState } from "react";
import { Download, ChevronDown, Loader2, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface FileInfo {
  id: string;
  file_name: string;
  file_path: string;
}

interface DownloadButtonProps {
  productId: string;
  files: FileInfo[];
}

export function DownloadButton({ files }: DownloadButtonProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const downloadFile = async (file: FileInfo) => {
    setLoading(file.id);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from("product-files")
        .createSignedUrl(file.file_path, 60);

      if (error || !data?.signedUrl) {
        return;
      }

      const link = document.createElement("a");
      link.href = data.signedUrl;
      link.download = file.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setLoading(null);
      setMenuOpen(false);
    }
  };

  if (files.length === 0) return null;

  if (files.length === 1) {
    const file = files[0];
    return (
      <Button
        onClick={() => downloadFile(file)}
        disabled={loading === file.id}
        variant="outline"
        className="w-full"
        size="lg"
      >
        {loading === file.id ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <Download className="mr-2 size-4" />
        )}
        Download
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setMenuOpen(!menuOpen)}
        variant="outline"
        className="w-full"
        size="lg"
      >
        <Download className="mr-2 size-4" />
        Download Files
        <ChevronDown className="ml-2 size-4" />
      </Button>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
          <ul className="py-1">
            {files.map((file) => (
              <li key={file.id}>
                <button
                  onClick={() => downloadFile(file)}
                  disabled={loading === file.id}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted disabled:opacity-50"
                >
                  {loading === file.id ? (
                    <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
                  ) : (
                    <FileIcon className="size-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="truncate text-foreground">
                    {file.file_name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
