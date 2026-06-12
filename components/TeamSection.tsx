"use client";



import Image from "next/image";

import { motion } from "motion/react";

import { getTeamMembers, useDictionary } from "@/lib/i18n";



const reveal = {

  hidden: { opacity: 0, y: 8 },

  show: { opacity: 1, y: 0, transition: { duration: 0.35 } }

};



export function TeamSection({ variant = "default" }: { variant?: "default" | "about" }) {

  const { dict, locale } = useDictionary();

  const members = getTeamMembers(locale);

  const compact = variant === "about";



  return (

    <section className={compact ? "border-t border-slate-200/80 py-14 sm:py-16" : "py-20"}>

      <div className="container-shell">

        <motion.div

          className={compact ? "mb-8 max-w-xl" : "mx-auto mb-12 max-w-2xl text-center"}

          initial="hidden"

          variants={reveal}

          viewport={{ once: true }}

          whileInView="show"

        >

          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{dict.about.teamEyebrow}</p>

          <h2

            className={`mt-2 font-semibold tracking-tight text-slate-900 ${compact ? "text-xl" : "text-4xl font-black text-[#08112b]"}`}

          >

            {dict.about.teamTitle}

          </h2>

          {!compact && <p className="mt-4 text-lg leading-8 text-[#5a6d90]">{dict.about.teamText}</p>}

        </motion.div>



        <div className={`grid gap-5 ${compact ? "sm:grid-cols-2 lg:grid-cols-4" : "gap-6 sm:grid-cols-2 lg:grid-cols-4"}`}>

          {members.map((member) => (

            <motion.article

              className={

                compact

                  ? "overflow-hidden rounded-lg border border-slate-200/90 bg-white"

                  : "scroll-reveal overflow-hidden rounded-[28px] border border-[#08112b]/10 bg-white shadow-[0_18px_60px_rgba(8,17,43,0.07)] transition hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(32,144,240,0.12)]"

              }

              initial="hidden"

              key={member.name}

              variants={reveal}

              viewport={{ once: true }}

              whileInView="show"

            >

              <div className={`relative bg-slate-100 ${compact ? "aspect-[4/5]" : "aspect-[4/5] bg-gradient-to-br from-[#eff7fe] to-[#dbedfd]"}`}>

                <Image

                  alt={member.name}

                  className="object-cover"

                  fill

                  sizes="(min-width: 1024px) 25vw, 50vw"

                  src={member.image}

                  unoptimized

                />

              </div>

              <div className={compact ? "p-4" : "p-5"}>

                <h3 className={`font-semibold text-slate-900 ${compact ? "text-sm" : "text-lg font-black text-[#08112b]"}`}>

                  {member.name}

                </h3>

                <p className={`mt-0.5 font-medium text-[#2090f0] ${compact ? "text-xs" : "text-sm font-bold"}`}>

                  {member.role}

                </p>

                {compact ? (

                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600">{member.bio}</p>

                ) : (

                  <p className="mt-3 text-sm leading-7 text-[#5a6d90]">{member.bio}</p>

                )}

              </div>

            </motion.article>

          ))}

        </div>

      </div>

    </section>

  );

}

