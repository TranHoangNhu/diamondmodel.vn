"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ lại sớm nhất.");
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 border border-cream-200 space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-xs text-dark-700/50 tracking-wider uppercase font-body mb-2">
          Tên của Bạn (*)
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border-b border-cream-300 bg-transparent py-2.5 text-sm font-body text-dark-800 focus:border-primary-400 focus:outline-none transition-colors"
          placeholder="Nhập tên của bạn"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-phone" className="block text-xs text-dark-700/50 tracking-wider uppercase font-body mb-2">
            Điện thoại
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border-b border-cream-300 bg-transparent py-2.5 text-sm font-body text-dark-800 focus:border-primary-400 focus:outline-none transition-colors"
            placeholder="Số điện thoại"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs text-dark-700/50 tracking-wider uppercase font-body mb-2">
            Email (*)
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border-b border-cream-300 bg-transparent py-2.5 text-sm font-body text-dark-800 focus:border-primary-400 focus:outline-none transition-colors"
            placeholder="Địa chỉ email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-xs text-dark-700/50 tracking-wider uppercase font-body mb-2">
          Tiêu Đề (*)
        </label>
        <input
          id="contact-subject"
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full border-b border-cream-300 bg-transparent py-2.5 text-sm font-body text-dark-800 focus:border-primary-400 focus:outline-none transition-colors"
          placeholder="Tiêu đề tin nhắn"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs text-dark-700/50 tracking-wider uppercase font-body mb-2">
          Nội Dung (*)
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full border-b border-cream-300 bg-transparent py-2.5 text-sm font-body text-dark-800 focus:border-primary-400 focus:outline-none transition-colors resize-none"
          placeholder="Nội dung tin nhắn"
        />
      </div>

      <p className="text-xs text-dark-700/30 font-body">
        Ghi chú: Chúng tôi cam kết bảo mật tuyệt đối thông tin của Bạn.
      </p>

      <button type="submit" className="btn-primary w-full">
        Gửi Ngay
      </button>
    </form>
  );
}
