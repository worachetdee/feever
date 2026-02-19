export type Category =
  | "starter"
  | "workflow_kit"
  | "extension"
  | "launchable"
  | "context_pack"
  | "blueprint";

export type QualityTier = "unverified" | "verified" | "pick" | "gold";

export type LicenseType = "personal" | "commercial" | "team";

export type ProductStatus = "draft" | "in_review" | "published" | "archived";

export type CompatibilityTag =
  | "claude_4.5"
  | "claude_4"
  | "gpt_4.5"
  | "gpt_4"
  | "gemini_2"
  | "cursor"
  | "windsurf"
  | "v0"
  | "bolt"
  | "lovable"
  | "replit";

export interface Product {
  id: string;
  seller_id: string;
  title: string;
  slug: string;
  description_md: string;
  short_description: string | null;
  category: Category;
  price: number;
  currency: string;
  license_type: LicenseType;
  compatibility_tags: CompatibilityTag[];
  version: string;
  changelog: Record<string, string>[];
  forked_from: string | null;
  fork_revenue_share_pct: number;
  quality_tier: QualityTier;
  trust_score: number;
  avg_rating: number;
  review_count: number;
  purchase_count: number;
  view_count: number;
  status: ProductStatus;
  preview_config: Record<string, unknown> | null;
  last_tested_at: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFile {
  id: string;
  product_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  file_type: string | null;
  is_preview: boolean;
  created_at: string;
}

export interface ProductWithSeller extends Product {
  seller: {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
}

export type SellerTier = "free" | "pro" | "team";
export type UserRole = "buyer" | "seller" | "both";

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  role: UserRole;
  seller_tier: SellerTier;
  stripe_connect_id: string | null;
  stripe_connect_onboarded: boolean;
  credit_balance: number;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  buyer_id: string;
  product_id: string;
  amount: number;
  platform_fee: number;
  seller_payout: number;
  fork_royalty: number;
  stripe_payment_id: string | null;
  stripe_transfer_id: string | null;
  credits_used: number;
  created_at: string;
}

export interface PurchaseWithProduct extends Purchase {
  product: ProductWithSeller;
}
