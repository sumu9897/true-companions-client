import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .ft { font-family: 'DM Sans', sans-serif; }
        .ft-root {
          background: #0e0905;
          color: #b8a490;
          padding: 4.5rem 0 0;
          position: relative;
          overflow: hidden;
        }

        /* Geometric background decoration */
        .ft-root::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 360px; height: 360px;
          border-radius: 50%;
          border: 1px solid rgba(212, 131, 58, 0.08);
          pointer-events: none;
        }
        .ft-root::after {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 220px; height: 220px;
          border-radius: 50%;
          border: 1px solid rgba(212, 131, 58, 0.13);
          pointer-events: none;
        }

        .ft-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 2.5rem 4rem;
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.4fr;
          gap: 3rem;
        }

        .ft-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700;
          color: #fffcf6; letter-spacing: -0.02em;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 1rem; text-decoration: none;
        }

        .ft-gem {
          width: 9px; height: 9px;
          background: linear-gradient(135deg, #d4833a, #e8a05a);
          border-radius: 2px; transform: rotate(45deg);
          flex-shrink: 0;
        }

        .ft-tagline {
          font-size: 0.84rem; line-height: 1.75;
          color: #7a6a58; max-width: 240px;
        }

        .ft-social {
          display: flex; gap: 0.6rem; margin-top: 1.5rem;
        }

        .ft-soc-btn {
          width: 36px; height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(196, 168, 128, 0.15);
          display: flex; align-items: center; justify-content: center;
          color: #7a6a58; cursor: pointer; text-decoration: none;
          transition: all 0.22s; background: rgba(255,255,255,0.03);
        }

        .ft-soc-btn:hover {
          background: #d4833a; border-color: #d4833a;
          color: #fff; transform: translateY(-2px);
        }

        .ft-col-title {
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.14em;
          text-transform: uppercase; color: #fffcf6;
          margin-bottom: 1.5rem;
        }

        .ft-col-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }

        .ft-col-link {
          font-size: 0.84rem; color: #7a6a58;
          text-decoration: none; transition: color 0.2s;
          cursor: pointer;
        }

        .ft-col-link:hover { color: #d4833a; }

        /* Newsletter */
        .ft-nl-desc { font-size: 0.83rem; color: #6a5a48; line-height: 1.65; margin-bottom: 1rem; }

        .ft-nl-form { display: flex; flex-direction: column; gap: 0.6rem; }

        .ft-nl-input {
          width: 100%; padding: 10px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(196, 168, 128, 0.18);
          border-radius: 6px; color: #d4c4b0;
          font-size: 0.84rem; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .ft-nl-input::placeholder { color: #5a4a38; }
        .ft-nl-input:focus { border-color: rgba(212, 131, 58, 0.5); }

        .ft-nl-btn {
          padding: 10px 20px;
          background: #d4833a; color: #fffcf6;
          border: none; border-radius: 6px;
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, transform 0.15s;
        }

        .ft-nl-btn:hover { background: #c07030; transform: translateY(-1px); }

        /* Bottom bar */
        .ft-bar {
          border-top: 1px solid rgba(196, 168, 128, 0.1);
          padding: 1.4rem 2.5rem;
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem;
        }

        .ft-bottom-wrap {
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        .ft-copy { font-size: 0.78rem; color: #4a3a2a; }
        .ft-made { font-size: 0.78rem; color: #4a3a2a; }

        .ft-made span { color: #d4833a; }

        @media (max-width: 1024px) {
          .ft-inner { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }

        @media (max-width: 640px) {
          .ft-inner { grid-template-columns: 1fr; padding: 0 1.25rem 3rem; }
          .ft-bar { padding: 1.2rem 1.25rem; flex-direction: column; text-align: center; }
        }
      `}</style>

      <footer className="ft-root ft">
        <div className="ft-inner">
          {/* Brand column */}
          <div>
            <Link to="/" className="ft-brand-name">
              <span className="ft-gem" />
              BandhanBD
            </Link>
            <p className="ft-tagline">
              Bangladesh's trusted matrimonial platform — connecting hearts and
              building lifelong bonds since 2024.
            </p>
            <div className="ft-social">
              {[
                { Icon: FaFacebookF, href: "#" },
                { Icon: FaTwitter, href: "#" },
                { Icon: FaInstagram, href: "#" },
                { Icon: FaLinkedinIn, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="ft-soc-btn">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="ft-col-title">Platform</p>
            <ul className="ft-col-links">
              {[
                { to: "/", label: "Home" },
                { to: "/biodatapage", label: "Browse Biodatas" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="ft-col-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="ft-col-title">Support</p>
            <ul className="ft-col-links">
              {["Help Centre", "Terms of Service", "Privacy Policy", "Cookie Policy", "Safety Tips"].map((label) => (
                <li key={label}>
                  <span className="ft-col-link">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="ft-col-title">Stay Updated</p>
            <p className="ft-nl-desc">
              Success stories, matchmaking tips, and platform news — delivered to your inbox.
            </p>
            <div className="ft-nl-form">
              <input
                type="email"
                placeholder="Your email address"
                className="ft-nl-input"
              />
              <button className="ft-nl-btn">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ft-bottom-wrap">
          <div className="ft-bar">
            <p className="ft-copy">
              © {new Date().getFullYear()} BandhanBD. All rights reserved.
            </p>
            <p className="ft-made">
              Made with <span>♥</span> for Bangladesh
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;