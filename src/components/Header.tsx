import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, FolderGit2, Mail, Menu, X } from "lucide-react";
import Lottie from 'lottie-react'
import DeveloperAnimation from '../assets/animations/developer.json'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Get all sections
      const sections = ["home", "about", "projects", "contact"];
      
      // Find which section is currently in view
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Add some buffer (100px) to make the detection feel more natural
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveTab(current);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setActiveTab(id);
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`fixed w-full z-[9998] transition-all duration-300 md:block hidden ${
          isScrolled ? "backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            <Lottie animationData={DeveloperAnimation} className="w-8 h-8 mr-2" loop={true} autoplay={true} />
            Reda Trouki
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleSmoothScroll(e, item.id)}
                className={`text-white/80 flex items-center gap-2 hover:text-white transition-colors relative group cursor-pointer
                  ${activeTab === item.id ? 'text-white' : ''}
                `}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
                <span 
                  className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300
                    ${activeTab === item.id ? 'w-full' : 'w-0 group-hover:w-full'}
                  `} 
                />
              </motion.a>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Floating Dock */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-black/70 backdrop-blur-lg rounded-full p-2 shadow-lg shadow-black/20 border border-white/10"
      >
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleSmoothScroll(e, item.id)}
                className={`relative p-3 group transition-all duration-300 ${
                  activeTab === item.id 
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white" 
                    : "text-white/60 hover:text-white/90"
                } rounded-full`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                {activeTab === item.id && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.label}
                </span>
              </motion.a>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
};

export default Header;
