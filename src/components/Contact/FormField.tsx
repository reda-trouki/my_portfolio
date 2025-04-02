// FormField.jsx
import React from 'react';
import {motion} from 'framer-motion'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
  isTextarea?: boolean;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  isTextarea = false,
  error,
  inputProps
}: FormFieldProps) => {
  return (
    <div className="group relative">
      <Label 
        htmlFor={id} 
        className="text-white/80 text-sm font-medium block mb-2 transition-colors group-focus-within:text-blue-400"
      >
        {label}
      </Label>
      <div className="relative">
        {isTextarea ? (
          <Textarea
            id={id}
            name={id}
            placeholder={placeholder}
            className={`bg-gray-800/30 border-gray-700/30 text-white placeholder-gray-400/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl p-4 pl-10 min-h-[150px] transition-all duration-300 hover:bg-gray-800/40 ${error ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
            {...inputProps}
          />
        ) : (
          <Input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            className={`bg-gray-800/30 border-gray-700/30 text-white placeholder-gray-400/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl h-12 pl-10 pr-4 transition-all duration-300 hover:bg-gray-800/40 ${error ? 'border-red-500' : ''}`}
            {...inputProps}
          />
        )}
        <div className={`absolute left-3 top-1/2 ${isTextarea ? 'top-1/5' : ''} -translate-y-1/2 text-gray-400`}>
          {icon}
        </div>
      </div>
      {error && (
        <motion.p
          className="text-red-500 text-sm mt-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FormField;