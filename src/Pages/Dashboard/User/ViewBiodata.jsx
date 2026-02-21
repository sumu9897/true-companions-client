import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import {
  FaUser, FaMapMarkerAlt, FaBriefcase, FaPhone,
  FaEnvelope, FaCrown, FaCheckCircle, FaClock,
  FaEdit, FaTimes, FaChevronLeft, FaChevronRight,
  FaExpand,
} from "react-icons/fa";

// ── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ images, startIdx, onClose }) => {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="vb-lb-overlay" onClick={onClose}>
      <button className="vb-lb-close" onClick={onClose}><FaTimes size={18} /></button>

      {/* Counter */}
      <div className="vb-lb-counter">{idx + 1} / {images.length}</div>

      {/* Main image */}
      <div className="vb-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button className="vb-lb-arrow left" onClick={prev}><FaChevronLeft size={16} /></button>
        )}
        <img src={images[idx]} alt={`photo-${idx}`} className="vb-lb-img" />
        {images.length > 1 && (
          <button className="vb-lb-arrow right" onClick={next}><FaChevronRight size={16} /></button>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="vb-lb-thumbs" onClick={(e) => e.stopPropagation()}>
          {images.map((src, i) => (
            <button
              key={i}
              className={`vb-lb-thumb${i === idx ? " active" : ""}`}
              onClick={() => setIdx(i)}
            >
              <img src={src} alt={`thumb-${i}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Field component ───────────────────────────────────────────────────────────
const Field = ({ label, value }) =>
  value ? (
    <div className="vb-field">
      <span className="vb-field-label">{label}</span>
      <span className="vb-field-value">{value}</span>
    </div>
  ) : null;

// ── Card wrapper ──────────────────────────────────────────────────────────────
const Card = ({ title, icon: Icon, children }) => (
  <div className="vb-card">
    <div className="vb-card-head">
      {Icon && <span className="vb-card-icon"><Icon size={13} /></span>}
      <h3 className="vb-card-title">{title}</h3>
    </div>
    <div className="vb-card-body">{children}</div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const ViewBiodata = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure  = useAxiosSecure();
  const queryClient  = useQueryClient();
  const [lightbox, setLightbox] = useState(null); // { images, startIdx }

  const { data: biodata, isLoading, isError } = useQuery({
    queryKey: ["my-biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas/mine");
      return res.data;
    },
  });

  const handlePremiumRequest = () => {
    Swal.fire({
      title: "Request Premium Status?",
      text: "Your request will be reviewed by an admin. Once approved, your contact info will be visible.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d4833a",
      cancelButtonColor: "#3d2310",
      confirmButtonText: "Yes, Request Premium",
      background: "#fffcf6",
      color: "#18100a",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        await axiosSecure.post("/biodatas/premium-request");
        queryClient.invalidateQueries(["my-biodata", user?.email]);
        Swal.fire({
          icon: "success", title: "Request Sent!",
          text: "Your premium request is pending admin approval.",
          timer: 2000, showConfirmButton: false,
          background: "#fffcf6", color: "#18100a", iconColor: "#d4833a",
        });
      } catch (error) {
        Swal.fire({
          icon: "error", title: "Request Failed",
          text: error.response?.data?.message || "Please try again.",
          background: "#fffcf6", color: "#18100a",
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  if (isError || !biodata) {
    return (
      <>
        <style>{styles}</style>
        <div className="vb-empty">
          <div className="vb-empty-icon">📋</div>
          <h2 className="vb-empty-title">No Biodata Found</h2>
          <p className="vb-empty-sub">You haven't created a biodata profile yet.</p>
          <Link to="/dashboard/edit-biodata" className="vb-empty-btn">
            Create Biodata Now →
          </Link>
        </div>
      </>
    );
  }

  // Resolve images array (supports both old profileImage and new profileImages[])
  const allImages = biodata.profileImages?.length
    ? biodata.profileImages
    : biodata.profileImage
      ? [biodata.profileImage]
      : [];

  const primaryImage = allImages[0] ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(biodata.name)}&size=300&background=3d2310&color=d4a06a&bold=true`;

  const premiumStatus = biodata.premiumStatus;
  const showPremiumCTA = !premiumStatus || premiumStatus === "none";

  return (
    <>
      <Helmet><title>View Biodata — BandhanBD</title></Helmet>
      <style>{styles}</style>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIdx={lightbox.startIdx}
          onClose={() => setLightbox(null)}
        />
      )}

      <div className="vb-root">

        {/* ── Top bar ── */}
        <div className="vb-topbar">
          <div>
            <div className="vb-topbar-eye">
              <span className="vb-topbar-eline" /> My Profile
            </div>
            <h1 className="vb-topbar-title">My Biodata</h1>
            <p className="vb-topbar-sub">Biodata ID #{biodata.biodataId}</p>
          </div>
          <div className="vb-topbar-actions">
            {/* Premium badge */}
            {premiumStatus === "approved" && (
              <span className="vb-badge approved">
                <FaCheckCircle size={11} /> Premium
              </span>
            )}
            {premiumStatus === "pending" && (
              <span className="vb-badge pending">
                <FaClock size={11} /> Pending
              </span>
            )}
            <Link to="/dashboard/edit-biodata" className="vb-edit-btn">
              <FaEdit size={12} /> Edit Profile
            </Link>
          </div>
        </div>

        {/* ── Hero profile card ── */}
        <div className="vb-hero-card">
          {/* Dark header band */}
          <div className="vb-hero-band">
            <div className="vb-hero-band-glow" />
          </div>

          <div className="vb-hero-body">
            {/* Primary photo + name */}
            <div className="vb-hero-left">
              <div
                className="vb-primary-photo"
                onClick={() => allImages.length > 0 && setLightbox({ images: allImages, startIdx: 0 })}
                style={{ cursor: allImages.length > 0 ? "pointer" : "default" }}
              >
                <img src={primaryImage} alt={biodata.name} />
                {allImages.length > 1 && (
                  <div className="vb-photo-expand">
                    <FaExpand size={12} />
                    <span>{allImages.length} photos</span>
                  </div>
                )}
              </div>
            </div>

            <div className="vb-hero-right">
              <h2 className="vb-hero-name">{biodata.name}</h2>
              <div className="vb-hero-meta">
                <span className="vb-meta-pill">
                  <FaUser size={10} /> {biodata.biodataType}
                </span>
                {biodata.permanentDivision && (
                  <span className="vb-meta-pill">
                    <FaMapMarkerAlt size={10} /> {biodata.permanentDivision}
                  </span>
                )}
                {biodata.occupation && (
                  <span className="vb-meta-pill">
                    <FaBriefcase size={10} /> {biodata.occupation}
                  </span>
                )}
              </div>
              {biodata.age && (
                <p className="vb-hero-age">
                  <span>{biodata.age}</span> years old
                </p>
              )}
            </div>
          </div>

          {/* ── Photo gallery strip ── */}
          {allImages.length > 1 && (
            <div className="vb-gallery-strip">
              <p className="vb-gallery-label">
                All Photos <span>({allImages.length})</span>
              </p>
              <div className="vb-gallery-grid">
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    className={`vb-gallery-thumb${i === 0 ? " primary" : ""}`}
                    onClick={() => setLightbox({ images: allImages, startIdx: i })}
                    aria-label={`View photo ${i + 1}`}
                  >
                    <img src={src} alt={`photo-${i}`} />
                    {i === 0 && <span className="vb-gallery-primary-tag">Primary</span>}
                    <div className="vb-gallery-hover-ov">
                      <FaExpand size={12} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Info grid ── */}
        <div className="vb-grid">

          <Card title="Personal Details" icon={FaUser}>
            <div className="vb-field-grid">
              <Field label="Date of Birth" value={biodata.dob} />
              <Field label="Age"           value={biodata.age ? `${biodata.age} years` : null} />
              <Field label="Height"        value={biodata.height} />
              <Field label="Weight"        value={biodata.weight} />
              <Field label="Complexion"    value={biodata.race} />
              <Field label="Occupation"    value={biodata.occupation} />
            </div>
          </Card>

          <Card title="Family Details" icon={FaMapMarkerAlt}>
            <div className="vb-field-stack">
              <Field label="Father's Name"       value={biodata.fatherName} />
              <Field label="Mother's Name"       value={biodata.motherName} />
              <Field label="Permanent Division"  value={biodata.permanentDivision} />
              <Field label="Present Division"    value={biodata.presentDivision} />
            </div>
          </Card>

          <Card title="Partner Preferences" icon={FaCrown}>
            <div className="vb-field-grid">
              <Field label="Expected Age"    value={biodata.expectedPartnerAge ? `${biodata.expectedPartnerAge} yrs` : null} />
              <Field label="Expected Height" value={biodata.expectedPartnerHeight} />
              <Field label="Expected Weight" value={biodata.expectedPartnerWeight} />
            </div>
          </Card>

          <Card title="Contact Information" icon={FaEnvelope}>
            <div className="vb-field-stack">
              <div className="vb-contact-row">
                <span className="vb-contact-icon"><FaEnvelope size={12} /></span>
                <span className="vb-contact-val">{biodata.email}</span>
              </div>
              {biodata.mobileNumber && (
                <div className="vb-contact-row">
                  <span className="vb-contact-icon"><FaPhone size={12} /></span>
                  <span className="vb-contact-val">{biodata.mobileNumber}</span>
                </div>
              )}
              <p className="vb-contact-note">
                Contact info is only revealed after a paid, admin-approved request.
              </p>
            </div>
          </Card>

        </div>

        {/* ── Premium CTA ── */}
        {showPremiumCTA && (
          <div className="vb-premium-cta">
            <div className="vb-premium-glow" />
            <div className="vb-premium-left">
              <div className="vb-premium-icon-wrap">
                <FaCrown size={18} />
              </div>
              <div>
                <h3 className="vb-premium-title">Go Premium</h3>
                <p className="vb-premium-sub">
                  Make your biodata premium so your contact info is visible to users who purchase access.
                </p>
              </div>
            </div>
            <button className="vb-premium-btn" onClick={handlePremiumRequest}>
              Request Premium Status →
            </button>
          </div>
        )}

      </div>
    </>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  .vb-root { font-family: 'DM Sans', sans-serif; max-width: 860px; }

  /* ── Topbar ── */
  .vb-topbar {
    display: flex; align-items: flex-start; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;
  }

  .vb-topbar-eye {
    font-size: 0.62rem; font-weight: 500; letter-spacing: 0.2em;
    text-transform: uppercase; color: #c07030;
    display: flex; align-items: center; gap: 7px; margin-bottom: 0.4rem;
  }
  .vb-topbar-eline { width: 16px; height: 1px; background: currentColor; opacity: 0.5; }

  .vb-topbar-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 700; color: #18100a;
    letter-spacing: -0.02em; line-height: 1;
  }

  .vb-topbar-sub { font-size: 0.78rem; color: #9a8270; font-weight: 300; margin-top: 2px; }

  .vb-topbar-actions { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }

  /* Premium badges */
  .vb-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.68rem; font-weight: 600; padding: 5px 11px; border-radius: 999px;
    letter-spacing: 0.05em;
  }
  .vb-badge.approved { background: rgba(34,120,60,0.1); color: #1a6040; border: 1px solid rgba(34,120,60,0.2); }
  .vb-badge.pending  { background: rgba(212,131,58,0.1); color: #a05820; border: 1px solid rgba(212,131,58,0.25); }

  .vb-edit-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 16px; border-radius: 7px;
    background: #18100a; color: #fffcf6;
    font-size: 0.74rem; font-weight: 500; letter-spacing: 0.07em;
    text-transform: uppercase; text-decoration: none;
    transition: background 0.2s, transform 0.15s;
    border: 1px solid transparent;
  }
  .vb-edit-btn:hover { background: #d4833a; transform: translateY(-1px); }

  /* ── Hero card ── */
  .vb-hero-card {
    background: #fffcf6;
    border: 1px solid rgba(196,168,128,0.22);
    border-radius: 14px; overflow: hidden;
    box-shadow: 0 2px 18px rgba(180,140,80,0.07);
    margin-bottom: 1.2rem;
  }

  .vb-hero-band {
    height: 80px; background: #18100a; position: relative; overflow: hidden;
  }

  .vb-hero-band-glow {
    position: absolute; top: -40px; left: 50%; transform: translateX(-50%);
    width: 300px; height: 120px;
    background: radial-gradient(ellipse, rgba(212,131,58,0.18) 0%, transparent 70%);
  }

  .vb-hero-body {
    display: flex; align-items: flex-end; gap: 1.5rem;
    padding: 0 1.75rem 1.75rem; flex-wrap: wrap;
  }

  /* Primary photo */
  .vb-primary-photo {
    position: relative; margin-top: -44px; flex-shrink: 0;
    width: 88px; height: 88px; border-radius: 12px; overflow: hidden;
    border: 3px solid #fffcf6;
    box-shadow: 0 4px 16px rgba(180,140,80,0.18);
    transition: transform 0.2s;
  }

  .vb-primary-photo:hover { transform: scale(1.03); }

  .vb-primary-photo img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }

  .vb-photo-expand {
    position: absolute; inset: 0; background: rgba(24,16,10,0.55);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 3px; color: #fffcf6; font-size: 0.58rem; letter-spacing: 0.08em;
    text-transform: uppercase; font-weight: 600;
    opacity: 0; transition: opacity 0.2s;
  }

  .vb-primary-photo:hover .vb-photo-expand { opacity: 1; }

  .vb-hero-right { flex: 1; min-width: 0; padding-top: 0.5rem; }

  .vb-hero-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 700; color: #18100a;
    letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 0.5rem;
  }

  .vb-hero-meta { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.6rem; }

  .vb-meta-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 999px;
    border: 1px solid rgba(196,168,128,0.28);
    font-size: 0.71rem; color: #7a6248; font-weight: 400;
  }

  .vb-meta-pill svg { color: #c07030; }

  .vb-hero-age {
    font-size: 0.8rem; color: #9a8270; font-weight: 300;
  }
  .vb-hero-age span { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; color: #18100a; }

  /* ── Gallery strip ── */
  .vb-gallery-strip {
    border-top: 1px solid rgba(196,168,128,0.15);
    padding: 1.2rem 1.75rem 1.5rem;
  }

  .vb-gallery-label {
    font-size: 0.62rem; font-weight: 600; letter-spacing: 0.16em;
    text-transform: uppercase; color: #9a8270; margin-bottom: 0.8rem;
  }
  .vb-gallery-label span { color: #c07030; }

  .vb-gallery-grid {
    display: flex; flex-wrap: wrap; gap: 0.55rem;
  }

  .vb-gallery-thumb {
    position: relative; width: 80px; height: 80px;
    border-radius: 8px; overflow: hidden;
    border: 2px solid rgba(196,168,128,0.22);
    cursor: pointer; background: none; padding: 0;
    transition: border-color 0.2s, transform 0.2s;
    flex-shrink: 0;
  }

  .vb-gallery-thumb:hover { border-color: rgba(212,131,58,0.5); transform: scale(1.04); }
  .vb-gallery-thumb.primary { border-color: #d4833a; box-shadow: 0 0 0 2px rgba(212,131,58,0.2); }

  .vb-gallery-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .vb-gallery-primary-tag {
    position: absolute; bottom: 4px; left: 4px;
    background: #d4833a; color: #fffcf6;
    font-size: 0.5rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 2px 5px; border-radius: 3px;
  }

  .vb-gallery-hover-ov {
    position: absolute; inset: 0; background: rgba(24,16,10,0.45);
    display: flex; align-items: center; justify-content: center;
    color: #fffcf6; opacity: 0; transition: opacity 0.2s;
  }
  .vb-gallery-thumb:hover .vb-gallery-hover-ov { opacity: 1; }

  /* ── Info grid ── */
  .vb-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1rem; margin-bottom: 1.2rem;
  }

  /* ── Card ── */
  .vb-card {
    background: #fffcf6;
    border: 1px solid rgba(196,168,128,0.2);
    border-radius: 13px; overflow: hidden;
    box-shadow: 0 1px 12px rgba(180,140,80,0.05);
  }

  .vb-card-head {
    display: flex; align-items: center; gap: 8px;
    padding: 0.9rem 1.3rem;
    border-bottom: 1px solid rgba(196,168,128,0.13);
  }

  .vb-card-icon {
    width: 26px; height: 26px; border-radius: 6px;
    background: rgba(212,131,58,0.09);
    display: flex; align-items: center; justify-content: center;
    color: #d4833a; flex-shrink: 0;
  }

  .vb-card-title {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em;
    text-transform: uppercase; color: #7a6248;
  }

  .vb-card-body { padding: 1.1rem 1.3rem; }

  /* ── Fields ── */
  .vb-field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
  .vb-field-stack { display: flex; flex-direction: column; gap: 0.85rem; }

  .vb-field { display: flex; flex-direction: column; gap: 2px; }

  .vb-field-label {
    font-size: 0.6rem; font-weight: 500; letter-spacing: 0.14em;
    text-transform: uppercase; color: #b8a080;
  }

  .vb-field-value {
    font-size: 0.84rem; font-weight: 500; color: #18100a;
  }

  /* Contact rows */
  .vb-contact-row { display: flex; align-items: center; gap: 10px; }
  .vb-contact-icon {
    width: 28px; height: 28px; border-radius: 7px;
    background: rgba(212,131,58,0.08); border: 1px solid rgba(212,131,58,0.15);
    display: flex; align-items: center; justify-content: center;
    color: #c07030; flex-shrink: 0;
  }
  .vb-contact-val { font-size: 0.84rem; color: #18100a; font-weight: 400; }
  .vb-contact-note {
    font-size: 0.7rem; color: #b8a080; font-weight: 300;
    padding: 0.6rem 0.75rem; background: #faf7f2;
    border-radius: 6px; border: 1px solid rgba(196,168,128,0.15);
    line-height: 1.6; margin-top: 0.3rem;
  }

  /* ── Premium CTA ── */
  .vb-premium-cta {
    background: #18100a; border-radius: 13px;
    padding: 1.75rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    gap: 1.5rem; flex-wrap: wrap;
    position: relative; overflow: hidden;
    border: 1px solid rgba(212,131,58,0.15);
  }

  .vb-premium-glow {
    position: absolute; top: -40px; left: -40px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(212,131,58,0.12) 0%, transparent 65%);
    pointer-events: none;
  }

  .vb-premium-left { display: flex; align-items: flex-start; gap: 1rem; position: relative; }

  .vb-premium-icon-wrap {
    width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
    background: rgba(212,131,58,0.12); border: 1px solid rgba(212,131,58,0.22);
    display: flex; align-items: center; justify-content: center; color: #d4833a;
  }

  .vb-premium-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem; font-weight: 700; color: #fffcf6;
    letter-spacing: -0.01em; margin-bottom: 0.25rem;
  }

  .vb-premium-sub {
    font-size: 0.78rem; font-weight: 300; color: rgba(255,252,246,0.42);
    line-height: 1.6; max-width: 400px;
  }

  .vb-premium-btn {
    flex-shrink: 0; padding: 11px 24px;
    background: #d4833a; color: #fffcf6; border: none; border-radius: 7px;
    font-family: 'DM Sans', sans-serif; font-size: 0.77rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;
    position: relative;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }

  .vb-premium-btn:hover {
    background: #c47030; transform: translateY(-1px);
    box-shadow: 0 5px 16px rgba(212,131,58,0.3);
  }

  /* ── Lightbox ── */
  .vb-lb-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(8,5,3,0.94);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 1rem;
    backdrop-filter: blur(8px);
    animation: vb-lb-in 0.22s ease;
  }

  @keyframes vb-lb-in {
    from { opacity: 0; } to { opacity: 1; }
  }

  .vb-lb-close {
    position: fixed; top: 1.5rem; right: 1.5rem;
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,252,246,0.08); border: 1px solid rgba(255,252,246,0.1);
    color: rgba(255,252,246,0.7); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, color 0.2s;
  }
  .vb-lb-close:hover { background: rgba(212,131,58,0.2); color: #fffcf6; }

  .vb-lb-counter {
    position: fixed; top: 1.8rem; left: 50%; transform: translateX(-50%);
    font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(255,252,246,0.3); font-family: 'DM Sans', sans-serif;
  }

  .vb-lb-img-wrap {
    position: relative; max-width: 90vw; max-height: 72vh;
    display: flex; align-items: center;
  }

  .vb-lb-img {
    max-width: 90vw; max-height: 72vh;
    object-fit: contain; border-radius: 8px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.5);
    display: block;
    animation: vb-lb-img-in 0.25s ease;
  }

  @keyframes vb-lb-img-in {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
  }

  .vb-lb-arrow {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,252,246,0.08); border: 1px solid rgba(255,252,246,0.1);
    color: rgba(255,252,246,0.7); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s; z-index: 1;
  }
  .vb-lb-arrow.left { left: -56px; }
  .vb-lb-arrow.right { right: -56px; }
  .vb-lb-arrow:hover { background: rgba(212,131,58,0.2); color: #fffcf6; }

  .vb-lb-thumbs {
    display: flex; gap: 0.5rem; flex-wrap: wrap;
    justify-content: center; max-width: 90vw;
  }

  .vb-lb-thumb {
    width: 52px; height: 52px; border-radius: 6px; overflow: hidden;
    border: 2px solid rgba(255,252,246,0.1);
    cursor: pointer; padding: 0; background: none;
    transition: border-color 0.2s, transform 0.15s;
    flex-shrink: 0;
  }
  .vb-lb-thumb:hover { transform: scale(1.06); }
  .vb-lb-thumb.active { border-color: #d4833a; }
  .vb-lb-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* ── Empty state ── */
  .vb-empty {
    text-align: center; padding: 5rem 2rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
    font-family: 'DM Sans', sans-serif;
  }
  .vb-empty-icon { font-size: 2.5rem; }
  .vb-empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 700; color: #18100a;
  }
  .vb-empty-sub { font-size: 0.84rem; color: #9a8270; font-weight: 300; }
  .vb-empty-btn {
    margin-top: 0.5rem; padding: 11px 24px;
    background: #18100a; color: #fffcf6; border-radius: 7px;
    font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none;
    transition: background 0.2s;
  }
  .vb-empty-btn:hover { background: #d4833a; }

  /* ── Responsive ── */
  @media (max-width: 700px) {
    .vb-grid { grid-template-columns: 1fr; }
    .vb-lb-arrow.left { left: -44px; }
    .vb-lb-arrow.right { right: -44px; }
  }
  @media (max-width: 480px) {
    .vb-hero-body { padding: 0 1.25rem 1.25rem; }
    .vb-gallery-strip { padding: 1rem 1.25rem 1.25rem; }
    .vb-gallery-thumb { width: 68px; height: 68px; }
    .vb-premium-cta { padding: 1.4rem; }
    .vb-lb-arrow { display: none; }
  }
`;

export default ViewBiodata;