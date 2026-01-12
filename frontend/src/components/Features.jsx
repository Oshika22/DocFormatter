import { motion } from "framer-motion";

/* 
  Tailwind safelist (do NOT remove)
  from-purple-500/25 via-purple-500/10
  from-indigo-500/25 via-indigo-500/10
  from-pink-500/25 via-pink-500/10
  from-violet-500/25 via-violet-500/10
*/

const features = [
  {
    title: "AI Formatting Engine",
    desc: "Understands document structure and applies consistent formatting automatically.",
    border: "hover:border-purple-500",
    fog: "from-purple-500/25 via-purple-500/10",
  },
  {
    title: "Continuous Chat",
    desc: "Talk to your document. Refine formatting through natural conversation.",
    border: "hover:border-indigo-500",
    fog: "from-indigo-500/25 via-indigo-500/10",
  },
  {
    title: "Live Preview",
    desc: "See changes instantly before exporting the final document.",
    border: "hover:border-pink-500",
    fog: "from-pink-500/25 via-pink-500/10",
  },
  {
    title: "Rule + Intent Based",
    desc: "Balances formatting rules with user intent for reliable results.",
    border: "hover:border-violet-500",
    fog: "from-violet-500/25 via-violet-500/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Features() {
  return (
    <section className="bg-neutral-950 py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Powerful Features
        </motion.h2>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={`
                relative overflow-hidden
                p-6 rounded-xl
                bg-neutral-900
                border border-neutral-800
                ${f.border}
                transition-all duration-300
              `}
            >
              {/* Fog gradient */}
              <div
                className={`
                  pointer-events-none
                  absolute inset-x-0 bottom-0 h-24
                  bg-linear-to-t
                  ${f.fog}
                  to-transparent
                  blur-2xl
                `}
              />

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 relative z-10">
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
