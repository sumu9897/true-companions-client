import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .bn-root {
          position: relative;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          background: #0a0704;
          font-family: 'DM Sans', sans-serif;
        }

        /* Background image */
        .bn-bg {
          position: absolute; inset: 0;
          background-image: url('https://i.ibb.co/G7RsbBQ/bgImage.jpg');
          background-size: cover; background-position: center;
          transform: scale(1.06);
          animation: bn-zoom 18s ease-in-out infinite alternate;
        }

        @keyframes bn-zoom {
          from { transform: scale(1.06); }
          to   { transform: scale(1.13); }
        }

        /* Multi-layer overlay */
        .bn-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to top, rgba(8,5,2,0.92) 0%, rgba(8,5,2,0.3) 50%, rgba(8,5,2,0.55) 100%),
            linear-gradient(to right, rgba(8,5,2,0.6) 0%, transparent 60%);
        }

        /* Decorative geometric lines */
        .bn-lines {
          position: absolute; inset: 0; pointer-events: none;
          overflow: hidden;
        }

        .bn-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(212, 131, 58, 0.15), transparent);
          height: 1px; width: 100%;
        }

        .bn-line-1 { top: 18%; animation: bn-line-slide 6s ease-in-out infinite; }
        .bn-line-2 { top: 72%; animation: bn-line-slide 6s ease-in-out 2s infinite; }

        @keyframes bn-line-slide {
          0%, 100% { opacity: 0; transform: translateX(-100%); }
          50% { opacity: 1; transform: translateX(0); }
        }

        /* Corner accent */
        .bn-corner {
          position: absolute;
          width: 120px; height: 120px;
          pointer-events: none;
        }

        .bn-corner-tl { top: 40px; left: 40px; border-top: 1px solid rgba(212,131,58,0.35); border-left: 1px solid rgba(212,131,58,0.35); }
        .bn-corner-br { bottom: 40px; right: 40px; border-bottom: 1px solid rgba(212,131,58,0.35); border-right: 1px solid rgba(212,131,58,0.35); }

        /* Content */
        .bn-content {
          position: relative; z-index: 10;
          text-align: center;
          padding: 2rem 1.5rem;
          max-width: 900px; width: 100%;
        }

        .bn-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.72rem; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: #d4a06a;
          margin-bottom: 2rem;
        }

        .bn-eyebrow-line {
          width: 36px; height: 1px; background: currentColor; opacity: 0.6;
        }

        .bn-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 8vw, 7rem);
          font-weight: 700; line-height: 1.05;
          color: #fffcf6; letter-spacing: -0.02em;
          margin: 0 0 0.5rem;
        }

        .bn-title-italic {
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 252, 246, 0.7);
          display: block;
        }

        .bn-title-solid {
          display: block;
          background: linear-gradient(135deg, #fffcf6 30%, #d4a06a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .bn-sub {
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          font-weight: 300; color: rgba(220, 200, 175, 0.75);
          line-height: 1.75; max-width: 520px;
          margin: 1.8rem auto 2.8rem;
        }

        /* Stats strip */
        .bn-stats {
          display: flex; align-items: center; justify-content: center;
          gap: 2.5rem; margin-bottom: 3rem;
        }

        .bn-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem; font-weight: 700; color: #fffcf6;
          line-height: 1;
        }

        .bn-stat-label {
          font-size: 0.7rem; font-weight: 400; letter-spacing: 0.1em;
          text-transform: uppercase; color: #8a7060; margin-top: 2px;
        }

        .bn-stat-div {
          width: 1px; height: 36px; background: rgba(212,131,58,0.3);
        }

        /* CTAs */
        .bn-ctas {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; flex-wrap: wrap;
        }

        .bn-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.82rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: #0a0704;
          background: #d4833a;
          padding: 14px 32px; border-radius: 5px;
          text-decoration: none;
          transition: background 0.22s, transform 0.18s, box-shadow 0.22s;
          box-shadow: 0 4px 24px rgba(212,131,58,0.35);
        }

        .bn-cta-primary:hover {
          background: #c07030; transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(212,131,58,0.45);
        }

        .bn-cta-primary svg {
          width: 14px; height: 14px;
          transition: transform 0.2s;
        }

        .bn-cta-primary:hover svg { transform: translateX(3px); }

        .bn-cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.82rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(255,252,246,0.8);
          border: 1px solid rgba(255,252,246,0.2);
          padding: 14px 32px; border-radius: 5px;
          text-decoration: none;
          transition: border-color 0.22s, color 0.22s, background 0.22s, transform 0.18s;
          backdrop-filter: blur(8px);
          background: rgba(255,255,255,0.04);
        }

        .bn-cta-secondary:hover {
          border-color: rgba(212,131,58,0.6);
          color: #d4a06a; background: rgba(212,131,58,0.07);
          transform: translateY(-2px);
        }

        /* Scroll indicator */
        .bn-scroll {
          position: absolute; bottom: 36px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          z-index: 10;
        }

        .bn-scroll-text {
          font-size: 0.65rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(212,131,58,0.5);
        }

        .bn-scroll-line {
          width: 1px; height: 40px; background: linear-gradient(to bottom, rgba(212,131,58,0.5), transparent);
          animation: bn-scroll-drop 1.8s ease-in-out infinite;
        }

        @keyframes bn-scroll-drop {
          0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }

        @media (max-width: 640px) {
          .bn-stats { gap: 1.5rem; }
          .bn-corner { width: 70px; height: 70px; }
          .bn-corner-tl { top: 20px; left: 20px; }
          .bn-corner-br { bottom: 20px; right: 20px; }
        }
      `}</style>

      <section className="bn-root">
        {/* Background */}
        <div className="bn-bg" />
        <div className="bn-overlay" />

        {/* Geometric decoration */}
        <div className="bn-lines">
          <div className="bn-line bn-line-1" />
          <div className="bn-line bn-line-2" />
        </div>
        <div className="bn-corner bn-corner-tl" />
        <div className="bn-corner bn-corner-br" />

        {/* Main content */}
        <motion.div
          className="bn-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Eyebrow */}
          <motion.div
            className="bn-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="bn-eyebrow-line" />
            Bangladesh's Most Trusted Matrimony
            <span className="bn-eyebrow-line" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="bn-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="bn-title-italic">Find Your</span>
            <span className="bn-title-solid">Life Partner</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="bn-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Thousands of verified biodata profiles across all divisions of
            Bangladesh. Your journey to a meaningful life begins here.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="bn-stats"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {[
              { num: "10K+", label: "Profiles" },
              { num: "3.2K+", label: "Marriages" },
              { num: "7", label: "Divisions" },
            ].map(({ num, label }, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                {i > 0 && <div className="bn-stat-div" />}
                <div style={{ textAlign: "center" }}>
                  <div className="bn-stat-num">{num}</div>
                  <div className="bn-stat-label">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="bn-ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
          >
            <Link to="/signup" className="bn-cta-primary">
              Get Started Free
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/biodatapage" className="bn-cta-secondary">
              Browse Biodatas
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="bn-scroll">
          <span className="bn-scroll-text">Scroll</span>
          <div className="bn-scroll-line" />
        </div>
      </section>
    </>
  );
};

export default Banner;