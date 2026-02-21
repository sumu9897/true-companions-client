import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const contactInfo = [
  {
    Icon: FaEnvelope,
    label: "Email Us",
    value: "hello@bandhanbd.com",
    sub: "We reply within 24 hours",
  },
  {
    Icon: FaPhoneAlt,
    label: "Call Us",
    value: "+880 1700 000 000",
    sub: "Sun – Thus, 9am to 6pm",
  },
  {
    Icon: FaMapMarkerAlt,
    label: "Our Office",
    value: "Gulshan-2, Dhaka 1212",
    sub: "Bangladesh",
  },
];

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "We'll get back to you within 24 hours.",
      timer: 2200,
      showConfirmButton: false,
      background: "#fffcf6",
      color: "#18100a",
      iconColor: "#d4833a",
    });
    e.target.reset();
  };

  return (
    <>
      <Helmet><title>Contact Us — BandhanBD</title></Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .ct { font-family: 'DM Sans', sans-serif; }

        .ct-root {
          min-height: 100vh;
          background: #fffcf6;
          padding-top: 70px; /* navbar offset */
          position: relative; overflow: hidden;
        }

        /* Radial glow */
        .ct-root::before {
          content: '';
          position: absolute; top: 0; right: 0;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(212,131,58,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Page header */
        .ct-header {
          max-width: 1100px; margin: 0 auto;
          padding: 4rem 2.5rem 0;
        }

        .ct-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: #c07030;
          margin-bottom: 1rem;
        }

        .ct-eyebrow-line { width: 28px; height: 1px; background: currentColor; opacity: 0.6; }

        .ct-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 700;
          line-height: 1.06; letter-spacing: -0.02em; color: #18100a;
          margin: 0;
        }

        .ct-title em { font-style: italic; color: #c07030; }

        .ct-subtitle {
          font-size: 0.92rem; font-weight: 300; color: #7a6248;
          line-height: 1.8; margin-top: 1rem; max-width: 440px;
        }

        /* Main layout */
        .ct-body {
          max-width: 1100px; margin: 0 auto;
          padding: 3rem 2.5rem 6rem;
          display: grid; grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
        }

        /* Left: contact info */
        .ct-info { display: flex; flex-direction: column; gap: 0; }

        .ct-info-card {
          padding: 1.8rem 0;
          border-bottom: 1px solid rgba(196,168,128,0.2);
          display: flex; align-items: flex-start; gap: 1.1rem;
          transition: padding-left 0.25s;
          cursor: default;
        }

        .ct-info-card:hover { padding-left: 6px; }
        .ct-info-card:first-child { padding-top: 0; }

        .ct-info-icon {
          width: 38px; height: 38px; flex-shrink: 0;
          background: #f5ede0; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          color: #c07030; margin-top: 2px;
          transition: background 0.22s, color 0.22s;
        }

        .ct-info-card:hover .ct-info-icon {
          background: #18100a; color: #d4833a;
        }

        .ct-info-label {
          font-size: 0.68rem; font-weight: 500; letter-spacing: 0.15em;
          text-transform: uppercase; color: #9a8270; margin-bottom: 0.25rem;
        }

        .ct-info-val {
          font-size: 0.9rem; font-weight: 500; color: #18100a;
          margin-bottom: 0.15rem;
        }

        .ct-info-sub { font-size: 0.78rem; color: #9a8270; font-weight: 300; }

        /* Office hours */
        .ct-hours {
          margin-top: 2.5rem;
          padding: 1.6rem;
          background: #18100a; border-radius: 10px;
        }

        .ct-hours-title {
          font-size: 0.68rem; font-weight: 500; letter-spacing: 0.18em;
          text-transform: uppercase; color: #6a5848; margin-bottom: 1rem;
        }

        .ct-hours-row {
          display: flex; justify-content: space-between;
          font-size: 0.82rem; color: #b8a490;
          padding: 0.4rem 0;
          border-bottom: 1px solid rgba(212,131,58,0.08);
        }

        .ct-hours-row:last-child { border-bottom: none; padding-bottom: 0; }
        .ct-hours-row span:last-child { color: #fffcf6; }

        /* Right: form */
        .ct-form-wrap {
          background: #fff;
          border: 1px solid rgba(196,168,128,0.22);
          border-radius: 14px; padding: 2.8rem;
          box-shadow: 0 4px 40px rgba(180,140,80,0.07);
          position: relative; overflow: hidden;
        }

        .ct-form-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #18100a 0%, #d4833a 50%, #18100a 100%);
        }

        .ct-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 600; color: #18100a;
          margin-bottom: 0.4rem;
        }

        .ct-form-sub {
          font-size: 0.82rem; color: #9a8270; font-weight: 300;
          margin-bottom: 2rem;
        }

        .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        .ct-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .ct-field-full { grid-column: 1 / -1; }

        .ct-label {
          font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: #6a5848;
        }

        .ct-input, .ct-textarea {
          width: 100%; padding: 11px 14px;
          background: #faf7f2;
          border: 1px solid rgba(196,168,128,0.3);
          border-radius: 7px;
          font-size: 0.88rem; font-family: 'DM Sans', sans-serif;
          color: #18100a; outline: none; box-sizing: border-box;
          transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
        }

        .ct-input::placeholder, .ct-textarea::placeholder { color: #baa890; }

        .ct-input:focus, .ct-textarea:focus {
          border-color: #d4833a;
          background: #fffcf6;
          box-shadow: 0 0 0 3px rgba(212,131,58,0.1);
        }

        .ct-textarea { resize: vertical; min-height: 130px; line-height: 1.65; }

        /* Subject pills */
        .ct-subjects {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
        }

        .ct-pill {
          font-size: 0.75rem; font-weight: 400;
          padding: 6px 14px; border-radius: 999px;
          border: 1px solid rgba(196,168,128,0.35);
          color: #8a7260; cursor: pointer; background: none;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }

        .ct-pill:hover, .ct-pill.active {
          background: #18100a; color: #d4a06a; border-color: #18100a;
        }

        /* Submit */
        .ct-submit {
          width: 100%; padding: 13px;
          background: #18100a; color: #fffcf6;
          border: none; border-radius: 7px;
          font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.22s, transform 0.15s, box-shadow 0.22s;
          margin-top: 0.5rem;
        }

        .ct-submit:hover {
          background: #d4833a; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212,131,58,0.3);
        }

        .ct-submit:active { transform: translateY(0); }

        /* Privacy note */
        .ct-privacy {
          text-align: center; margin-top: 1rem;
          font-size: 0.72rem; color: #baa890;
        }

        .ct-privacy a { color: #c07030; text-decoration: none; }
        .ct-privacy a:hover { text-decoration: underline; }

        @media (max-width: 900px) {
          .ct-body { grid-template-columns: 1fr; gap: 2.5rem; padding: 2rem 1.25rem 4rem; }
          .ct-header { padding: 3rem 1.25rem 0; }
          .ct-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ct-root ct">
        {/* Header */}
        <div className="ct-header">
          <motion.div {...fadeUp(0.1)}>
            <div className="ct-eyebrow">
              <span className="ct-eyebrow-line" />
              Get In Touch
              <span className="ct-eyebrow-line" />
            </div>
          </motion.div>
          <motion.h1 className="ct-title" {...fadeUp(0.2)}>
            We're Here<br />to <em>Help</em>
          </motion.h1>
          <motion.p className="ct-subtitle" {...fadeUp(0.3)}>
            Have a question, a concern, or just want to say hello?
            Our team is ready to assist you on your journey.
          </motion.p>
        </div>

        {/* Body */}
        <div className="ct-body">
          {/* Left: info */}
          <motion.div className="ct-info" {...fadeUp(0.25)}>
            {contactInfo.map(({ Icon, label, value, sub }) => (
              <div key={label} className="ct-info-card">
                <div className="ct-info-icon">
                  <Icon size={15} />
                </div>
                <div>
                  <p className="ct-info-label">{label}</p>
                  <p className="ct-info-val">{value}</p>
                  <p className="ct-info-sub">{sub}</p>
                </div>
              </div>
            ))}

            {/* Office hours */}
            <div className="ct-hours">
              <p className="ct-hours-title">Office Hours</p>
              {[
                ["Sunday – Thrusday", "9:00 AM – 6:00 PM"],
                ["Saturday", "10:00 AM – 4:00 PM"],
                ["Friday", "Closed"],
              ].map(([day, hours]) => (
                <div key={day} className="ct-hours-row">
                  <span>{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div {...fadeUp(0.35)}>
            <div className="ct-form-wrap">
              <h2 className="ct-form-title">Send a Message</h2>
              <p className="ct-form-sub">Fill in the details below and we'll be in touch shortly.</p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {/* Subject pills */}
                <div className="ct-field">
                  <label className="ct-label">Subject</label>
                  <div className="ct-subjects">
                    {["General Inquiry", "Technical Issue", "Account Help", "Partnership"].map((s) => (
                      <button
                        key={s} type="button" className="ct-pill"
                        onClick={(e) => {
                          document.querySelectorAll(".ct-pill").forEach((el) => el.classList.remove("active"));
                          e.currentTarget.classList.add("active");
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email row */}
                <div className="ct-row">
                  <div className="ct-field">
                    <label className="ct-label">Your Name</label>
                    <input type="text" required placeholder="Full name" className="ct-input" />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Email Address</label>
                    <input type="email" required placeholder="you@example.com" className="ct-input" />
                  </div>
                </div>

                {/* Phone (optional) */}
                <div className="ct-field">
                  <label className="ct-label">Phone <span style={{ color: "#baa890", fontWeight: 300, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                  <input type="tel" placeholder="+880 1700 000 000" className="ct-input" />
                </div>

                {/* Message */}
                <div className="ct-field">
                  <label className="ct-label">Message</label>
                  <textarea required placeholder="Describe how we can help you…" className="ct-textarea" />
                </div>

                <button type="submit" className="ct-submit">
                  Send Message →
                </button>

                <p className="ct-privacy">
                  Your information is safe with us.{" "}
                  <a href="#">Privacy Policy</a>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;