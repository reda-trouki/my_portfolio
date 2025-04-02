import { useRef } from 'react'
import { motion, useInView } from "framer-motion"
import { Code2, Briefcase, GraduationCap, MapPin } from "lucide-react"

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const details = [
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Experience",
      description: "Full-Stack Engineer"
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Education",
      description: "Master's in Software Development"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      description: "Safi, Morocco"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Enhanced Background effects */}
      {/* <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] opacity-20 z-0"></div> */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_20%_70%,rgba(59,130,246,0.15),transparent)]"></div>
      {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_80%_30%,rgba(168,85,247,0.15),transparent)]"></div> */}
      
      {/* Floating particles decoration */}
      <div className="absolute top-20 left-10 w-10 h-10 rounded-full border border-white/10 animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-6 h-6 rounded-full border border-white/10 animate-float-medium"></div>
      <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full border border-white/10 animate-float-fast"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between gap-12"
        >
          {/* Left content area */}
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center mb-6"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-75 blur-sm"></div>
                <Code2 className="relative h-6 w-6 text-blue-400" />
              </div>
              <h2 className="ml-2 text-4xl font-bold relative bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                About Me
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></span>
              </h2>
            </motion.div>

            {/* Quick Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {details.map((detail, index) => (
                <motion.div 
                  key={index} 
                  className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">{detail.icon}</div>
                  <h3 className="text-sm font-medium text-white/80">{detail.title}</h3>
                  <p className="text-xs text-white/60 group-hover:text-white/70 transition-colors">{detail.description}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="relative p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <p className="relative text-lg text-white/80 leading-relaxed">
                  <span className="text-blue-400 font-semibold">Full-Stack Engineer</span> and{" "}
                  <span className="text-purple-400 font-semibold">Mobile Developer</span> from Morocco, 
                  currently pursuing a Master's degree in Software Development. With expertise in{" "}
                  <span className="text-blue-300">React</span>,{" "}
                  <span className="text-blue-300">React Native</span>,{" "}
                  <span className="text-green-300">Node.js</span>, and{" "}
                  <span className="text-red-300">NestJS</span>, I specialize in building scalable, 
                  high-performance applications with seamless user experiences and robust backend architectures.
                </p>
              </div>

              <div className="relative p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <p className="relative text-lg text-white/80 leading-relaxed">
                  I enjoy{" "}
                  <span className="text-purple-400 font-semibold">solving complex problems</span>,{" "}
                  <span className="text-blue-400 font-semibold">optimizing performance</span>, and{" "}
                  <span className="text-green-400 font-semibold">bringing ideas to life</span>{" "}
                  through clean, maintainable code. Whether it's developing web applications, 
                  mobile apps, or backend systems, I'm always eager to explore new technologies 
                  and push the boundaries of what's possible.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-4 mt-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">Let's build something amazing together!</span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                    delay: 0.2
                  }}
                  className="relative text-xl"
                >
                  🚀
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
          
          {/* Right Skills Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="w-full max-w-md relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl filter blur-3xl opacity-30 animate-pulse"></div>
              
              {/* Primary Skills */}
              <div className="mb-8">
                <h3 className="text-white/80 text-sm font-medium mb-4">Primary Skills</h3>
                <div className="relative z-10 grid grid-cols-3 gap-4">
                  {[
                    { name: "React", icon: "⚛️", color: "from-blue-400 to-blue-600" },
                    { name: "Next.js", icon: "▲", color: "from-gray-600 to-gray-800" },
                    { name: "Spring Boot", icon: "☕", color: "from-green-500 to-green-700" },
                    { name: "Node.js", icon: "🟢", color: "from-green-400 to-green-600" },
                    { name: "TypeScript", icon: "📘", color: "from-blue-500 to-blue-700" },
                    { name: "React Native", icon: "📱", color: "from-cyan-400 to-cyan-600" },
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="group relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur`}></div>
                      <div className="relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                        <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform">
                          {skill.icon}
                        </div>
                        <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                          {skill.name}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Skills */}
              <div>
                <h3 className="text-white/80 text-sm font-medium mb-4">Additional Skills</h3>
                <div className="relative z-10 grid grid-cols-4 gap-3">
                  {[
                    { name: "Python", icon: "🐍" },
                    { name: "Laravel", icon: "🎯" },
                    { name: "Angular", icon: "🅰️" },
                    { name: "Vue.js", icon: "💚" },
                    { name: "NestJS", icon: "🔺" },
                    { name: "Docker", icon: "🐳" },
                    { name: "MongoDB", icon: "🍃" },
                    { name: "PostgreSQL", icon: "🐘" },
                    { name: "Express.js", icon: "🚂" },
                    { name: "GraphQL", icon: "📊" },
                    { name: "Redux", icon: "🔄" },
                    { name: "Git", icon: "📦" },
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-center"
                    >
                      <div className="text-xl mb-1">{skill.icon}</div>
                      <div className="text-xs text-white/70">{skill.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      
    </section>
  )
}

export default About
