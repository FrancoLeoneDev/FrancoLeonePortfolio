"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 overflow-hidden">
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
            Experience
          </motion.h2>
          <motion.p
            className="text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            My professional journey and the roles that have shaped my career.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
          />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg md:-translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    delay: index * 0.2 + 0.3,
                    stiffness: 300,
                  }}
                  whileHover={{ scale: 1.3 }}
                >
                  {/* Pulse animation */}
                  <motion.div
                    className="absolute inset-0 bg-primary-400 rounded-full"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  className={`flex-1 pl-8 md:pl-0 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                >
                  <motion.div
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
                    }}
                  >
                    {/* Period badge */}
                    <motion.span
                      className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.4 }}
                    >
                      {exp.period}
                    </motion.span>

                    <motion.h3
                      className="text-xl font-semibold text-slate-900 mb-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                    >
                      {exp.role}
                    </motion.h3>

                    <motion.p
                      className="text-primary-600 font-medium mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.6 }}
                    >
                      {exp.company}
                    </motion.p>

                    {/* Description */}
                    <motion.ul
                      className={`space-y-2 mb-4 ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: index * 0.2 + 0.7,
                          },
                        },
                      }}
                    >
                      {exp.description.map((item, i) => (
                        <motion.li
                          key={i}
                          className="text-slate-600 text-sm"
                          variants={{
                            hidden: { opacity: 0, x: index % 2 === 0 ? 20 : -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>

                    {/* Technologies */}
                    <motion.div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.05,
                            delayChildren: index * 0.2 + 0.9,
                          },
                        },
                      }}
                    >
                      {exp.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                          variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 },
                          }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgb(219 234 254)",
                            color: "rgb(29 78 216)",
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>

          {/* Timeline end dot */}
          <motion.div
            className="absolute left-0 md:left-1/2 bottom-0 w-3 h-3 bg-primary-300 rounded-full md:-translate-x-1/2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          />
        </div>

        {/* Empty state if no experiences */}
        {experiences.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                className="w-8 h-8 text-primary-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.div>
            <p className="text-slate-600">
              Experience details coming soon...
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
