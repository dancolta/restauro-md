import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-20">
      <div className="text-center px-6">
        <div className="text-7xl font-serif font-light text-accent mb-6">404</div>
        <h1 className="text-2xl font-serif font-light mb-4">Pagina nu a fost găsită</h1>
        <p className="text-muted text-sm font-light mb-8">
          Ne pare rău, pagina pe care o căutați nu există.
        </p>
        <Link
          href="/ro"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 text-xs tracking-[0.1em] uppercase font-medium hover:bg-accent-hover transition-colors cursor-pointer rounded"
        >
          Acasă
        </Link>
      </div>
    </div>
  );
}
