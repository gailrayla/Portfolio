"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function AboutMe() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>
      <p className="mb-3">
        I studied computer science and design in South Korea, and I&apos;ve been
        building for the web ever since. I&apos;ve worked on everything from VR
        touch-typing research to website design to scrappy startup life, and all
        of it taught me that I&apos;m happiest when I&apos;m somewhere between
        code and craft. I work mostly with{" "}
        <span className="font-medium">
          TypeScript, React, Angular, Next.js, and Node.js
        </span>
        , with more tools mixed in depending on the project. I like picking up
        new ones as I go.
      </p>

      <p>
        <span className="italic">Outside of work</span>, I take film photos,
        travel when I can, and I&apos;m currently trying to learn ukulele. I
        also have dogs. Marla&apos;s the favorite, but don&apos;t tell the
        others.
      </p>
    </motion.section>
  );
}
