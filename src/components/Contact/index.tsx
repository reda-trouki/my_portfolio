import React from 'react';
import { motion } from 'framer-motion';
import Globe from './Globe';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative min-h-screen flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        >
          Let's Connect
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full flex items-center justify-center">
            <Globe />
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
