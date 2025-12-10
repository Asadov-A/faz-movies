import React, { useState } from "react";
import './Contact.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

function Contact() {
  const botToken = '8228668837:AAGjkD18_0GLFNw3ALlBWpNW2fuWxEp5Fo8';
  const chatId = 5570929303;

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMes, setUserMes] = useState("");

  const contactSend = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !userEmail.trim() || !userMes.trim()) {
      toast.error("Please fill in all fields!", { duration: 2000 });
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const message = `📨 *New message from a user*\n\n👤 *Name:* ${userName}\n✉️ *Email:* ${userEmail}\n💬 *Message:* ${userMes}\n\n🕒 *Sent at:* ${timeString}`;

    try {
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (res.ok) {
        toast.success("Thank you for your message, we will contact you soon!", { duration: 2000 });
        setUserName("");
        setUserEmail("");
        setUserMes("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred, please try again later.", { duration: 2000 });
    }
  };

  return (
    <>
    <Toaster className="toaster" position="top-right" />
    <div className="contact-page">
      <div className="contact-overlay"></div>

      <div className="contact-content">
        <h1>Contact Us</h1>
        <p className="subtitle">Faz Movies Support</p>

        <form onSubmit={contactSend} className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            value={userMes}
            onChange={(e) => setUserMes(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>

        <div className="contact-socials">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>
    </div>
    </>
  );
}

export default Contact;
