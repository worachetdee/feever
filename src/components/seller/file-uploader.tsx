"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { uploadProductFile, deleteProductFile } from "@/app/seller/actions";
import {
  Upload,
  X,
  File as FileIcon,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import type { ProductFile } from "@/types";

interface FileUploaderProps {
  productId: string;
  files: ProductFile[];
  onFilesChange?: () => void;
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function FileUploader({
  productId,
  files: initialFiles,
  onFilesChange,
}: FileUploaderProps) {
  const [files, setFiles] = useState<ProductFile[]>(initialFiles);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (fileList: FileList) => {
      setUploading(true);
      setError(null);

      for (const file of Array.from(fileList)) {
        const formData = new FormData();
        formData.set("productId", productId);
        formData.set("file", file);
        formData.set("isPreview", "false");

        const result = await uploadProductFile(formData);
        if (result.error) {
          setError(result.error);
          break;
        }
        if (result.data) {
          setFiles((prev) => [...prev, result.data as ProductFile]);
        }
      }

      setUploading(false);
      onFilesChange?.();
    },
    [productId, onFilesChange],
  );

  async function handleDelete(fileId: string) {
    setDeletingId(fileId);
    setError(null);

    const result = await deleteProductFile(fileId);
    if (result.error) {
      setError(result.error);
    } else {
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      onFilesChange?.();
    }

    setDeletingId(null);
  }

  async function togglePreview(file: ProductFile) {
    // Toggle is_preview by re-uploading metadata — for now, we just track locally
    // A dedicated server action for toggling preview could be added later
    setFiles((prev) =>
      prev.map((f) =>
        f.id === file.id ? { ...f, is_preview: !f.is_preview } : f,
      ),
    );
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.length) {
      handleUpload(e.dataTransfer.files);
    }
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/50"
        }`}
      >
        {uploading ? (
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        ) : (
          <Upload className="size-8 text-muted-foreground" />
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          {uploading
            ? "Uploading..."
            : "Drag & drop files here, or click to browse"}
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) {
              handleUpload(e.target.files);
              e.target.value = "";
            }
          }}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
            >
              <FileIcon className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.file_name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.file_size)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => togglePreview(file)}
                title={file.is_preview ? "Visible to all" : "Buyers only"}
              >
                {file.is_preview ? (
                  <Eye className="text-primary" />
                ) : (
                  <EyeOff />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => handleDelete(file.id)}
                disabled={deletingId === file.id}
              >
                {deletingId === file.id ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <X />
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
