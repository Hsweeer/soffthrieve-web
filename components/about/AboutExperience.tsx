"use client";



import Link from "next/link";

import { motion } from "motion/react";

import { TeamStatsSection } from "@/components/about/TeamStatsSection";

import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

import {

  getAboutStats,

  getPortfolioExperience,

  getProcess,

  getTrustPoints,

  localePath,

  useDictionary

} from "@/lib/i18n";



const reveal = {

  hidden: { opacity: 0, y: 10 },

  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } }

};



export function AboutExperience() {

  const { dict, locale } = useDictionary();

  const aboutStats = getAboutStats(locale);

  const trustPoints = getTrustPoints(locale);

  const process = getProcess(locale);

  const portfolioExperience = getPortfolioExperience(locale);



  return (

    <div className="about-page">

      <section className="border-b border-slate-200/80 pt-14 pb-12 sm:pt-16 sm:pb-14">

        <div className="container-shell">

          <motion.div

            className="max-w-3xl"

            initial="hidden"

            animate="show"

            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}

          >

            <motion.p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500" variants={reveal}>

              {dict.about.eyebrow}

            </motion.p>

            <motion.h1

              className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"

              variants={reveal}

            >

              {dict.about.title}

            </motion.h1>

            <motion.p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600" variants={reveal}>

              {portfolioExperience}

            </motion.p>

            <motion.div className="mt-6 flex flex-wrap gap-4 text-sm font-medium" variants={reveal}>

              <Link

                className="text-[#2090f0] transition hover:text-[#1878c9]"

                href={localePath("/work?category=shopify", locale)}

              >

                {dict.about.viewWork} →

              </Link>

              <Link

                className="text-slate-600 transition hover:text-slate-900"

                href={localePath("/contact", locale)}

              >

                {dict.about.contactLink} →

              </Link>

            </motion.div>

          </motion.div>

        </div>

      </section>



      <section className="border-b border-slate-200/80 bg-white py-12 sm:py-14">

        <div className="container-shell">

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-3 lg:gap-6">

            {aboutStats.map((stat) => (

              <motion.div

                initial="hidden"

                key={stat.label}

                variants={reveal}

                viewport={{ once: true, margin: "-40px" }}

                whileInView="show"

              >

                <p className="text-3xl font-semibold tabular-nums tracking-tight text-slate-900 sm:text-4xl">
                  {stat.display}
                </p>

                <p className="mt-2 text-sm font-medium text-slate-900">{stat.label}</p>

                <p className="mt-0.5 text-xs text-slate-500">{stat.detail}</p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>



      <section className="py-14 sm:py-16">

        <div className="container-shell">

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">

            {trustPoints.map((point) => (

              <motion.div

                className="border-t border-slate-200 pt-6"

                initial="hidden"

                key={point.title}

                variants={reveal}

                viewport={{ once: true }}

                whileInView="show"

              >

                <h2 className="text-base font-semibold text-slate-900">{point.title}</h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.text}</p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>



      <TeamStatsSection />



      <section className="border-t border-slate-200/80 bg-slate-50/50 py-14 sm:py-16">

        <div className="container-shell">

          <motion.h2

            className="text-sm font-semibold text-slate-900"

            initial="hidden"

            variants={reveal}

            viewport={{ once: true }}

            whileInView="show"

          >

            {dict.about.howWeWork}

          </motion.h2>

          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {process.map((step, index) => (

              <motion.li

                className="text-sm"

                initial="hidden"

                key={step.title}

                variants={reveal}

                viewport={{ once: true }}

                whileInView="show"

              >

                <span className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span>

                <p className="mt-2 font-medium text-slate-900">{step.title}</p>

                <p className="mt-1 leading-relaxed text-slate-600">{step.text}</p>

              </motion.li>

            ))}

          </ol>

        </div>

      </section>



      <section className="py-14 sm:pb-20">

        <div className="container-shell flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="max-w-md text-sm font-semibold text-slate-900">{dict.home.startCtaTitle}</p>

          <div className="flex flex-col items-start gap-2">
            <WhatsAppButton locale={locale}>{dict.cta.whatsappConsultation}</WhatsAppButton>
            <p className="text-xs font-medium text-slate-500">{dict.home.startCtaText}</p>
          </div>

        </div>

      </section>

    </div>

  );

}

