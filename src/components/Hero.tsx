import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import {
  Code,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Twitter,
  MailCheck,
} from "lucide-react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const words = [
  { text: "Full-Stack", className: "text-blue-400" },
  { text: "Engineer", className: "font-bold" },
  { text: " | ", className: "text-gray-500" },
  { text: "Mobile", className: "text-amber-400" },
  { text: "Developer", className: "font-bold" },
  { text: ".", className: "" }
];

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-5">
      {/* Background grid effect */}
      {/* <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] opacity-20 z-0"></div>
       */}
      {/* Social Links - Fixed on left side (hidden on very small screens) */}
       <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="hidden sm:flex absolute left-4 md:left-10 top-1/2 -translate-y-1/2 flex-col gap-5 z-50"
    >
      {[
        { icon: <Github className="h-5 w-5" />, href: "https://github.com/reda-trouki" },
        { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/reda-trouki" },
        { icon: <MailCheck className="h-5 w-5" />, href: "mailto:trouki.reda@gmail.com" },
      ].map((social, index) => (
        <a 
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer" 
          className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:translate-x-1 transition-all"
          aria-label="Social media link"
        >
          {social.icon}
        </a>
      ))}
      <div className="h-20 w-[1px] bg-gradient-to-b from-white/20 to-transparent mx-auto mt-2"></div>
    </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-28 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="inline-flex items-center text-xs sm:text-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for work
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Reda Trouki
            </span>
          </motion.h1>

          {/* Typewriter effect */}
          <div className="mb-4 sm:mb-6 flex items-center justify-center">
            <Code className="block md:hidden mr-2 h-4 sm:h-5 w-4 sm:w-5 text-blue-400" />
            <div className="overflow-hidden max-w-full">
              <TypewriterEffect words={words} />
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl px-2"
          >
            I engineer full-stack web and mobile apps that balance speed, functionality, and delight—from API design to pixel-perfect UIs.
          </motion.p>

          {/* Social Media - Mobile only (horizontal) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="sm:hidden flex items-center justify-center gap-4 mt-6"
          >
            {[
              { icon: <Github className="h-5 w-5" />, href: "https://github.com/yourusername" },
              { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/yourusername" },
              { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/yourusername" },
            ].map((social, index) => (
              <a 
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer" 
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                aria-label="Social media link"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto px-4 sm:px-0"
          >
            <a
              href="/files/reda-trouki_en.pdf"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-base font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              View My Resume
            </a>
            <a
              href="#contact"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-transparent border border-white/20 text-white text-sm sm:text-base hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              Contact Me
            </a>
          </motion.div>
          
          {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute -bottom-8 md:bottom-4  left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <p className="text-[10px] sm:text-xs text-white/50 mb-2">Scroll to explore</p>
          
          {/* Mouse icon */}
          <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-white/30 flex justify-center pt-1.5 sm:pt-2">
            <motion.div
              animate={{ 
                y: [0, 6, 0],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="w-1 h-1.5 sm:w-1.5 sm:h-2 bg-white/60 rounded-full"
            />
          </div>
        </motion.div>
        </div>
      </div>
      
      {/* Gradient orbs for visual effect */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_5%_90%,rgba(59,130,246,0.3),transparent)]"></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_95%_20%,rgba(168,85,247,0.3),transparent)]"></div>
    </section>
  );
}