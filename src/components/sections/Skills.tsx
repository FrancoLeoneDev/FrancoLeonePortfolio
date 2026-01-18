"use client";

import { motion } from "framer-motion";
import { skills, skillCategories, Skill } from "@/data/portfolio";
import { TechIcons } from "@/components/icons/TechIcons";
import { DrawLine } from "@/components/ui/AnimatedSection";

const categoryColors = {
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-green-500 to-emerald-500",
  gamedev: "from-purple-500 to-pink-500",
  tools: "from-orange-500 to-amber-500",
};

const categoryBgColors = {
  frontend: "bg-blue-50 border-blue-200 hover:border-blue-400",
  backend: "bg-green-50 border-green-200 hover:border-green-400",
  gamedev: "bg-purple-50 border-purple-200 hover:border-purple-400",
  tools: "bg-orange-50 border-orange-200 hover:border-orange-400",
};

const categoryIconColors = {
  frontend: "text-blue-500",
  backend: "text-green-600",
  gamedev: "text-purple-500",
  tools: "text-orange-500",
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const IconComponent = TechIcons[skill.iconKey];

  return (
    <motion.div
      className={`group relative p-4 rounded-xl border ${categoryBgColors[skill.category]} transition-all duration-300 cursor-pointer`}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        {IconComponent ? (
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
            transition={{ duration: 0.4 }}
          >
            <IconComponent
              className={`w-6 h-6 ${categoryIconColors[skill.category]} transition-transform`}
            />
          </motion.div>
        ) : (
          <div className={`w-6 h-6 rounded ${categoryIconColors[skill.category]}`} />
        )}
        <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
          {skill.name}
        </span>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${categoryColors[skill.category]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent"
        whileHover={{
          borderColor: `rgba(59, 130, 246, 0.3)`,
        }}
      />
    </motion.div>
  );
}

export function Skills() {
  const categories = Object.keys(skillCategories) as Array<
    keyof typeof skillCategories
  >;

  return (
    <section id="skills" className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
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
            Skills & Technologies
          </motion.h2>
          <motion.p
            className="text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A comprehensive toolkit spanning web development, game development,
            and modern DevOps practices.
          </motion.p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              >
                {/* Category Header */}
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 + 0.1 }}
                >
                  <motion.div
                    className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${categoryColors[category]}`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + 0.2, duration: 0.4 }}
                    style={{ originY: 0 }}
                  />
                  <h3 className="text-xl font-semibold text-slate-800">
                    {skillCategories[category]}
                  </h3>
                  <DrawLine
                    className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"
                    delay={categoryIndex * 0.1 + 0.3}
                  />
                </motion.div>

                {/* Skills Grid with stagger */}
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.06,
                        delayChildren: categoryIndex * 0.1,
                      },
                    },
                  }}
                >
                  {categorySkills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={index}
                    />
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative element with animation */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2 px-6 py-3 bg-primary-50 rounded-full text-primary-600"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0)",
                "0 0 0 10px rgba(59, 130, 246, 0.1)",
                "0 0 0 0 rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </motion.svg>
            <span className="text-sm font-medium">
              Always learning new technologies
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
