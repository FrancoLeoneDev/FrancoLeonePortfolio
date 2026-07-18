"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { personalInfo, aboutText } from "@/data/portfolio";
import { SlideIn, FadeUp, DrawLine } from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/i18n/LanguageProvider";

export function About() {
  const { t, pick } = useLanguage();
  return (
    <section id="about" className="py-24 md:py-32 bg-slate-50/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.about.heading}
          </motion.h2>
          <DrawLine
            className="flex-1 h-px bg-gradient-to-r from-primary-300 to-transparent"
            delay={0.3}
          />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Image/Visual Side */}
          <SlideIn direction="left" className="md:col-span-2">
            <div className="relative">
              {/* Decorative elements with animations */}
              <motion.div
                className="absolute -top-4 -left-4 w-full h-full border-2 border-primary-200 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-full h-full bg-primary-100 rounded-2xl -z-10"
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />

              {/* Portrait. The source is a 640x640 square from WhatsApp, so it
                  fills this square slot exactly; object-top keeps the crop on
                  the face. A higher-resolution original drops in with no other
                  change. */}
              <motion.div
                className="relative rounded-2xl aspect-square overflow-hidden bg-slate-100"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/franco.jpg"
                  alt={personalInfo.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </motion.div>
            </div>
          </SlideIn>

          {/* Text Side */}
          <SlideIn direction="right" className="md:col-span-3">
            <div className="space-y-6">
              <motion.p
                className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed"
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {pick(aboutText.intro)}
              </motion.p>

              <div className="space-y-4">
                {aboutText.details.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-slate-600 leading-relaxed"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
                  >
                    {pick(paragraph)}
                  </motion.p>
                ))}
              </div>

              {/* Quick Stats with staggered animation */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.5,
                    },
                  },
                }}
              >
                {[
                  { label: t.about.statGames, value: "5+" },
                  { label: t.about.statWeb, value: "10+" },
                  { label: t.about.statTech, value: "15+" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 group"
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.9 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.4 },
                      },
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                      borderColor: "rgb(147 197 253)",
                    }}
                  >
                    <motion.div
                      className="text-2xl font-bold text-primary-600"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        delay: 0.6 + index * 0.1,
                        stiffness: 200,
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
