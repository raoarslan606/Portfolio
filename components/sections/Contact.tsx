"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, Link2, GitBranch, CheckCircle, AlertCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { socialLinks } from "@/data/experience";

type FormStatus = "idle" | "submitting" | "success" | "error";

const iconMap: Record<string, React.ReactNode> = {
  Mail: <Mail size={18} />,
  Phone: <Phone size={18} />,
  Linkedin: <Link2 size={18} />,
  Github: <GitBranch size={18} />,
};

/**
 * Contact section — animated form with EmailJS integration + social links.
 * Set NEXT_PUBLIC_EMAILJS_* env vars to enable email sending.
 */
export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // EmailJS integration — configure via .env.local
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const { default: emailjs } = await import("@emailjs/browser");
        await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);
      } else {
        // Fallback: open mailto link
        window.location.href = `mailto:raoarslan606@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section section--alt" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHeading
          id="contact-heading"
          eyebrow="Get In Touch"
          title="Let's Work Together"
          subtitle="Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you within 24 hours."
          align="center"
        />

        <div className="contact__layout">
          {/* Left — contact info */}
          <RevealOnScroll direction="left" delay={0.1}>
            <div className="contact__info">
              <h3 className="contact__info-title">Direct Contact</h3>
              <ul className="contact__links" aria-label="Contact links">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target={link.name === "Email" || link.name === "Phone" ? undefined : "_blank"}
                      rel={link.name === "Email" || link.name === "Phone" ? undefined : "noopener noreferrer"}
                      className="contact__link"
                      aria-label={link.name}
                    >
                      <span className="contact__link-icon" aria-hidden="true">
                        {iconMap[link.icon]}
                      </span>
                      <span className="contact__link-text">
                        {link.name === "Email" && "raoarslan606@gmail.com"}
                        {link.name === "Phone" && "+92 300 123 4567"}
                        {link.name === "LinkedIn" && "linkedin.com/in/raoarslan606"}
                        {link.name === "GitHub" && "github.com/raoarslan606"}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Availability tag */}
              <div className="contact__availability" aria-label="Availability status">
                <span className="contact__availability-dot" aria-hidden="true" />
                Currently available for new opportunities
              </div>
            </div>
          </RevealOnScroll>

          {/* Right — form */}
          <RevealOnScroll direction="right" delay={0.2}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact__form"
              noValidate
              aria-label="Contact form"
            >
              <div className="contact__form-group">
                <label htmlFor="contact-name" className="contact__label">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact__input"
                  placeholder="John Doe"
                  required
                  minLength={2}
                  aria-required="true"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="contact-email" className="contact__label">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact__input"
                  placeholder="john@example.com"
                  required
                  aria-required="true"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="contact-message" className="contact__label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="contact__textarea"
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  minLength={10}
                  aria-required="true"
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <motion.div
                  className="contact__status contact__status--success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  <CheckCircle size={18} aria-hidden="true" />
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  className="contact__status contact__status--error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  <AlertCircle size={18} aria-hidden="true" />
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="btn btn--accent btn--lg contact__submit"
                disabled={status === "submitting"}
                aria-label="Send message"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "submitting" ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send size={16} aria-hidden="true" />
                  </>
                )}
              </motion.button>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
