import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"
import { Code2, Briefcase, GraduationCap, MapPin, Sparkles, Zap, Heart, Coffee, Calendar, Award, Target, Lightbulb, Brain, Rocket, Users, Star } from "lucide-react"

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();
  const [activeTab, setActiveTab] = useState('skills');
  const [typedText, setTypedText] = useState('');
  
  const fullText = "Crafting digital experiences that matter...";
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      // Typewriter effect
      let i = 0;
      const timer = setInterval(() => {
        setTypedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isInView, controls]);

  const details = [
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Experience",
      description: "Full-Stack Engineer",
      stat: "3+ Years",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Education",
      description: "Master's in Information Systems",
      stat: "In Progress",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      description: "Safi, Morocco",
      stat: "GMT+1",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Coffee className="w-5 h-5" />,
      title: "Coffee Consumed",
      description: "Fueling Innovation",
      stat: "∞ Cups",
      color: "from-orange-500 to-red-500"
    }
  ];

  const primarySkills = [
    { name: "React", icon: "⚛️", color: "from-blue-400 to-blue-600", level: 95 },
    { name: "Next.js", icon: "▲", color: "from-gray-600 to-gray-800", level: 90 },
    { name: "Spring Boot", icon: "☕", color: "from-green-500 to-green-700", level: 85 },
    { name: "Node.js", icon: "🟢", color: "from-green-400 to-green-600", level: 88 },
    { name: "TypeScript", icon: "📘", color: "from-blue-500 to-blue-700", level: 92 },
    { name: "React Native", icon: "📱", color: "from-cyan-400 to-cyan-600", level: 80 },
  ];

  const additionalSkills = [
    { name: "Python", icon: "🐍" },
    { name: "Laravel", icon: "🔺" },
    { name: "Angular", icon: "🅰️" },
    { name: "Vue.js", icon: "💚" },
    { name: "NestJS", icon: "🦅" },
    { name: "Docker", icon: "🐳" },
    { name: "MongoDB", icon: "🍃" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Express.js", icon: "⚡" },
    { name: "GraphQL", icon: "📊" },
    { name: "Redux", icon: "🔄" },
    { name: "Git", icon: "📂" }
  ];

  const timelineEvents = [
    {
      year: "2023-2025",
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Started Master's Journey",
      description: "Began pursuing Master's in Information Systems, diving deep into advanced software development concepts.",
      tech: [
        { name: "Advanced Algorithms", icon: "🧠" },
        { name: "System Design", icon: "🏗️" },
        { name: "Research", icon: "🔬" }
      ],
      color: "from-purple-500 to-blue-500"
    },
    {
      year: "2022-2023",
      icon: <Code2 className="w-5 h-5" />,
      title: "Full-Stack Evolution",
      description: "Mastered modern frameworks and expanded into mobile development with React Native.",
      tech: [
        { name: "Spring Boot", icon: "☕" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Docker", icon: "🐳" },
        { name: "Microservices", icon: "🔧" }
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      year: "2021-2022",
      icon: <Award className="w-5 h-5" />,
      title: "Professional Breakthrough",
      description: "Transitioned to professional development, building scalable applications for real-world impact.",
      tech: [
        { name: "React", icon: "⚛️" },
        { name: "Node.js", icon: "🟢" },
        { name: "React Native", icon: "📱" },
        { name: "TypeScript" , icon: "🚀"}
      ],
      color: "from-green-500 to-blue-500"
    },
    {
      year: "2020-2021",
      icon: <Lightbulb className="w-5 h-5" />,
      title: "The Beginning",
      description: "First lines of code written, sparked the passion for creating digital solutions.",
      tech: [
        { name: "JavaScript", icon: "🟨" },
        { name: "HTML/CSS", icon: "🌐" },
        { name: "Basic Frameworks", icon: "🏗️" }
      ],
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const motivations = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Complex Challenges",
      description: "Transforming impossible problems into elegant solutions",
      gradient: "from-red-500 to-pink-500",
      emoji: "🎯"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Optimization",
      description: "Making applications faster, smoother, and more efficient",
      gradient: "from-yellow-500 to-orange-500",
      emoji: "⚡"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technologies",
      gradient: "from-purple-500 to-blue-500",
      emoji: "✨"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Impact",
      description: "Creating solutions that make a real difference",
      gradient: "from-green-500 to-teal-500",
      emoji: "💚"
    }
  ];

  const interests = [
    { 
      name: "Problem Solving", 
      icon: "🧩", 
      description: "Love tackling complex challenges",
      gradient: "from-blue-500 to-purple-500"
    },
    { 
      name: "Open Source", 
      icon: "🌟", 
      description: "Contributing to community projects",
      gradient: "from-green-500 to-blue-500"
    },
    { 
      name: "Learning", 
      icon: "📚", 
      description: "Always exploring new technologies",
      gradient: "from-orange-500 to-pink-500"
    },
    { 
      name: "Innovation", 
      icon: "💡", 
      description: "Building the future, one app at a time",
      gradient: "from-yellow-500 to-red-500"
    }
  ];

  // Floating shapes configuration for dynamic background
  const floatingShapes = [
    {
      id: 1,
      shape: 'circle',
      size: 'w-20 h-20',
      gradient: 'from-blue-500/20 to-purple-500/20',
      position: { top: '10%', left: '5%' },
      animation: {
        x: [0, 30, -20, 0],
        y: [0, -25, 20, 0],
        rotate: [0, 120, 240, 360],
        scale: [1, 1.2, 0.8, 1]
      },
      duration: 20
    },
    {
      id: 2,
      shape: 'triangle',
      size: 'w-16 h-16',
      gradient: 'from-green-500/15 to-teal-500/15',
      position: { top: '20%', right: '10%' },
      animation: {
        x: [0, -40, 25, 0],
        y: [0, 30, -15, 0],
        rotate: [0, -90, 180, 0],
        scale: [1, 0.7, 1.3, 1]
      },
      duration: 25
    },
    {
      id: 3,
      shape: 'square',
      size: 'w-12 h-12',
      gradient: 'from-pink-500/20 to-red-500/20',
      position: { top: '60%', left: '8%' },
      animation: {
        x: [0, 20, -30, 0],
        y: [0, -20, 25, 0],
        rotate: [0, 180, 360, 0],
        scale: [1, 1.1, 0.9, 1]
      },
      duration: 18
    },
    {
      id: 4,
      shape: 'hexagon',
      size: 'w-24 h-24',
      gradient: 'from-yellow-500/15 to-orange-500/15',
      position: { bottom: '15%', right: '5%' },
      animation: {
        x: [0, -25, 35, 0],
        y: [0, 20, -30, 0],
        rotate: [0, 60, 180, 360],
        scale: [1, 0.8, 1.2, 1]
      },
      duration: 22
    },
    {
      id: 5,
      shape: 'circle',
      size: 'w-8 h-8',
      gradient: 'from-cyan-500/25 to-blue-500/25',
      position: { top: '45%', left: '15%' },
      animation: {
        x: [0, 15, -25, 0],
        y: [0, -30, 10, 0],
        rotate: [0, 270, 360, 0],
        scale: [1, 1.4, 0.6, 1]
      },
      duration: 16
    },
    {
      id: 6,
      shape: 'diamond',
      size: 'w-14 h-14',
      gradient: 'from-purple-500/20 to-pink-500/20',
      position: { top: '75%', right: '20%' },
      animation: {
        x: [0, 20, -15, 0],
        y: [0, -35, 25, 0],
        rotate: [0, 45, 180, 360],
        scale: [1, 0.9, 1.3, 1]
      },
      duration: 24
    },
    {
      id: 7,
      shape: 'circle',
      size: 'w-6 h-6',
      gradient: 'from-indigo-500/30 to-purple-500/30',
      position: { top: '30%', left: '70%' },
      animation: {
        x: [0, -20, 30, 0],
        y: [0, 25, -20, 0],
        rotate: [0, 180, 360, 0],
        scale: [1, 1.5, 0.5, 1]
      },
      duration: 14
    },
    {
      id: 8,
      shape: 'pentagon',
      size: 'w-18 h-18',
      gradient: 'from-emerald-500/15 to-green-500/15',
      position: { bottom: '40%', left: '80%' },
      animation: {
        x: [0, -30, 20, 0],
        y: [0, 15, -25, 0],
        rotate: [0, 72, 216, 360],
        scale: [1, 1.1, 0.8, 1]
      },
      duration: 26
    }
  ];

  // Helper function to render different shapes
  const renderShape = (shape: string, className: string) => {
    switch (shape) {
      case 'triangle':
        return <div className={`${className} clip-path-triangle`}></div>;
      case 'square':
        return <div className={`${className} rounded-lg`}></div>;
      case 'hexagon':
        return <div className={`${className} clip-path-hexagon`}></div>;
      case 'diamond':
        return <div className={`${className} rotate-45`}></div>;
      case 'pentagon':
        return <div className={`${className} clip-path-pentagon`}></div>;
      default:
        return <div className={`${className} rounded-full`}></div>;
    }
  };

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden min-h-screen">
      {/* Enhanced animated background with floating shapes */}
      <div className="absolute inset-0">
        {/* Base gradient backgrounds */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_400px_at_20%_70%,rgba(59,130,246,0.15),transparent)] sm:bg-[radial-gradient(circle_600px_at_20%_70%,rgba(59,130,246,0.15),transparent)] lg:bg-[radial-gradient(circle_800px_at_20%_70%,rgba(59,130,246,0.15),transparent)] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_300px_at_80%_30%,rgba(168,85,247,0.1),transparent)] sm:bg-[radial-gradient(circle_500px_at_80%_30%,rgba(168,85,247,0.1),transparent)] lg:bg-[radial-gradient(circle_600px_at_80%_30%,rgba(168,85,247,0.1),transparent)] animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:75px_75px] lg:bg-[size:100px_100px] opacity-20"></div>
        
        {/* Dynamic floating shapes */}
        {floatingShapes.map((shapeConfig) => (
          <motion.div
            key={shapeConfig.id}
            className={`absolute ${shapeConfig.size} hidden sm:block`}
            style={{
              top: shapeConfig.position.top,
              left: shapeConfig.position.left,
              right: shapeConfig.position.right,
              bottom: shapeConfig.position.bottom,
            }}
            animate={shapeConfig.animation}
            transition={{
              duration: shapeConfig.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shapeConfig.id * 0.5 // Stagger the animations
            }}
          >
            {renderShape(
              shapeConfig.shape,
              `w-full h-full bg-gradient-to-br ${shapeConfig.gradient} blur-xl opacity-60`
            )}
          </motion.div>
        ))}
        
        {/* Additional ambient floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, 25, -25, 0],
            y: [0, -15, 15, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, -20, 20, 0],
            y: [0, 20, -20, 0],
            scale: [1, 0.7, 1.3, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
        
        {/* Smaller particle-like shapes */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm hidden lg:block"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Larger decorative shapes with slower movement */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl hidden xl:block"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 clip-path-hexagon blur-3xl hidden xl:block"
          animate={{
            scale: [1, 0.8, 1.2, 1],
            rotate: [0, 60, 120, 180, 240, 300, 360],
            x: [0, 20, -20, 0],
            y: [0, -30, 30, 0]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Add custom CSS for clip paths */}
      <style jsx>{`
        .clip-path-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .clip-path-hexagon {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }
        .clip-path-pentagon {
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }
      `}</style>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header Section - Enhanced responsive design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="relative inline-block">
              <motion.div
                className="absolute -inset-3 sm:-inset-4 lg:-inset-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-20 blur-xl sm:blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-400" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  About Me
                </h2>
                <Zap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-400" />
              </div>
            </div>
            <motion.p 
              className="mt-6 sm:mt-8 text-lg sm:text-xl text-white/70 font-mono max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-blue-400"
              >
                |
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Enhanced Stats Cards - More responsive grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20"
          >
            {details.map((detail, index) => (
              <motion.div 
                key={index} 
                className="group relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20"
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  rotateY: 2
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <motion.div 
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${detail.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <div className="relative text-center sm:text-left">
                  <div className="text-blue-400 mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors flex justify-center sm:justify-start">
                    {detail.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white/90 mb-2">{detail.title}</h3>
                  <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors mb-3 leading-relaxed">
                    {detail.description}
                  </p>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                    {detail.stat}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Rest of the component remains the same... */}
          {/* Timeline Section - Responsive design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16 sm:mb-20"
          >
            <div className="text-center mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Developer Journey</h3>
              </div>
              <p className="text-white/60 max-w-2xl mx-auto px-4">
                A timeline of my growth, challenges overcome, and technologies mastered
              </p>
            </div>
            
            <div className="relative max-w-6xl mx-auto">
              {/* Timeline Line - Hidden on mobile, visible on larger screens */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-30"></div>
              
              <div className="space-y-8 sm:space-y-12 lg:space-y-16">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}
                  >
                    {/* Timeline Node - Responsive positioning */}
                    <div className={`lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center text-white shadow-2xl border-4 border-gray-900 mb-4 lg:mb-0`}>
                      {event.icon}
                    </div>
                    
                    {/* Event Content - Responsive layout */}
                    <motion.div 
                      className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                          <span className="text-sm sm:text-base font-mono text-blue-400 bg-blue-400/10 px-3 sm:px-5 py-2 sm:py-3 rounded-full text-center">
                            {event.year}
                          </span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">{event.title}</h4>
                        <p className="text-white/70 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">{event.description}</p>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {event.tech.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 bg-white/10 text-white/80 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                            >
                              <span className="text-base sm:text-lg">{tech.icon}</span>
                              <span>{tech.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* What Drives Me & What I'm Passionate About - Responsive grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-20">
            {/* What Drives Me */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white">What Drives Me</h3>
                </div>
                <p className="text-white/60 px-4">The core motivations behind my passion for development</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {motivations.map((motivation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${motivation.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3">
                        <span className="text-xl sm:text-2xl">{motivation.emoji}</span>
                        <div className="text-white">
                          {motivation.icon}
                        </div>
                      </div>
                      <h4 className="font-semibold text-white/90 mb-2 text-sm sm:text-base">{motivation.title}</h4>
                      <p className="text-xs sm:text-sm text-white/70 group-hover:text-white/90 transition-colors leading-relaxed">
                        {motivation.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* What I'm Passionate About */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white">What I'm Passionate About</h3>
                </div>
                <p className="text-white/60 px-4">The areas where I channel my energy and creativity</p>
              </div>
              <div className="relative">
                {/* Responsive floating elements */}
                <motion.div
                  className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-xl sm:blur-2xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360] 
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500/15 to-blue-500/15 rounded-full blur-xl sm:blur-2xl"
                  animate={{ 
                    scale: [1, 0.7, 1],
                    rotate: [360, 180, 0] 
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative z-10">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ 
                        scale: 1.02,
                        y: -5,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                      className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg"
                      style={{ perspective: '1000px' }}
                    >
                      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${interest.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      <div className="relative">
                        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                          {interest.icon}
                        </div>
                        <h4 className="font-semibold text-white/90 mb-2 group-hover:text-white transition-colors text-sm sm:text-base">
                          {interest.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">
                          {interest.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skills Showcase - Enhanced responsive design */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12 sm:mb-16"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Technical Expertise</h3>
              <p className="text-white/60 max-w-2xl mx-auto px-4">
                Technologies and tools I use to bring ideas to life
              </p>
            </div>

            {/* Tab Navigation - Responsive */}
            <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 sm:p-2 bg-white/5 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 max-w-xs sm:max-w-md mx-auto">
              {[
                { id: 'skills', label: 'Skills', icon: '⚡' },
                { id: 'tools', label: 'Tools', icon: '🛠️' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden xs:inline">{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Skills Content - Responsive */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl sm:rounded-3xl filter blur-2xl sm:blur-3xl"></div>
              
              {activeTab === 'skills' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10 space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl"
                >
                  <div>
                    <h3 className="text-white/90 text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                      <span className="text-2xl sm:text-3xl">🎯</span>
                      <span>Primary Expertise</span>
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      {primarySkills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="group relative"
                        >
                          <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <div className="flex items-center gap-2 sm:gap-4">
                              <span className="text-2xl sm:text-3xl">
                                {skill.icon}
                              </span>
                              <span className="font-medium text-white/90 text-base sm:text-lg">{skill.name}</span>
                            </div>
                            <span className="text-white/70 font-mono text-sm sm:text-base">{skill.level}%</span>
                          </div>
                          <div className="relative h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full shadow-lg`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                            />
                            <motion.div
                              className="absolute top-0 left-0 h-full bg-white/20 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'tools' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10 p-4 sm:p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl"
                >
                  <h3 className="text-white/90 text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl">🛠️</span>
                    <span>Development Tools & Technologies</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {additionalSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * index }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-center group shadow-lg"
                      >
                        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">
                          {skill.icon}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                          {skill.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Enhanced CTA Button - Responsive */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center px-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold text-sm sm:text-base lg:text-lg overflow-hidden shadow-2xl shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative text-center sm:text-left">Let's Create Something Amazing Together</span>
              <span className="relative text-xl sm:text-2xl">🚀</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About