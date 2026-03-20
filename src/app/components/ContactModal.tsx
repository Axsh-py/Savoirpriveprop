import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { submitContactForm, isApiConfigured } from '../services/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

export function ContactModal({ isOpen, onClose, propertyName }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log('📋 ContactModal Render - isOpen:', isOpen, 'propertyName:', propertyName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = { ...formData, propertyName };
    console.log('Form submitted:', submissionData);
    setIsSubmitted(true);
    
    // Only call API if configured
    if (!isApiConfigured()) {
      console.log('API not configured. Form data logged to console only.');
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 2000);
      return;
    }

    submitContactForm(submissionData)
      .then(() => {
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
          setFormData({ name: '', email: '', phone: '', message: '' });
        }, 2000);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        // Still show success to user even if API fails
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
          setFormData({ name: '', email: '', phone: '', message: '' });
        }, 2000);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative bg-[#0a0a0a] rounded-sm w-full max-w-md md:max-w-lg lg:max-w-2xl border border-[#C9A961]/30 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Gold Top Border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A961] to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300 z-10"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>

              {!isSubmitted ? (
                <div className="p-6 md:p-10 lg:p-14">
                  {/* Header */}
                  <div className="mb-8 md:mb-10">
                    <div className="h-px w-12 bg-[#C9A961] mb-4 md:mb-6" />
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-3 md:mb-4 tracking-tight font-extralight">
                      Property Inquiry
                    </h2>
                    <p className="text-white/50 text-xs md:text-sm tracking-wide">
                      Interested in <span className="text-[#C9A961]">{propertyName}</span>
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    {/* Name */}
                    <div className="relative">
                      <label className="block text-white/60 text-xs mb-2 md:mb-3 tracking-[0.2em] uppercase">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A961]" strokeWidth={1.5} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#C9A961] py-2.5 md:py-3 pl-7 md:pl-8 text-sm md:text-base text-white placeholder:text-white/30 focus:outline-none transition-colors duration-500 font-light"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label className="block text-white/60 text-xs mb-2 md:mb-3 tracking-[0.2em] uppercase">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A961]" strokeWidth={1.5} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#C9A961] py-2.5 md:py-3 pl-7 md:pl-8 text-sm md:text-base text-white placeholder:text-white/30 focus:outline-none transition-colors duration-500 font-light"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <label className="block text-white/60 text-xs mb-2 md:mb-3 tracking-[0.2em] uppercase">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A961]" strokeWidth={1.5} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#C9A961] py-2.5 md:py-3 pl-7 md:pl-8 text-sm md:text-base text-white placeholder:text-white/30 focus:outline-none transition-colors duration-500 font-light"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <label className="block text-white/60 text-xs mb-2 md:mb-3 tracking-[0.2em] uppercase">
                        Message (Optional)
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-0 top-4 w-4 h-4 text-[#C9A961]" strokeWidth={1.5} />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Tell us about your requirements..."
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#C9A961] py-2.5 md:py-3 pl-7 md:pl-8 text-sm md:text-base text-white placeholder:text-white/30 focus:outline-none transition-colors duration-500 resize-none font-light"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#C9A961] hover:bg-[#B8985A] text-black py-3.5 md:py-4 transition-all duration-500 flex items-center justify-center gap-2 md:gap-3 hover:gap-4 mt-8 md:mt-10 text-xs md:text-sm tracking-[0.2em] uppercase font-medium rounded-sm"
                    >
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </form>

                  {/* Privacy Note */}
                  <p className="text-white/30 text-xs text-center mt-6 md:mt-8 tracking-wide">
                    Your information is secure and confidential
                  </p>
                </div>
              ) : (
                /* Success Message */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 md:p-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8 rounded-full border-2 border-[#C9A961] flex items-center justify-center"
                  >
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-[#C9A961]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <div className="h-px w-12 bg-[#C9A961] mx-auto mb-4 md:mb-6" />
                  <h3 className="text-xl md:text-2xl text-white mb-2 md:mb-3 font-light tracking-tight">Thank You</h3>
                  <p className="text-white/50 text-xs md:text-sm tracking-wide">
                    We'll contact you shortly
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}