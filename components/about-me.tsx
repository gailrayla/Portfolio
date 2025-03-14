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
        I&apos;m a freshly double-degreed (
        <span className="font-medium">CSE & Design!</span>) developer, and
        I&apos;m itching to build some awesome stuff for the web! My adventure
        has been a wild ride – I&apos;ve gone from VR touch-typing labs to
        designing websites, and even survived (and thrived!) in a tiny startup.
        I <span className="italic">love</span> blending tech and design to bring
        cool ideas to life. My core stack? I&apos;m all about{" "}
        <span className="font-medium">
          TypeScript, React, Next.js, Node.js, and GCP
        </span>
        . Plus, I dabble in PostgreSQL, GraphQL, and MongoDB. I&apos;m always up
        for learning new tricks! I&apos;m looking for a{" "}
        <span className="font-medium">full-time position</span> where I can keep
        growing and creating.
      </p>

      <p>
        <span className="italic">When I&apos;m not coding</span>, you&apos;ll
        find me hanging with my dogs (Marla&apos;s my fave!), snapping film
        photos, exploring new places, or strumming my ukulele (badly, but
        enthusiastically!). I also enjoy{" "}
        <span className="font-medium">learning new things</span>. Recently,
        I&apos;ve started picking up on playing the ukulele, and exploring{" "}
        <span className="font-medium">new travel destinations</span>.
      </p>
    </motion.section>
  );
}
