import { ContactFormSkeleton, ContactInfoSkeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left">
            <div className="h-4 w-24 bg-surface-hover animate-pulse rounded mb-6" />
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-16 h-px bg-surface-hover animate-pulse" />
            </div>
            <div className="h-10 sm:h-12 w-64 bg-surface-hover animate-pulse rounded mx-auto lg:mx-0 mb-4" />
            <div className="h-5 w-96 max-w-full bg-surface-hover animate-pulse rounded mx-auto lg:mx-0" />
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <ContactFormSkeleton />
            </div>
            <div className="lg:col-span-2 space-y-8">
              <ContactInfoSkeleton />
              <div className="aspect-[4/3] bg-surface-hover animate-pulse rounded border border-border" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
