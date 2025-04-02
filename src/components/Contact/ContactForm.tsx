// ContactForm.jsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Loader2, User, Mail, MessageCircleMore } from "lucide-react";
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import FormField from './FormField';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const [submitStatus, setSubmitStatus] = React.useState<'success' | 'error' | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const templateParams = {
        name: data.name,
        email: data.email,
        message: data.message,
        to_name: "Reda",
      };

      // Initialize EmailJS with your public key
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Card className="bg-gray-900/40 backdrop-blur-2xl border border-gray-700/30 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-8 space-y-8">
          {/* Form header */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Send a Message
            </h3>
            <p className="text-gray-400">I'll get back to you as soon as possible.</p>
          </div>

          {/* Form fields */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <FormField 
                id="name"
                label="Name"
                icon={<User className="w-6 h-6" />}
                placeholder="Your name"
                error={errors.name?.message}
                inputProps={{
                  ...register('name', { 
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })
                }}
              />

              <FormField 
                id="email"
                label="Email"
                type="email"
                icon={<Mail className="w-6 h-6" />}
                placeholder="Your email"
                error={errors.email?.message}
                inputProps={{
                  ...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })
                }}
              />

              <FormField 
                id="message"
                label="Message"
                icon={<MessageCircleMore className="w-6 h-6" />}
                placeholder="Tell me about your project..."
                isTextarea={true}
                error={errors.message?.message}
                inputProps={{
                  ...register('message', { 
                    required: 'Message is required',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    maxLength: { value: 1000, message: 'Message must be less than 1000 characters' }
                  })
                }}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </>
              )}
            </Button>

            {submitStatus === 'success' && (
              <motion.p 
                className="text-green-500 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Message sent successfully!
              </motion.p>
            )}
            {submitStatus === 'error' && (
              <motion.p 
                className="text-red-500 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Failed to send message. Please try again.
              </motion.p>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
