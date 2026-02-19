interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
      <p className="mt-2 text-sm text-muted-foreground">Product ID: {id}</p>
    </div>
  );
}
