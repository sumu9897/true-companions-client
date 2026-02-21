import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const status = error?.status || 404;
  const is404 = status === 404;
  const message = error?.statusText || error?.message ||
    (is404 ? "The page you're looking for doesn't exist or has been moved." : "An unexpected error occurred on our server.");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,500;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ep-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #0c0805;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 2rem; position: relative; overflow: hidden;
        }

        /* ── Background grid ── */
        .ep-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(212,131,58,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,131,58,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* ── Radial amber glow centre ── */
        .ep-root::after {
          content: '';
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(212,131,58,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ── Corner brackets ── */
        .ep-corner {
          position: fixed; width: 60px; height: 60px; pointer-events: none;
        }
        .ep-corner.tl { top: 28px; left: 28px; border-top: 1px solid rgba(212,131,58,0.25); border-left: 1px solid rgba(212,131,58,0.25); }
        .ep-corner.tr { top: 28px; right: 28px; border-top: 1px solid rgba(212,131,58,0.25); border-right: 1px solid rgba(212,131,58,0.25); }
        .ep-corner.bl { bottom: 28px; left: 28px; border-bottom: 1px solid rgba(212,131,58,0.25); border-left: 1px solid rgba(212,131,58,0.25); }
        .ep-corner.br { bottom: 28px; right: 28px; border-bottom: 1px solid rgba(212,131,58,0.25); border-right: 1px solid rgba(212,131,58,0.25); }

        /* ── Main card ── */
        .ep-card {
          position: relative; z-index: 1;
          text-align: center; max-width: 520px; width: 100%;
          animation: ep-fade 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes ep-fade {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Status number ── */
        .ep-status-wrap { position: relative; margin-bottom: 0.5rem; }

        .ep-status {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(7rem, 22vw, 13rem);
          font-weight: 700; line-height: 0.85;
          color: transparent;
          /* Outlined stroke text */
          -webkit-text-stroke: 1px rgba(212,131,58,0.22);
          letter-spacing: -0.04em;
          position: relative; display: block;
          user-select: none;
        }

        /* Glitch layers */
        .ep-status::before,
        .ep-status::after {
          content: attr(data-text);
          position: absolute; left: 0; right: 0; top: 0;
          font-family: inherit; font-size: inherit; font-weight: inherit;
          line-height: inherit; letter-spacing: inherit;
          color: transparent;
        }

        .ep-status::before {
          -webkit-text-stroke: 1px rgba(212,131,58,0.4);
          clip-path: polygon(0 35%, 100% 35%, 100% 55%, 0 55%);
          animation: ep-glitch-a 4.5s infinite steps(1);
        }

        .ep-status::after {
          -webkit-text-stroke: 1px rgba(192,112,48,0.25);
          clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
          animation: ep-glitch-b 5.5s infinite steps(1);
        }

        @keyframes ep-glitch-a {
          0%,94%  { transform: translateX(0); opacity: 0; }
          95%     { transform: translateX(-4px); opacity: 1; }
          97%     { transform: translateX(3px);  opacity: 1; }
          99%,100%{ transform: translateX(0); opacity: 0; }
        }

        @keyframes ep-glitch-b {
          0%,88%  { transform: translateX(0); opacity: 0; }
          89%     { transform: translateX(3px);  opacity: 1; }
          92%     { transform: translateX(-3px); opacity: 1; }
          95%,100%{ transform: translateX(0); opacity: 0; }
        }

        /* Floating amber fill number behind */
        .ep-status-bg {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(7rem, 22vw, 13rem);
          font-weight: 700; line-height: 0.85;
          color: rgba(212,131,58,0.04);
          letter-spacing: -0.04em;
          position: absolute; top: 0; left: 0; right: 0;
          pointer-events: none; user-select: none;
        }

        /* ── Eyebrow tag ── */
        .ep-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.62rem; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: #c07030;
          margin-bottom: 1.4rem;
        }
        .ep-eline { width: 20px; height: 1px; background: currentColor; opacity: 0.5; }

        /* ── Heading ── */
        .ep-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          font-weight: 700; color: #fffcf6;
          letter-spacing: -0.02em; line-height: 1.1;
          margin-bottom: 1rem;
        }

        .ep-title em { font-style: italic; color: #d4a06a; }

        /* ── Message ── */
        .ep-message {
          font-size: 0.88rem; font-weight: 300;
          color: rgba(255,252,246,0.38); line-height: 1.8;
          max-width: 380px; margin: 0 auto 2.5rem;
        }

        /* ── Divider ── */
        .ep-divider {
          width: 40px; height: 1.5px; margin: 0 auto 2rem;
          background: linear-gradient(90deg, transparent, rgba(212,131,58,0.5), transparent);
        }

        /* ── CTA buttons ── */
        .ep-btns { display: flex; align-items: center; justify-content: center; gap: 0.75rem; flex-wrap: wrap; }

        .ep-btn-home {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 28px;
          background: #18100a; color: #fffcf6;
          border: 1px solid rgba(212,131,58,0.2);
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; text-decoration: none;
          transition: background 0.22s, border-color 0.22s, transform 0.15s, box-shadow 0.22s;
        }

        .ep-btn-home:hover {
          background: #d4833a; border-color: #d4833a;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212,131,58,0.28);
        }

        .ep-btn-back {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 12px 22px;
          background: none; color: rgba(255,252,246,0.38);
          border: 1px solid rgba(212,131,58,0.12);
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 400; letter-spacing: 0.08em;
          text-transform: uppercase; cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }

        .ep-btn-back:hover { border-color: rgba(212,131,58,0.35); color: #d4a06a; }

        /* ── Bottom code hint ── */
        .ep-code-hint {
          margin-top: 3rem;
          font-size: 0.68rem; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,252,246,0.12);
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        .ep-code-hint::before,
        .ep-code-hint::after {
          content: '';
          display: block; width: 30px; height: 1px;
          background: rgba(255,252,246,0.08);
        }

        /* ── Scan line animation ── */
        .ep-scanline {
          position: fixed; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(212,131,58,0.18), transparent);
          animation: ep-scan 6s linear infinite;
          pointer-events: none; z-index: 0;
        }

        @keyframes ep-scan {
          from { top: -2px; }
          to   { top: 100vh; }
        }

        @media (max-width: 480px) {
          .ep-corner { display: none; }
        }
      `}</style>

      <div className="ep-root">
        {/* Decorative scan line */}
        <div className="ep-scanline" />

        {/* Corner brackets */}
        <div className="ep-corner tl" />
        <div className="ep-corner tr" />
        <div className="ep-corner bl" />
        <div className="ep-corner br" />

        <div className="ep-card">
          {/* Status number */}
          <div className="ep-status-wrap">
            <span className="ep-status-bg" aria-hidden="true">{status}</span>
            <span className="ep-status" data-text={status} aria-label={`Error ${status}`}>
              {status}
            </span>
          </div>

          {/* Eyebrow */}
          <div className="ep-eyebrow">
            <span className="ep-eline" />
            {is404 ? "Page Not Found" : "Server Error"}
            <span className="ep-eline" />
          </div>

          {/* Title */}
          <h1 className="ep-title">
            {is404 ? (
              <><em>Lost</em> in the<br />void</>
            ) : (
              <>Something<br /><em>broke</em></>
            )}
          </h1>

          <div className="ep-divider" />

          {/* Message */}
          <p className="ep-message">{message}</p>

          {/* CTAs */}
          <div className="ep-btns">
            <Link to="/" className="ep-btn-home">
              ← Back to Home
            </Link>
            <button className="ep-btn-back" onClick={() => window.history.back()}>
              Go Back
            </button>
          </div>

          {/* Code hint */}
          <div className="ep-code-hint">
            Error code {status}
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;