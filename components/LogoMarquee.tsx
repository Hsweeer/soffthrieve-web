"use client";



import { INTEGRATION_ITEMS } from "@/lib/integrations";

import { IntegrationIcon } from "@/components/IntegrationIcon";

import { useDictionary } from "@/lib/i18n";



function IntegrationPill({ name, slug, color }: { name: string; slug: string; color: string }) {

  return (

    <div className="flex w-[4.75rem] shrink-0 flex-col items-center gap-2 sm:w-[5.5rem]" title={name}>

      <div className="flex h-14 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-2 shadow-[0_2px_14px_rgba(15,23,42,0.07)] transition-shadow hover:shadow-[0_4px_20px_rgba(15,23,42,0.1)] sm:h-[3.75rem]">

        <IntegrationIcon color={color} size={30} slug={slug} />

      </div>

      <span className="max-w-full truncate text-center text-[10px] font-medium leading-tight text-slate-600 sm:text-[11px]">

        {name}

      </span>

    </div>

  );

}



export function LogoMarquee() {

  const { dict } = useDictionary();

  const row = [...INTEGRATION_ITEMS, ...INTEGRATION_ITEMS];



  return (

    <section aria-label={dict.aria.integrations} className="relative z-10 w-full">

      <div className="mb-5 text-center sm:mb-6">

        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">{dict.home.integrationsEyebrow}</p>

        <p className="mt-2 text-sm text-slate-600">{dict.home.integrationsText}</p>

      </div>

      <div

        className="relative overflow-hidden py-2"

        style={{

          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",

          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)"

        }}

      >

        <div className="marquee-track items-start gap-4 px-2 sm:gap-5">

          {row.map((item, index) => (

            <IntegrationPill color={item.color} key={`${item.slug}-${index}`} name={item.name} slug={item.slug} />

          ))}

        </div>

      </div>

    </section>

  );

}


