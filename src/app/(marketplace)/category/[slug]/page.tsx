interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight capitalize">
        {slug.replace(/-/g, " ")}
      </h1>
      {/* Category-filtered product grid will be implemented here */}
    </div>
  );
}
