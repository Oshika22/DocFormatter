import { motion } from "framer-motion";

export default function FloatingShape({
  className,
  delay = 0,
  duration = 8,
}) {
  return (
    <motion.div
      className={`absolute rounded-3xl blur-sm ${className}`}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 6, -6, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
