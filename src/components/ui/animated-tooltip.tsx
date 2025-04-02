"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AnimatedTooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-md rounded text-sm whitespace-nowrap"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};