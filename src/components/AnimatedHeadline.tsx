import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHRASES = [
  "Proteja o que importa. Sem complicações.",
  "Não espere o pior acontecer. Evite transtornos.",
  "Com proteção a vida fica mais leve. Faça sua cotação.",
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
    <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-6xl">
      <span className="relative block w-full text-center">
        {/* invisible spacer keeps height for the tallest phrase */}
        <span aria-hidden className="invisible block">
          {phrases.reduce((a, b) => (a.length >= b.length ? a : b))}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            className="absolute inset-0 bg-gradient-to-r from-primary to-navy bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
