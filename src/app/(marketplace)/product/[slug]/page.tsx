interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Product: {slug}</p>
      {/* Full product detail view will be implemented here */}
    </div>
  );
}
