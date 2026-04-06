"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Check, AlertCircle, ChevronDown } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ContactFormProps {
  dict: Dictionary;
}

const inputClass = "w-full px-4 py-3 bg-[#111] border border-border text-foreground text-sm placeholder:text-[#555] focus:outline-none focus:border-accent/50 transition-colors rounded";

export function ContactForm({ dict }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "+373 ",
    service: "",
    message: "",
    _honey: "",
  });

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServiceOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = dict.contact.form.name;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      newErrors.phone = dict.contact.form.phone;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._honey) return;
    if (!validate()) return;

    setStatus("success");
    setTimeout(() => setStatus("idle"), 5000);
    setFormData({ name: "", phone: "+373 ", service: "", message: "", _honey: "" });
    setErrors({});
  };

  const handlePhoneChange = (value: string) => {
    // Ensure +373 prefix is always present
    if (!value.startsWith("+373")) {
      value = "+373 " + value.replace(/^\+?3?7?3?\s?/, "");
    }
    setFormData({ ...formData, phone: value });
    if (errors.phone) setErrors({ ...errors, phone: "" });
  };

  const services = [
    dict.services.autoInterior.title,
    dict.services.furniture.title,
    dict.services.clothing.title,
    dict.services.footwear.title,
    dict.services.accessories.title,
    dict.services.cleaning.title,
  ];

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-14 h-14 border border-accent/30 flex items-center justify-center mb-4">
          <Check className="w-6 h-6 text-accent" />
        </div>
        <p className="text-sm font-light text-foreground leading-relaxed max-w-xs">
          {dict.contact.form.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <input type="text" name="_honey" value={formData._honey} onChange={(e) => setFormData({ ...formData, _honey: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2">{dict.contact.form.name} *</label>
        <input
          type="text"
          id="name"
          required
          minLength={2}
          value={formData.name}
          onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: "" }); }}
          className={`${inputClass} ${errors.name ? "border-red-500/50" : ""}`}
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name} *</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2">{dict.contact.form.phone} *</label>
        <input
          type="tel"
          id="phone"
          required
          value={formData.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          className={`${inputClass} ${errors.phone ? "border-red-500/50" : ""}`}
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone} *</p>}
      </div>

      {/* Service — custom styled dropdown */}
      <div>
        <label className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2">{dict.contact.form.service}</label>
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsServiceOpen(!isServiceOpen)}
            className={`${inputClass} text-left flex items-center justify-between cursor-pointer ${formData.service ? "text-foreground" : "text-[#555]"}`}
          >
            <span>{formData.service || dict.contact.form.selectService}</span>
            <ChevronDown className={`w-4 h-4 text-muted shrink-0 transition-transform duration-200 ${isServiceOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown options */}
          <div className={`absolute top-full left-0 right-0 mt-1 bg-[#111] border border-border shadow-2xl shadow-black/40 z-30 overflow-hidden transition-all duration-300 ease-out origin-top ${isServiceOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"}`}>
            {services.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setFormData({ ...formData, service: s }); setIsServiceOpen(false); }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 cursor-pointer ${formData.service === s ? "text-accent bg-surface-hover" : "text-muted hover:text-accent hover:bg-surface-hover"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-[11px] tracking-[0.15em] uppercase text-muted mb-2">{dict.contact.form.message}</label>
        <textarea id="message" rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={dict.contact.form.messagePlaceholder} className={`${inputClass} resize-none`} />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 text-xs"><AlertCircle className="w-3.5 h-3.5" />{dict.contact.form.error}</div>
      )}

      <button type="submit" className="w-full flex items-center justify-center gap-3 bg-accent text-accent-foreground py-3.5 text-xs tracking-[0.15em] uppercase font-medium hover:bg-accent-hover transition-all duration-300 cursor-pointer group rounded">
        {dict.contact.form.submit}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
