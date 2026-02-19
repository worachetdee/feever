"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CATEGORIES,
  LAUNCH_CATEGORIES,
  COMPATIBILITY_TAGS,
} from "@/lib/utils/constants";
import type { Category, CompatibilityTag } from "@/types";

interface SearchFiltersProps {
  categories?: string[];
  tags?: string[];
  onFilterChange: (filters: { categories: string[]; tags: string[] }) => void;
}

export function SearchFilters({
  categories = [],
  tags = [],
  onFilterChange,
}: SearchFiltersProps) {
  const handleCategoryToggle = (category: string, checked: boolean) => {
    const next = checked
      ? [...categories, category]
      : categories.filter((c) => c !== category);
    onFilterChange({ categories: next, tags });
  };

  const handleTagToggle = (tag: string, checked: boolean) => {
    const next = checked ? [...tags, tag] : tags.filter((t) => t !== tag);
    onFilterChange({ categories, tags: next });
  };

  const handleClearAll = () => {
    onFilterChange({ categories: [], tags: [] });
  };

  const hasFilters = categories.length > 0 || tags.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Category
        </h4>
        <div className="space-y-2.5">
          {LAUNCH_CATEGORIES.map((key) => {
            const cat = CATEGORIES[key as Category];
            return (
              <div key={key} className="flex items-center gap-2.5">
                <Checkbox
                  id={`cat-${key}`}
                  checked={categories.includes(key)}
                  onCheckedChange={(checked) =>
                    handleCategoryToggle(key, checked === true)
                  }
                />
                <Label
                  htmlFor={`cat-${key}`}
                  className="cursor-pointer text-sm text-foreground"
                >
                  {cat.label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Compatibility
        </h4>
        <div className="space-y-2.5">
          {(
            Object.keys(COMPATIBILITY_TAGS) as CompatibilityTag[]
          ).map((key) => {
            const tag = COMPATIBILITY_TAGS[key];
            return (
              <div key={key} className="flex items-center gap-2.5">
                <Checkbox
                  id={`tag-${key}`}
                  checked={tags.includes(key)}
                  onCheckedChange={(checked) =>
                    handleTagToggle(key, checked === true)
                  }
                />
                <Label
                  htmlFor={`tag-${key}`}
                  className="cursor-pointer text-sm text-foreground"
                >
                  {tag.label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
