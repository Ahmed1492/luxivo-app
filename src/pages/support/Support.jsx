import "./Support.scss";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatIcon from "@mui/icons-material/Chat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Footer } from "../../Component/footer/Footer";

const faqs = [
  {
    q: "How do I track my order?",
    a: "Once your order ships, you'll receive an email with a tracking number. You can use it on our order tracking page or the carrier's website.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery. Items must be unused and in original packaging. Start a return from your profile page.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3–7 business days. Express shipping (1–2 days) is available at checkout for an additional fee.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Orders can be modified or cancelled within 1 hour of placement. After that, please contact our support team as soon as possible.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship to over 50 countries. International delivery typically takes 7–14 business days depending on the destination.",
  },
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="faq-question">
        <span>{q}</span>
        <ExpandMoreIcon className="faq-icon" />
      </div>
      {open && <p className="faq-answer">{a}</p>}
    </div>
  );
};

export const Support = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="support-page">
      {/* Hero */}
      <div className="support-hero">
        <h1>How can we help you?</h1>
        <p>Our support team is here 24/7 to assist you with anything you need.</p>
      </div>

      <div className="support-content spaceX">
        {/* Contact Cards */}
        <div className="contact-cards">
          <div className="contact-card">
            <div className="card-icon"><EmailIcon /></div>
            <h3>Email Us</h3>
            <p>Get a response within 24 hours</p>
            <a href="mailto:support@snapup.com">support@snapup.com</a>
          </div>
          <div className="contact-card">
            <div className="card-icon"><PhoneIcon /></div>
            <h3>Call Us</h3>
            <p>Mon – Fri, 9am – 6pm EST</p>
            <a href="tel:+18005551234">+1 (800) 555-1234</a>
          </div>
          <div className="contact-card">
            <div className="card-icon"><ChatIcon /></div>
            <h3>Live Chat</h3>
            <p>Chat with us in real time</p>
            <button className="chat-btn">Start Chat</button>
          </div>
          <div className="contact-card">
            <div className="card-icon"><AccessTimeIcon /></div>
            <h3>Working Hours</h3>
            <p>Monday – Friday</p>
            <span className="hours">9:00 AM – 6:00 PM EST</span>
          </div>
        </div>

        {/* FAQ + Form */}
        <div className="support-bottom">
          {/* FAQ */}
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send a Message</h2>
            {sent ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe your issue in detail..." rows={5} required />
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
