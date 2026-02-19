"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "../actions";

interface SettingsFormProps {
  initialData: {
    display_name: string;
    bio: string;
    website: string;
  };
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const [displayName, setDisplayName] = useState(initialData.display_name);
  const [bio, setBio] = useState(initialData.bio);
  const [website, setWebsite] = useState(initialData.website);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = await updateProfile({
      display_name: displayName,
      bio,
      website,
    });

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully" });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="display_name">Display Name</Label>
        <Input
          id="display_name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your display name"
          maxLength={50}
        />
        <p className="text-xs text-muted-foreground">
          This is how your name appears on the marketplace.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          maxLength={500}
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          {bio.length}/500 characters
        </p>
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

      {message && (
        <p
          className={`text-sm ${
            message.type === "error"
              ? "text-destructive"
              : "text-success"
          }`}
        >
          {message.text}
        </p>
      )}

      <Button type="submit" disabled={loading} className="bg-primary text-white hover:bg-primary/90">
        {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}
