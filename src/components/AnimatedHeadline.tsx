import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHRASES = [
  "Não espere o pior acontecer. Evite transtornos.",
  "Com proteção a vida fica mais leve.",
];

export function AnimatedHeadline() {
  const [index, setIndex] = useState(0);
  const phrases = useMemo(() => PHRASES, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 3500);
    return () => clearTimeout(id);
  }, [index, phrases.length]);

  return (
    <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl lg:text-7xl">
      <span className="relative flex w-full justify-center overflow-hidden text-center min-h-[1.2em] md:min-h-[1.15em]">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            className="absolute bg-gradient-to-r from-primary to-navy bg-clip-text text-transparent"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 70, damping: 14 }}
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
