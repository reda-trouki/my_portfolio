import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-4 h-4" />,
      href: "https://github.com/reda-trouki",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      href: "https://linkedin.com/in/reda-trouki",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      href: "mailto:trouki.reda@gmail.com",
      label: "Email",
    },
  ];

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative mt-20">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand and Navigation */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Logo/Brand */}
            <motion.a
              href="#home"
              className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              RT
            </motion.a>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 transition-all group-hover:w-full" />
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/60 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
                aria-label={social.label}
              >
                {social.icon}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Reda Trouki.</span>
            <span className="hidden md:inline">•</span>
            <span>All rights reserved.</span>
          </div>
          
          <motion.a
            href="https://github.com/reda-trouki/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white/60 transition-colors mt-2 md:mt-0"
            whileHover={{ x: 2 }}
          >
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>by Reda Trouki</span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;