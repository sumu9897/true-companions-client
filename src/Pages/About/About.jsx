import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

const values = [
  {
    symbol: "①",
    title: "Trust & Verification",
    body: "Every biodata on our platform is manually reviewed. We maintain strict quality standards so you connect only with genuine, sincere individuals.",
  },
  {
    symbol: "②",
    title: "Privacy First",
    body: "Contact information is never exposed without consent. Our gated system ensures your details reach only those you've approved.",
  },
  {
    symbol: "③",
    title: "Cultural Respect",
    body: "We honour Bangladesh's rich matrimonial traditions while embracing modern expectations — bridging generations with care.",
  },
  {
    symbol: "④",
    title: "Equal Opportunity",
    body: "Every background, every division, every profession. Our platform serves all Bangladeshis equally, without bias or barriers.",
  },
];

const stats = [
  { num: "10,000+", label: "Verified Profiles" },
  { num: "3,200+", label: "Successful Marriages" },
  { num: "7", label: "Divisions Covered" },
  { num: "2024", label: "Founded" },
];

const About = () => (
  <>
    <Helmet><title>About Us — BandhanBD</title></Helmet>

    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

      .ab { font-family: 'DM Sans', sans-serif; color: #2a1f14; }

      /* Hero */
      .ab-hero {
        padding: 9rem 1.5rem 6rem;
        background: #fffcf6;
        position: relative; overflow: hidden;
        text-align: center;
      }

      .ab-hero::before {
        content: '';
        position: absolute; top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(ellipse 70% 60% at 50% -10%, rgba(212,131,58,0.09) 0%, transparent 70%);
        pointer-events: none;
      }

      /* Faint grid texture */
      .ab-hero::after {
        content: '';
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(212,131,58,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,131,58,0.06) 1px, transparent 1px);
        background-size: 60px 60px;
        mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        pointer-events: none;
      }

      .ab-tag {
        display: inline-flex; align-items: center; gap: 10px;
        font-size: 0.7rem; font-weight: 500; letter-spacing: 0.2em;
        text-transform: uppercase; color: #c07030;
        margin-bottom: 1.8rem; position: relative;
      }

      .ab-tag-line {
        width: 30px; height: 1px; background: currentColor; opacity: 0.6;
      }

      .ab-hero-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(2.8rem, 7vw, 5.5rem);
        font-weight: 700; line-height: 1.05;
        letter-spacing: -0.02em; color: #18100a;
        margin: 0 auto 1.5rem; max-width: 700px;
        position: relative;
      }

      .ab-hero-italic { font-style: italic; color: #c07030; }

      .ab-hero-sub {
        font-size: 1.05rem; font-weight: 300; line-height: 1.8;
        color: #7a6248; max-width: 540px; margin: 0 auto 3rem;
        position: relative;
      }

      /* Stats strip */
      .ab-stats-strip {
        background: #18100a;
        padding: 3rem 1.5rem;
      }

      .ab-stats-inner {
        max-width: 900px; margin: 0 auto;
        display: grid; grid-template-columns: repeat(4, 1fr);
        gap: 1px; background: rgba(212,131,58,0.2);
      }

      .ab-stat {
        background: #18100a;
        padding: 2rem 1.5rem; text-align: center;
      }

      .ab-stat-num {
        font-family: 'Cormorant Garamond', serif;
        font-size: 2.4rem; font-weight: 700; color: #fffcf6;
        line-height: 1; margin-bottom: 0.4rem;
      }

      .ab-stat-label {
        font-size: 0.7rem; letter-spacing: 0.14em;
        text-transform: uppercase; color: #6a5a48;
      }

      /* Story section */
      .ab-story {
        max-width: 1100px; margin: 0 auto;
        padding: 5rem 2.5rem;
        display: grid; grid-template-columns: 1fr 1fr;
        gap: 5rem; align-items: center;
      }

      .ab-story-label {
        font-size: 0.68rem; font-weight: 500; letter-spacing: 0.2em;
        text-transform: uppercase; color: #c07030;
        margin-bottom: 1.2rem;
      }

      .ab-story-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 700; line-height: 1.12;
        color: #18100a; letter-spacing: -0.02em;
        margin-bottom: 1.5rem;
      }

      .ab-story-body {
        font-size: 0.92rem; font-weight: 300; line-height: 1.9;
        color: #6a5848; margin-bottom: 1rem;
      }

      /* Decorative image placeholder */
      .ab-story-visual {
        position: relative;
        aspect-ratio: 4/5;
        border-radius: 12px;
        overflow: hidden;
        background: #f5ede0;
      }

      .ab-story-visual-img {
        width: 100%; height: 100%; object-fit: cover;
      }

      .ab-story-visual-accent {
        position: absolute; bottom: -16px; right: -16px;
        width: 80px; height: 80px;
        border: 2px solid #d4833a;
        border-radius: 8px;
        pointer-events: none;
      }

      /* Values grid */
      .ab-values {
        background: #0e0905;
        padding: 5rem 1.5rem;
      }

      .ab-values-inner { max-width: 1000px; margin: 0 auto; }

      .ab-values-head { text-align: center; margin-bottom: 3.5rem; }

      .ab-values-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(2rem, 4vw, 3rem); font-weight: 700;
        color: #fffcf6; letter-spacing: -0.02em;
      }

      .ab-values-grid {
        display: grid; grid-template-columns: 1fr 1fr;
        gap: 1px; background: rgba(212,131,58,0.12);
        border: 1px solid rgba(212,131,58,0.12);
        border-radius: 12px; overflow: hidden;
      }

      .ab-value-card {
        background: #0e0905; padding: 2.5rem;
        transition: background 0.25s;
      }

      .ab-value-card:hover { background: #160e07; }

      .ab-value-sym {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.2rem; color: #c07030;
        margin-bottom: 1rem; display: block;
      }

      .ab-value-title {
        font-size: 0.92rem; font-weight: 500; color: #fffcf6;
        margin-bottom: 0.65rem; letter-spacing: 0.02em;
      }

      .ab-value-body {
        font-size: 0.83rem; font-weight: 300; line-height: 1.8;
        color: #6a5848;
      }

      /* CTA section */
      .ab-cta {
        background: #fffcf6;
        padding: 6rem 1.5rem; text-align: center;
        position: relative; overflow: hidden;
      }

      .ab-cta::before {
        content: '';
        position: absolute; bottom: -100px; left: 50%; transform: translateX(-50%);
        width: 600px; height: 300px;
        background: radial-gradient(ellipse, rgba(212,131,58,0.1) 0%, transparent 70%);
        pointer-events: none;
      }

      .ab-cta-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700;
        color: #18100a; letter-spacing: -0.02em;
        margin-bottom: 1rem; position: relative;
      }

      .ab-cta-sub {
        font-size: 0.95rem; color: #8a7260; font-weight: 300;
        margin-bottom: 2.5rem; position: relative;
      }

      .ab-cta-btns {
        display: flex; align-items: center; justify-content: center;
        gap: 1rem; flex-wrap: wrap; position: relative;
      }

      .ab-btn-primary {
        font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em;
        text-transform: uppercase; color: #fffcf6;
        background: #18100a; padding: 13px 30px;
        border-radius: 5px; text-decoration: none;
        transition: background 0.22s, transform 0.15s;
      }

      .ab-btn-primary:hover { background: #d4833a; transform: translateY(-1px); }

      .ab-btn-ghost {
        font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em;
        text-transform: uppercase; color: #6a5848;
        border: 1px solid #d9c4a8; padding: 13px 30px;
        border-radius: 5px; text-decoration: none;
        transition: border-color 0.22s, color 0.22s, transform 0.15s;
      }

      .ab-btn-ghost:hover { border-color: #d4833a; color: #c07030; transform: translateY(-1px); }

      @media (max-width: 768px) {
        .ab-stats-inner { grid-template-columns: repeat(2, 1fr); }
        .ab-story { grid-template-columns: 1fr; gap: 2.5rem; padding: 3.5rem 1.25rem; }
        .ab-story-visual { aspect-ratio: 16/9; }
        .ab-values-grid { grid-template-columns: 1fr; }
        .ab-hero { padding: 8rem 1.25rem 4rem; }
      }
    `}</style>

    <main className="ab">
      {/* Hero */}
      <section className="ab-hero">
        <motion.div {...fadeUp(0.1)}>
          <div className="ab-tag">
            <span className="ab-tag-line" />
            Our Story
            <span className="ab-tag-line" />
          </div>
        </motion.div>

        <motion.h1 className="ab-hero-title" {...fadeUp(0.2)}>
          Bringing Hearts{" "}
          <span className="ab-hero-italic">Together,</span>
          <br />Across Bangladesh
        </motion.h1>

        <motion.p className="ab-hero-sub" {...fadeUp(0.35)}>
          We are more than a matrimonial platform — we are a bridge between
          families, a guardian of traditions, and a partner in life's most
          important journey.
        </motion.p>
      </section>

      {/* Stats strip */}
      <section className="ab-stats-strip">
        <div className="ab-stats-inner">
          {stats.map(({ num, label }, i) => (
            <motion.div
              key={label}
              className="ab-stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="ab-stat-num">{num}</div>
              <div className="ab-stat-label">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story section */}
      <section style={{ background: "#fffcf6" }}>
        <div className="ab-story">
          {/* Visual */}
          <motion.div {...fadeUp(0.1)}>
            <div className="ab-story-visual">
              <img
                src="https://i.ibb.co.com/rfQvpxmg/mar.jpg"
                alt="Bangladesh landscape"
                className="ab-story-visual-img"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="ab-story-visual-accent" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div {...fadeUp(0.25)}>
            <p className="ab-story-label">Who We Are</p>
            <h2 className="ab-story-title">
              Built on Trust,<br />Rooted in Culture
            </h2>
            <p className="ab-story-body">
              BandhanBD was founded with a single conviction: that every Bangladeshi
              deserves a respectful, dignified space to find their life partner. We
              combine modern technology with the timeless values that have guided
              Bangladeshi families for generations.
            </p>
            <p className="ab-story-body">
              Our platform serves thousands of individuals across all seven divisions
              — from Dhaka to Sylhet, Chattagram to Rajshahi. Each profile is
              carefully verified, each connection is made with intention, and every
              success story reminds us why we built this.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="ab-values">
        <div className="ab-values-inner">
          <motion.div className="ab-values-head" {...fadeUp(0.1)}>
            <p className="ab-stat-label" style={{ color: "#c07030", marginBottom: "0.8rem" }}>
              What Guides Us
            </p>
            <h2 className="ab-values-title">Our Core Values</h2>
          </motion.div>

          <motion.div
            className="ab-values-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {values.map(({ symbol, title, body }, i) => (
              <motion.div
                key={title}
                className="ab-value-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              >
                <span className="ab-value-sym">{symbol}</span>
                <p className="ab-value-title">{title}</p>
                <p className="ab-value-body">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <motion.h2 className="ab-cta-title" {...fadeUp(0.1)}>
          Ready to Begin?
        </motion.h2>
        <motion.p className="ab-cta-sub" {...fadeUp(0.2)}>
          Join thousands of families who found their perfect match on BandhanBD.
        </motion.p>
        <motion.div className="ab-cta-btns" {...fadeUp(0.3)}>
          <Link to="/signup" className="ab-btn-primary">Create Your Biodata</Link>
          <Link to="/biodatapage" className="ab-btn-ghost">Browse Profiles</Link>
        </motion.div>
      </section>
    </main>
  </>
);

export default About;