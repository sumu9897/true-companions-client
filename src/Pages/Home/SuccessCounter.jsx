import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import CountUp from "react-countup";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const stats_config = [
  {
    key: "totalBiodata",
    label: "Total Biodata",
    suffix: "+",
    desc: "Verified profiles",
    sym: "◈",
  },
  {
    key: "maleBiodata",
    label: "Male Profiles",
    suffix: "+",
    desc: "Grooms registered",
    sym: "◈",
  },
  {
    key: "femaleBiodata",
    label: "Female Profiles",
    suffix: "+",
    desc: "Brides registered",
    sym: "◈",
  },
  {
    key: "marriagesCompleted",
    label: "Marriages",
    suffix: "+",
    desc: "Success stories",
    sym: "◈",
  },
];

const StatCard = ({ value, label, suffix, desc, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="sc-card">
      {/* Faint index watermark */}
      <span className="sc-watermark">0{index + 1}</span>

      {/* Value */}
      <div className="sc-value">
        {inView ? (
          <CountUp
            end={value}
            duration={2.2}
            separator=","
            delay={index * 0.15}
            useEasing
            easingFn={(t, b, c, d) => {
              // Ease out cubic
              t /= d; t--; return c * (t * t * t + 1) + b;
            }}
          />
        ) : (
          <span>0</span>
        )}
        <span className="sc-suffix">{suffix}</span>
      </div>

      {/* Divider */}
      <div className="sc-divider" />

      {/* Labels */}
      <p className="sc-label">{label}</p>
      <p className="sc-desc">{desc}</p>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="sc-card sc-skeleton">
    <div className="sc-skel-num" />
    <div className="sc-divider" />
    <div className="sc-skel-label" />
    <div className="sc-skel-desc" />
  </div>
);

const SuccessCounter = () => {
  const axiosPublic = useAxiosPublic();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["biodatas-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/biodatas/stats");
      return res.data;
    },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .sc-section {
          background: #18100a;
          padding: 5.5rem 2rem;
          position: relative; overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Subtle horizontal light bands */
        .sc-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(212,131,58,0.3) 30%, rgba(212,131,58,0.3) 70%, transparent 100%);
        }

        .sc-section::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(212,131,58,0.2) 30%, rgba(212,131,58,0.2) 70%, transparent 100%);
        }

        .sc-inner {
          max-width: 1160px; margin: 0 auto; position: relative;
        }

        /* Header */
        .sc-head {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 2rem; margin-bottom: 3.5rem; flex-wrap: wrap;
        }

        .sc-head-left {}

        .sc-eyebrow {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.65rem; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: #c07030; margin-bottom: 0.65rem;
        }

        .sc-eline { width: 22px; height: 1px; background: currentColor; opacity: 0.55; }

        .sc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem); font-weight: 700;
          color: #fffcf6; letter-spacing: -0.02em; line-height: 1.06;
        }

        .sc-title em { font-style: italic; color: #d4a06a; }

        .sc-head-sub {
          font-size: 0.84rem; font-weight: 300;
          color: rgba(255,252,246,0.38); max-width: 340px;
          line-height: 1.8; text-align: right;
        }

        /* Grid */
        .sc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(212,131,58,0.12);
          border: 1px solid rgba(212,131,58,0.12);
          border-radius: 14px;
          overflow: hidden;
        }

        /* Card */
        .sc-card {
          background: #18100a;
          padding: 2.5rem 2rem;
          position: relative; overflow: hidden;
          transition: background 0.28s;
        }

        .sc-card:hover { background: #200e05; }

        /* Watermark number */
        .sc-watermark {
          position: absolute; top: -8px; right: 12px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem; font-weight: 700; line-height: 1;
          color: rgba(212,131,58,0.05);
          pointer-events: none; user-select: none;
          transition: color 0.28s;
        }

        .sc-card:hover .sc-watermark { color: rgba(212,131,58,0.09); }

        /* Stat value */
        .sc-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 4vw, 3.6rem);
          font-weight: 700; color: #fffcf6;
          line-height: 1; margin-bottom: 1.2rem;
          letter-spacing: -0.03em;
          display: flex; align-items: flex-start; gap: 2px;
          position: relative;
        }

        .sc-suffix {
          font-size: 1.4rem; font-weight: 600;
          color: #d4833a; margin-top: 6px;
          font-family: 'Cormorant Garamond', serif;
        }

        /* Divider */
        .sc-divider {
          width: 28px; height: 1.5px;
          background: linear-gradient(90deg, #d4833a 0%, rgba(212,131,58,0.2) 100%);
          margin-bottom: 1rem;
          transition: width 0.3s ease;
        }

        .sc-card:hover .sc-divider { width: 48px; }

        /* Labels */
        .sc-label {
          font-size: 0.88rem; font-weight: 500; color: #fffcf6;
          margin-bottom: 0.2rem; letter-spacing: 0.01em;
        }

        .sc-desc {
          font-size: 0.72rem; font-weight: 300;
          color: rgba(255,252,246,0.32);
          letter-spacing: 0.04em;
        }

        /* Skeleton */
        .sc-skeleton { pointer-events: none; }

        .sc-skel-num {
          height: 48px; width: 120px; border-radius: 4px;
          background: rgba(255,252,246,0.05);
          animation: sc-pulse 1.4s ease-in-out infinite;
          margin-bottom: 1.2rem;
        }

        .sc-skel-label {
          height: 14px; width: 80px; border-radius: 3px;
          background: rgba(255,252,246,0.05);
          animation: sc-pulse 1.4s ease-in-out infinite 0.1s;
          margin-bottom: 0.4rem;
        }

        .sc-skel-desc {
          height: 11px; width: 60px; border-radius: 3px;
          background: rgba(255,252,246,0.04);
          animation: sc-pulse 1.4s ease-in-out infinite 0.2s;
        }

        @keyframes sc-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @media (max-width: 900px) {
          .sc-grid { grid-template-columns: repeat(2, 1fr); }
          .sc-head { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
          .sc-head-sub { text-align: left; }
        }

        @media (max-width: 480px) {
          .sc-grid { grid-template-columns: 1fr; }
          .sc-section { padding: 4rem 1.25rem; }
          .sc-card { padding: 2rem 1.5rem; }
        }
      `}</style>

      <section className="sc-section">
        <div className="sc-inner">

          {/* Header */}
          <div className="sc-head">
            <div className="sc-head-left">
              <div className="sc-eyebrow">
                <span className="sc-eline" />
                Our Impact
                <span className="sc-eline" />
              </div>
              <h2 className="sc-title">
                Trusted by<br /><em>Thousands</em>
              </h2>
            </div>
            <p className="sc-head-sub">
              Real numbers reflecting the journeys of real people who found their
              life partners through BandhanBD.
            </p>
          </div>

          {/* Stats grid */}
          <div className="sc-grid">
            {isLoading
              ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
              : stats_config.map((cfg, i) => (
                  <StatCard
                    key={cfg.key}
                    value={stats[cfg.key] || 0}
                    label={cfg.label}
                    suffix={cfg.suffix}
                    desc={cfg.desc}
                    index={i}
                  />
                ))
            }
          </div>

        </div>
      </section>
    </>
  );
};

export default SuccessCounter;