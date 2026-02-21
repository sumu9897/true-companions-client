import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUserEdit, FaSearch, FaEnvelope, FaHeart } from "react-icons/fa";

const steps = [
  {
    num: "01",
    Icon: FaUserEdit,
    title: "Create Your Biodata",
    body: "Register and fill out your personal biodata with details about yourself, your family, and what you're looking for in a life partner.",
    tag: "5 minutes",
  },
  {
    num: "02",
    Icon: FaSearch,
    title: "Browse & Filter",
    body: "Search thousands of verified profiles using filters for age, division, and biodata type to narrow down your ideal match.",
    tag: "At your pace",
  },
  {
    num: "03",
    Icon: FaEnvelope,
    title: "Request Contact Info",
    body: "Found someone promising? Request their contact details through our secure, admin-verified system for just $5.",
    tag: "Admin verified",
  },
  {
    num: "04",
    Icon: FaHeart,
    title: "Begin Your Journey",
    body: "Connect through verified contact details and take the first steps toward a meaningful, lifelong companionship.",
    tag: "The beginning",
  },
];

const Works = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .wk { font-family: 'DM Sans', sans-serif; }

        .wk-section {
          background: #0e0905;
          padding: 6rem 2rem;
          position: relative; overflow: hidden;
        }

        /* Faint radial glow top-right */
        .wk-section::before {
          content: '';
          position: absolute; top: -120px; right: -120px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(212,131,58,0.1) 0%, transparent 65%);
          pointer-events: none;
        }

        /* Faint grid */
        .wk-section::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(212,131,58,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,131,58,0.04) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }

        .wk-inner {
          max-width: 1160px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* Header */
        .wk-head { text-align: center; margin-bottom: 4.5rem; }

        .wk-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.68rem; font-weight: 500; letter-spacing: 0.22em;
          text-transform: uppercase; color: #c07030;
          margin-bottom: 1.2rem;
        }

        .wk-eline { width: 28px; height: 1px; background: currentColor; opacity: 0.5; }

        .wk-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 700; color: #fffcf6;
          letter-spacing: -0.02em; line-height: 1.08;
          margin-bottom: 1rem;
        }

        .wk-title em { font-style: italic; color: #d4a06a; }

        .wk-sub {
          font-size: 0.92rem; font-weight: 300; color: rgba(255,252,246,0.45);
          max-width: 480px; margin: 0 auto; line-height: 1.8;
        }

        /* Steps grid */
        .wk-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(212,131,58,0.12);
          border: 1px solid rgba(212,131,58,0.12);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 4rem;
        }

        .wk-step {
          background: #0e0905;
          padding: 2.4rem 2rem;
          position: relative;
          transition: background 0.3s;
          cursor: default;
        }

        .wk-step:hover { background: #160e07; }

        /* Connector line through all cards */
        .wk-step::after {
          content: '';
          position: absolute; top: 54px; right: -1px;
          width: 1px; height: 28px;
          background: linear-gradient(to bottom, rgba(212,131,58,0.4), transparent);
        }

        .wk-step:last-child::after { display: none; }

        /* Step number */
        .wk-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.2rem; font-weight: 700;
          color: rgba(212,131,58,0.12);
          line-height: 1; margin-bottom: 1.4rem;
          letter-spacing: -0.04em;
          transition: color 0.3s;
        }

        .wk-step:hover .wk-num { color: rgba(212,131,58,0.22); }

        /* Icon circle */
        .wk-icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: rgba(212,131,58,0.1);
          border: 1px solid rgba(212,131,58,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #d4833a; margin-bottom: 1.2rem;
          transition: background 0.3s, border-color 0.3s;
        }

        .wk-step:hover .wk-icon {
          background: rgba(212,131,58,0.18);
          border-color: rgba(212,131,58,0.4);
        }

        /* Tag */
        .wk-tag {
          display: inline-block; margin-bottom: 0.75rem;
          font-size: 0.62rem; font-weight: 500; letter-spacing: 0.14em;
          text-transform: uppercase; color: #c07030;
          padding: 2px 8px;
          border: 1px solid rgba(192,112,48,0.25);
          border-radius: 3px;
          background: rgba(212,131,58,0.05);
        }

        .wk-step-title {
          font-size: 0.95rem; font-weight: 500; color: #fffcf6;
          margin-bottom: 0.65rem; line-height: 1.3; letter-spacing: 0.01em;
        }

        .wk-step-body {
          font-size: 0.8rem; font-weight: 300; color: rgba(255,252,246,0.4);
          line-height: 1.8;
        }

        /* Arrow indicator bottom of each card */
        .wk-step-arrow {
          position: absolute; bottom: 1.8rem; right: 1.8rem;
          font-size: 0.7rem; color: rgba(212,131,58,0.3);
          opacity: 0; transform: translateX(-4px);
          transition: opacity 0.25s, transform 0.25s, color 0.25s;
        }

        .wk-step:last-child .wk-step-arrow { display: none; }
        .wk-step:hover .wk-step-arrow { opacity: 1; transform: translateX(0); color: rgba(212,131,58,0.6); }

        /* CTA row */
        .wk-cta {
          display: flex; align-items: center; justify-content: center;
          gap: 1.5rem; flex-wrap: wrap;
        }

        .wk-cta-main {
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: #fffcf6;
          background: #d4833a; padding: 13px 32px;
          border-radius: 5px; text-decoration: none;
          transition: background 0.22s, transform 0.15s, box-shadow 0.22s;
          display: inline-block;
        }

        .wk-cta-main:hover {
          background: #c47030; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212,131,58,0.35);
        }

        .wk-cta-ghost {
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(255,252,246,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }

        .wk-cta-ghost:hover { color: #d4a06a; }

        /* Responsive */
        @media (max-width: 900px) {
          .wk-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .wk-step::after { display: none; }
        }

        @media (max-width: 560px) {
          .wk-grid { grid-template-columns: 1fr; }
          .wk-section { padding: 4rem 1.25rem; }
        }
      `}</style>

      <section className="wk-section wk" ref={sectionRef}>
        <div className="wk-inner">

          {/* Header */}
          <motion.div
            className="wk-head"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="wk-eyebrow">
              <span className="wk-eline" />
              How It Works
              <span className="wk-eline" />
            </div>
            <h2 className="wk-title">
              Your Path to a<br /><em>Meaningful</em> Connection
            </h2>
            <p className="wk-sub">
              A simple four-step process built for sincerity, safety, and transparency —
              from first profile to first conversation.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            className="wk-grid"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {steps.map(({ num, Icon, title, body, tag }, i) => (
              <motion.div
                key={num}
                className="wk-step"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="wk-num">{num}</div>
                <div className="wk-icon">
                  <Icon size={18} />
                </div>
                <span className="wk-tag">{tag}</span>
                <h3 className="wk-step-title">{title}</h3>
                <p className="wk-step-body">{body}</p>
                <span className="wk-step-arrow">→</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="wk-cta"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/signup" className="wk-cta-main">
              Create Your Biodata →
            </Link>
            <Link to="/biodatapage" className="wk-cta-ghost">
              Browse profiles first
            </Link>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Works;