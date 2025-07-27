// ContactForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      if (step === 0) {
        setFormData({ ...formData, name: trimmedInput });
        setStep(1);
        setError(null);
      } else if (step === 1) {
        if (!validateEmail(trimmedInput)) {
          setError("❌ Invalid email address. Please try again.");
          return;
        }
        setFormData({ ...formData, email: trimmedInput });
        setStep(2);
        setError(null);
      } else if (step === 2) {
        setFormData({ ...formData, message: trimmedInput });
        handleSubmit();
      }
      setInput('');
    } else {
      if (step === 2) {
        setInput(e.currentTarget.value);
        setFormData({ ...formData, message: e.currentTarget.value });
      }
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message, // Ensure the message is included here
        to_name: "Reda",
      };

      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPrompt = () => {
    if (step === 0) return "👤 Enter your full name:";
    if (step === 1) return "📧 Enter your email:";
    if (step === 2) return "💬 Enter your message:";
    return "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative bg-black text-green-500 font-mono p-6 rounded-lg shadow-lg"
    >
      {/* Terminal header */}
      <div className="absolute top-0 left-0 w-full flex items-center gap-2 mb-4 p-2 rounded-t-md bg-white/25 backdrop-blur-lg">
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
      </div>
      <div className="space-y-4 my-4">
        <div className="whitespace-pre-wrap">
          <p className="text-sm md:text-lg font-bold text-blue-400">Welcome to Reda Trouki's Terminal!</p>
          <p className="text-xs md:text-base">Type your responses below and press Enter to proceed.</p>
          <p className="text-xs md:text-base italic text-gray-400">"Connecting with creativity..."</p>
          <p>------------------------------------</p>
          {step > 0 && <p><span className="text-blue-400">Name:</span> {formData.name}</p>}
          {step > 1 && <p><span className="text-blue-400">Email:</span> {formData.email}</p>}
          {step === 2 && <p><span className="text-blue-400">Message:</span> {formData.message}</p>}
        </div>

        {/* Success message */}
        {submitStatus === 'success' && (
          <motion.p
            className="text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ✅ Message sent successfully! 🎉 Thank you for reaching out. I'll get back to you soon.
          </motion.p>
        )}

        {/* Error message */}
        {submitStatus === 'error' && (
          <motion.p
            className="text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ❌ Failed to send message. Please try again. 😢
          </motion.p>
        )}

        {/* Input prompt */}
        {!submitStatus && (
          <div>
            <p className="text-sm md:text-lg text-yellow-400">{getPrompt()}</p>
            {step === 1 && error && (
              <motion.p
                className="text-red-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {error}
              </motion.p>
            )}
            <div className="flex items-center">
              <span className="pr-2">$</span>
              <input
                title='input prompt'
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInput}
                disabled={isSubmitting}
                className="w-full bg-black text-green-500 border-none outline-none caret-green-500"
                autoFocus
              />
              <span className="ml-2 animate-blink">|</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContactForm;
