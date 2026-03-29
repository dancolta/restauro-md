import { Phone, Search, Wrench } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProcessProps {
  dict: Dictionary;
}

const stepIcons = [Phone, Search, Wrench];

export function Process({ dict }: ProcessProps) {
  const steps = [
    { ...dict.process.step1, icon: stepIcons[0] },
    { ...dict.process.step2, icon: stepIcons[1] },
    { ...dict.process.step3, icon: stepIcons[2] },
  ];

  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <AnimateOnScroll>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="luxury-divider" />
            </div>
            <h2 className="text-4xl sm:text-5xl">
              {dict.process.title}
            </h2>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 border border-[#2A2622] mb-6">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-sm font-medium tracking-wider mb-3">{step.title}</h3>
                  <p className="text-muted text-sm font-light leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
