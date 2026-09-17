"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, Link2, GitBranch, CheckCircle, AlertCircle, Send } from "lucide-react";
import { socialLinks } from "@/data/experience";

type FormStatus = "idle" | "submitting" | "success" | "error";

const iconMap: Record<string, React.ReactNode> = {
  Mail: <Mail size={18} />,
  Phone: <Phone size={18} />,
  Linkedin: <Link2 size={18} />,
  Github: <GitBranch size={18} />,
};

/**
 * Editorial Studio Contact & Consultation Banner (Wolfpixel Style)
 * Matching Reference Screenshot 5:
 * - High-impact dark consultation banner with background artwork
 * - "(Book Your Free Consultation Now!)" tag
 * - "Let's talk ↗" action
 * - Direct contact cards (Phone: +92 307 1417820, Email: marslanrasheed73@gmail.com)
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
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const { default: emailjs } = await import("@emailjs/browser");
        await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);
      } else {
        window.location.href = `mailto:marslanrasheed73@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="studio-contact" aria-labelledby="contact-heading">
      <div className="studio-container">
        {/* Dark Consultation Banner (Exact Replica of Reference Screenshot 5) */}
        <motion.div
          className="studio-consultation-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Dark Background Artwork */}
          <div className="studio-consultation-banner__bg">
            <Image
              src="/images/consultation-banner.jpg"
              alt="Consultation banner"
              fill
              className="object-cover opacity-35 filter brightness-90"
            />
            <div className="studio-consultation-banner__overlay" />
          </div>

          {/* Banner Content */}
          <div className="studio-consultation-banner__content">
            <span className="studio-consultation-banner__tag">
              (Book Your Free Consultation Now!)
            </span>
            <h2 id="contact-heading" className="studio-consultation-banner__title">
              Have a Project in Mind? Get a Free Consultation!
            </h2>
            <p className="studio-consultation-banner__desc">
              Take advantage of this opportunity to discuss your full-stack engineering, Web3 platform,
              or SaaS architecture directly with an experienced developer.
            </p>
            <a
              href="mailto:marslanrasheed73@gmail.com?subject=Free%20Consultation%20Inquiry"
              className="studio-consultation-banner__btn"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </motion.div>

        {/* Contact Section Header */}
        <div className="studio-section-header">
          <div>
            <div className="studio-eyebrow">
              <span className="studio-eyebrow__dot" />
              <span>Reach Out Directly</span>
            </div>
            <h2 className="studio-section-title">Let&apos;s Start a Conversation</h2>
          </div>
          <p className="studio-contact__header-desc">
            Whether you need full-stack development, smart contract integrations, or architecture consultation,
            feel free to call, email, or send a message directly.
          </p>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="studio-contact__grid">
          {/* Left: Direct Contact Information Card */}
          <div className="studio-contact__card">
            <div className="studio-contact__card-header">
              <h3 className="studio-contact__card-title">Direct Channels</h3>
              <span className="studio-contact__card-subtitle">
                Available for project inquiries &amp; consultation
              </span>
            </div>

            <div className="studio-contact__links" role="list">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.name === "Email" || link.name === "Phone" ? undefined : "_blank"}
                  rel={link.name === "Email" || link.name === "Phone" ? undefined : "noopener noreferrer"}
                  className="studio-contact__link-item"
                  role="listitem"
                >
                  <div className="studio-contact__link-left">
                    <span className="studio-contact__link-icon" aria-hidden="true">
                      {iconMap[link.icon]}
                    </span>
                    <div>
                      <div className="studio-contact__link-name">{link.name}</div>
                      <div className="studio-contact__link-val">
                        {link.name === "Email" && "marslanrasheed73@gmail.com"}
                        {link.name === "Phone" && "+92 307 1417820"}
                        {link.name === "LinkedIn" && "linkedin.com/in/raoarslan606"}
                        {link.name === "GitHub" && "github.com/raoarslan606"}
                      </div>
                    </div>
                  </div>
                  <span className="studio-contact__link-arrow" aria-hidden="true">
                    <ArrowUpRight size={17} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Clean Studio Message Form */}
          <div className="studio-contact__form-wrap">
            <form ref={formRef} onSubmit={handleSubmit} className="studio-form" noValidate>
              <div className="studio-form__group">
                <label htmlFor="name" className="studio-form__label">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="studio-form__input"
                />
              </div>

              <div className="studio-form__group">
                <label htmlFor="email" className="studio-form__label">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="studio-form__input"
                />
              </div>

              <div className="studio-form__group">
                <label htmlFor="message" className="studio-form__label">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className="studio-form__textarea"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="studio-btn studio-btn--dark w-full justify-center"
              >
                {status === "submitting" ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="studio-form__alert studio-form__alert--success" role="status">
                  <CheckCircle size={18} />
                  <span>Thank you! Your message was sent successfully.</span>
                </div>
              )}

              {status === "error" && (
                <div className="studio-form__alert studio-form__alert--error" role="alert">
                  <AlertCircle size={18} />
                  <span>Something went wrong. Please email directly at marslanrasheed73@gmail.com</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
