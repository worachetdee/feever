export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Join feever to discover and sell AI products
          </p>
        </div>
        {/* GitHub OAuth + Magic Link will be implemented here */}
      </div>
    </div>
  );
}
