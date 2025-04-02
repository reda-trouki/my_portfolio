import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, FolderGit2, Mail } from "lucide-react";
import Lottie from 'lottie-react'
import DeveloperAnimation from '../assets/animations/developer.json'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Mobile menu state is only used in the floating dock which is handled by CSS
  const [activeTab, setActiveTab] = useState("home");

  // Handle scroll effect with improved section detection
  useEffect(() => {
    // Debounce function to prevent too many updates
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      // Update header background based on scroll position
      setIsScrolled(window.scrollY > 50);

      // Clear timeout if it exists
      if (scrollTimeout) clearTimeout(scrollTimeout);

      // Set a small timeout to debounce the section detection
      scrollTimeout = setTimeout(() => {
        // Get all sections
        const sections = ["home", "about", "projects", "contact"];

        // Calculate the viewport height
        const viewportHeight = window.innerHeight;

        // Track which section has the most visibility
        let maxVisibleSection = "";
        let maxVisiblePercentage = 0;

        // Check each section
        sections.forEach(sectionId => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();

            // Calculate how much of the section is visible in the viewport
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(viewportHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            // Calculate what percentage of the viewport this section occupies
            const visiblePercentage = visibleHeight / viewportHeight;

            // Special case for the home section (give it priority when at the top)
            const isHome = sectionId === "home";
            const homeBonus = isHome && rect.top <= 0 ? 0.2 : 0;

            // Special case for the last section (contact) - give it priority when scrolled to bottom
            const isContact = sectionId === "contact";
            const contactBonus = isContact && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 ? 0.5 : 0;

            // Apply bonuses to the visible percentage
            const adjustedPercentage = visiblePercentage + homeBonus + contactBonus;

            // Update the max visible section if this one has more visibility
            if (adjustedPercentage > maxVisiblePercentage) {
              maxVisiblePercentage = adjustedPercentage;
              maxVisibleSection = sectionId;
            }
          }
        });

        // Only update the active tab if we found a section with some visibility
        if (maxVisibleSection && maxVisiblePercentage > 0.1) {
          setActiveTab(maxVisibleSection);
        }
      }, 50); // 50ms debounce
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Improved smooth scroll handler with better offset calculation
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Adjust offset based on section and device
      let offset = 100; // Default offset

      // Special case for home section
      if (id === "home") {
        offset = 0; // No offset for home section
      }

      // Special case for mobile devices
      if (window.innerWidth < 768) {
        offset = id === "home" ? 0 : 80; // Smaller offset on mobile
      }

      // Calculate position with offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Smooth scroll to position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Update active tab
      setActiveTab(id);
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
        className={`fixed w-full z-[9998] transition-all duration-300 md:block hidden ${isScrolled ? "backdrop-blur-md py-4" : "bg-transparent py-6"
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
                className={`relative p-3 group transition-all duration-300 ${activeTab === item.id
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
