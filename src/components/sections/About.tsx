"use client";

import { motion } from "framer-motion";
import { personalInfo, aboutText } from "@/data/portfolio";
import { SlideIn, FadeUp, DrawLine } from "@/components/ui/AnimatedSection";

export function About() {
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
            About Me
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

              {/* Profile placeholder with animations */}
              <motion.div
                className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl aspect-square flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center text-white p-8">
                  <motion.div
                    className="text-6xl md:text-7xl font-bold mb-2"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.5, duration: 0.8 }}
                  >
                    {personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </motion.div>
                  <motion.p
                    className="text-primary-200 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    Your photo here
                  </motion.p>
                </div>

                {/* Floating elements with idle animations */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-lg backdrop-blur-sm"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm"
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-4 w-6 h-6 bg-white/10 rounded-full"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
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
                {aboutText.intro}
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
                    {paragraph}
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
                  { label: "Web Projects", value: "10+" },
                  { label: "Game Projects", value: "5+" },
                  { label: "Technologies", value: "15+" },
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
