"use client";

import { motion } from "framer-motion";
import { education, certifications } from "@/data/portfolio";
import { DrawLine } from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Two tiers on purpose: the degree renders as a wide card with a medallion and
 * the certificates as a compact grid below it. The size gap is the whole point —
 * it stops a short online course from reading at the same rank as the title.
 */
export function Education() {
  const { t, pick } = useLanguage();

  return (
    <section id="education" className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.education.heading}
          </motion.h2>
          <motion.p
            className="text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.education.subtitle}
          </motion.p>
        </motion.div>

        {/* Degree(s) */}
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="relative bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
              }}
            >
              {/* Accent rail — marks this as the headline credential */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-400 to-primary-600"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                style={{ originY: 0 }}
              />

              <div className="flex flex-col sm:flex-row gap-5">
                {/* Medallion */}
                <motion.div
                  className="shrink-0 w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    delay: index * 0.15 + 0.3,
                    stiffness: 260,
                  }}
                  whileHover={{ scale: 1.08 }}
                >
                  <svg
                    className="w-7 h-7 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422A12.083 12.083 0 0112 20.055a12.083 12.083 0 01-6.16-9.477L12 14z"
                    />
                  </svg>
                </motion.div>

                <div className="flex-1">
                  {/* Badges: period when known, plus the graduate marker */}
                  <motion.div
                    className="flex flex-wrap items-center gap-2 mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.35 }}
                  >
                    {edu.period && (
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                        {pick(edu.period)}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {t.education.graduate}
                    </span>
                  </motion.div>

                  <motion.h3
                    className="text-xl md:text-2xl font-semibold text-slate-900 mb-2 leading-snug"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                  >
                    {pick(edu.degree)}
                  </motion.h3>

                  <motion.p
                    className="text-primary-600 font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                  >
                    {edu.url ? (
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-700 hover:underline underline-offset-2 transition-colors"
                      >
                        {edu.institution}
                      </a>
                    ) : (
                      edu.institution
                    )}
                    <span className="text-slate-400 font-normal">
                      {" · "}
                      {edu.location}
                    </span>
                  </motion.p>

                  {edu.description && (
                    <motion.p
                      className="text-slate-600 text-sm leading-relaxed mt-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.6 }}
                    >
                      {pick(edu.description)}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications — hidden entirely while the list is empty */}
        {certifications.length > 0 && (
          <div className="mt-16">
            <motion.div
              className="flex items-center gap-4 mb-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-slate-800">
                {t.education.certificationsLabel}
              </h3>
              <DrawLine
                className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"
                delay={0.2}
              />
            </motion.div>

            <motion.p
              className="text-slate-600 text-sm mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t.education.certificationsSubtitle}
            </motion.p>

            <motion.div
              className="grid sm:grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
              }}
            >
              {certifications.map((cert) => {
                // The verification URL wins over the image: it proves the
                // certificate, while a file only shows one.
                const credentialHref = cert.credentialUrl ?? cert.image;

                return (
                <motion.div
                  key={cert.id}
                  className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col"
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.96 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 14px 30px -12px rgba(0,0,0,0.12)",
                  }}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                      {cert.issuer}
                    </span>
                    {cert.year && (
                      <span className="text-xs text-slate-400">{cert.year}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-slate-800 leading-snug">
                      {cert.name}
                    </p>
                    {cert.instructor && (
                      <p className="text-sm text-slate-500 mt-1">
                        {t.education.by} {cert.instructor}
                      </p>
                    )}
                  </div>

                  {credentialHref && (
                    <a
                      href={credentialHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {t.education.viewCredential}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
