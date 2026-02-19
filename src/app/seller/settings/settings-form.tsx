"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/app/account/actions";
import { Loader2 } from "lucide-react";

interface SellerSettingsFormProps {
  displayName: string;
  bio: string;
  website: string;
}

export function SellerSettingsForm({
  displayName: initialDisplayName,
  bio: initialBio,
  website: initialWebsite,
}: SellerSettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [bio, setBio] = useState(initialBio);
  const [website, setWebsite] = useState(initialWebsite);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const result = await updateProfile({
        display_name: displayName,
        bio,
        website,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Profile updated.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="display_name">Display Name</Label>
        <Input
          id="display_name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name or brand"
          maxLength={50}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell buyers about yourself"
          maxLength={500}
          rows={4}
        />
        <p className="text-xs text-muted-foreground">{bio.length}/500</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://yoursite.com"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && (
        <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2 className="animate-spin" />}
        Save Profile
      </Button>
    </form>
  );
}
