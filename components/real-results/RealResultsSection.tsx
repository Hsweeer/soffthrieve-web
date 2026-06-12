"use client";

import { RealResultsCardsCarousel } from "@/components/real-results/RealResultsCardsCarousel";
import { ServiceResultCard } from "@/components/real-results/ServiceResultCard";
import { REAL_RESULTS_CARDS, type RealResultsCardId } from "@/lib/real-results-cards";
import { useDictionary } from "@/lib/i18n";

export function RealResultsSection() {
  const { dict } = useDictionary();
  const copy = dict.home.realResults;

  const cardCopy = (id: RealResultsCardId) => copy.cards[id];

  return (
    <section
      aria-labelledby="real-results-heading"
      className="real-results-section bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-4xl font-black leading-tight tracking-[0] text-[#082f49] sm:text-5xl"
            id="real-results-heading"
          >
            {copy.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">{copy.subtitle}</p>
        </div>

        <RealResultsCardsCarousel>
          {REAL_RESULTS_CARDS.map((config) => {
            const text = cardCopy(config.id);
            return (
              <ServiceResultCard
                badge={text.badge}
                config={config}
                cta={copy.whatsappCta}
                headline={text.headline}
                key={config.id}
                supporting={text.supporting}
              />
            );
          })}
        </RealResultsCardsCarousel>
      </div>
    </section>
  );
}
