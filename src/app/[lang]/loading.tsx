import {
  HeroSkeleton,
  SectionHeaderSkeleton,
  ServiceCardSkeleton,
  ReviewCardSkeleton,
} from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <>
      <HeroSkeleton />

      {/* Services section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeaderSkeleton />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeaderSkeleton />
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 px-6 sm:px-10 pb-4">
            {[1, 2, 3].map((i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
