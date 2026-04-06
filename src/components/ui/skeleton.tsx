function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-surface-hover rounded ${className}`}
    />
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[85vh] lg:h-screen overflow-hidden">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <Skeleton className="w-16 h-px mb-8" />
          <Skeleton className="h-12 sm:h-16 w-3/4 max-w-xl mb-4" />
          <Skeleton className="h-12 sm:h-16 w-1/2 max-w-md mb-6" />
          <Skeleton className="h-5 w-2/3 max-w-lg mb-10" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-44" />
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="p-6 sm:p-8 bg-[#0F0E0D] border border-border">
      <Skeleton className="w-10 h-10 mb-5" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

export function SectionHeaderSkeleton() {
  return (
    <div className="text-center mb-14">
      <div className="flex justify-center mb-6">
        <Skeleton className="w-16 h-px" />
      </div>
      <Skeleton className="h-10 sm:h-12 w-72 mx-auto mb-4" />
      <Skeleton className="h-4 w-96 max-w-full mx-auto" />
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[340px] h-[280px] p-6 sm:p-7 bg-[#0F0E0D] border border-border flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-3 h-3" />
          ))}
        </div>
        <Skeleton className="w-4 h-4" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex items-center gap-3 pt-5 mt-auto border-t border-border">
        <Skeleton className="w-9 h-9 shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className="bg-surface border border-border p-6 sm:p-8 space-y-5">
      {[1, 2].map((i) => (
        <div key={i}>
          <Skeleton className="h-3 w-32 mb-2" />
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
      <div>
        <Skeleton className="h-3 w-28 mb-2" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div>
        <Skeleton className="h-3 w-40 mb-2" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export function ContactInfoSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-4 p-5 bg-surface border border-border">
          <Skeleton className="w-12 h-12 shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-5 w-40" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServicePageSkeleton() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-24 mb-6" />
          <div className="flex justify-center mb-6">
            <Skeleton className="w-16 h-px" />
          </div>
          <Skeleton className="h-10 sm:h-14 w-96 max-w-full mx-auto mb-4" />
          <Skeleton className="h-5 w-2/3 max-w-xl mx-auto mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
            <Skeleton className="aspect-[4/3]" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="space-y-3 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-5 h-5 shrink-0" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PortfolioSkeleton() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-24 mb-6" />
          <div className="flex justify-center mb-6">
            <Skeleton className="w-16 h-px" />
          </div>
          <Skeleton className="h-10 sm:h-14 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 max-w-full mx-auto mb-12" />
          <div className="flex justify-center gap-3 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-9 w-24" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-[4/3]" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
