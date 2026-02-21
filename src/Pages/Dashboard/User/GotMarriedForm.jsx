import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FaStar, FaHeart, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;

const GotMarriedForm = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const [form, setForm] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    successStory: "",
    marriageDate: "",
    reviewStar: 0,
  });
  const [coupleImageUrl, setCoupleImageUrl] = useState("");
  const [imagePreview, setImagePreview]     = useState("");
  const [uploading, setUploading]           = useState(false);
  const [submitting, setSubmitting]         = useState(false);
  const [hoverStar, setHoverStar]           = useState(0);

  // ── Fetch user's own biodata (for auto-filling selfBiodataId) ──────────────
  const { data: myBiodata, isLoading: bioLoading } = useQuery({
    queryKey: ["my-biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/biodatas/mine");
        return res.data;
      } catch { return null; }
    },
  });

  // ── Fetch approved contact requests (partner candidates) ──────────────────
  const { data: contactRequests = [], isLoading: reqLoading } = useQuery({
    queryKey: ["my-contact-requests"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/contact-requests/mine");
      return res.data;
    },
  });

  // Filter only approved requests — these are confirmed matches
  const approvedPartners = contactRequests.filter((r) => r.status === "approved");

  // Auto-fill selfBiodataId once biodata loads
  useEffect(() => {
    if (myBiodata?.biodataId) {
      setForm((prev) => ({ ...prev, selfBiodataId: myBiodata.biodataId }));
    }
  }, [myBiodata]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePartnerSelect = (partner) => {
    setForm((prev) => ({ ...prev, partnerBiodataId: partner.biodataId }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const res = await axiosPublic.post(IMAGE_HOSTING_API, formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      if (res.data.success) {
        setCoupleImageUrl(res.data.data.url);
      } else {
        throw new Error("Upload failed");
      }
    } catch {
      Swal.fire({ icon: "error", title: "Image upload failed", background: "#fffcf6", color: "#18100a" });
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setCoupleImageUrl("");
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.selfBiodataId || !form.partnerBiodataId || !form.successStory || !form.marriageDate || !form.reviewStar) {
      return Swal.fire({ icon: "warning", title: "Please fill in all required fields.", background: "#fffcf6", color: "#18100a" });
    }
    setSubmitting(true);
    try {
      await axiosSecure.post("/success-stories", { ...form, coupleImage: coupleImageUrl });
      Swal.fire({
        icon: "success",
        title: "Story Submitted!",
        text: "Thank you for sharing your happy story with the BandhanBD community.",
        background: "#fffcf6", color: "#18100a", iconColor: "#d4833a",
        timer: 2500, showConfirmButton: false,
      });
      setForm({ selfBiodataId: myBiodata?.biodataId || "", partnerBiodataId: "", successStory: "", marriageDate: "", reviewStar: 0 });
      setCoupleImageUrl(""); setImagePreview("");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Submission Failed", text: error.response?.data?.message || "Please try again.", background: "#fffcf6", color: "#18100a" });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPartner = approvedPartners.find((p) => p.biodataId === parseInt(form.partnerBiodataId));

  return (
    <>
      <Helmet><title>Got Married — BandhanBD</title></Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .gm-root { font-family: 'DM Sans', sans-serif; max-width: 620px; }

        /* ── Page header ── */
        .gm-head { margin-bottom: 2rem; }
        .gm-eyebrow {
          font-size: 0.62rem; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: #c07030;
          display: flex; align-items: center; gap: 7px; margin-bottom: 0.55rem;
        }
        .gm-eline { width: 18px; height: 1px; background: currentColor; opacity: 0.5; }
        .gm-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: #18100a;
          letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.35rem;
        }
        .gm-sub { font-size: 0.84rem; color: #9a8270; font-weight: 300; }

        /* ── Form card ── */
        .gm-form {
          background: #fffcf6;
          border: 1px solid rgba(196,168,128,0.22);
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 2px 20px rgba(180,140,80,0.07);
        }

        /* ── Section ── */
        .gm-section {
          padding: 1.8rem 2rem;
          border-bottom: 1px solid rgba(196,168,128,0.14);
        }
        .gm-section:last-of-type { border-bottom: none; }

        .gm-sec-label {
          font-size: 0.6rem; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: #c07030;
          display: flex; align-items: center; gap: 7px; margin-bottom: 1.2rem;
        }
        .gm-sec-line { width: 16px; height: 1px; background: currentColor; opacity: 0.5; }

        /* ── Auto-ID card ── */
        .gm-id-card {
          background: #f5ede0;
          border: 1px solid rgba(196,168,128,0.3);
          border-radius: 10px; padding: 1rem 1.2rem;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        .gm-id-card-left { display: flex; flex-direction: column; gap: 2px; }
        .gm-id-card-lbl { font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: #9a8270; }
        .gm-id-card-name { font-size: 0.9rem; font-weight: 600; color: #18100a; }
        .gm-id-card-sub { font-size: 0.72rem; color: #9a8270; font-weight: 300; }
        .gm-id-badge {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 700; color: #d4833a; line-height: 1;
          flex-shrink: 0;
        }
        .gm-id-badge small {
          display: block; font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem; font-weight: 400; color: #9a8270;
          letter-spacing: 0.1em; text-transform: uppercase; text-align: right;
        }

        .gm-no-biodata {
          padding: 1rem 1.2rem; border-radius: 10px;
          border: 1.5px dashed rgba(196,168,128,0.35);
          font-size: 0.8rem; color: #9a8270; text-align: center; font-weight: 300;
        }
        .gm-no-biodata a { color: #c07030; font-weight: 500; text-decoration: none; }
        .gm-no-biodata a:hover { text-decoration: underline; }

        /* ── Partner selection ── */
        .gm-partner-grid {
          display: flex; flex-direction: column; gap: 0.5rem;
        }

        .gm-partner-card {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px; border-radius: 9px;
          border: 1.5px solid rgba(196,168,128,0.22);
          cursor: pointer; background: #faf7f2;
          transition: border-color 0.18s, background 0.18s;
          position: relative;
        }
        .gm-partner-card:hover { border-color: rgba(212,131,58,0.35); background: #fffcf6; }
        .gm-partner-card.selected { border-color: #d4833a; background: #fffcf6; box-shadow: 0 0 0 2px rgba(212,131,58,0.12); }

        .gm-partner-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          object-fit: cover; flex-shrink: 0;
          border: 1.5px solid rgba(196,168,128,0.3);
        }

        .gm-partner-avatar-placeholder {
          width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
          background: rgba(212,131,58,0.1); border: 1.5px solid rgba(212,131,58,0.2);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 700;
          color: #d4833a;
        }

        .gm-partner-info { flex: 1; min-width: 0; }
        .gm-partner-name { font-size: 0.86rem; font-weight: 600; color: #18100a; margin-bottom: 1px; }
        .gm-partner-meta { font-size: 0.7rem; color: #9a8270; font-weight: 300; }

        .gm-partner-id {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; color: #d4833a; flex-shrink: 0;
        }

        .gm-partner-check {
          width: 20px; height: 20px; border-radius: 50%;
          background: #d4833a; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .gm-no-requests {
          padding: 1.2rem; border-radius: 9px;
          border: 1.5px dashed rgba(196,168,128,0.3);
          font-size: 0.8rem; color: #9a8270; text-align: center; font-weight: 300;
          line-height: 1.7;
        }

        /* Manual fallback input */
        .gm-manual-toggle {
          margin-top: 0.75rem; font-size: 0.72rem; color: #b8a080;
          display: flex; align-items: center; gap: 6px;
        }
        .gm-manual-toggle button {
          background: none; border: none; cursor: pointer;
          color: #c07030; font-size: inherit; font-family: inherit;
          text-decoration: underline; padding: 0;
        }

        .gm-manual-input {
          margin-top: 0.6rem;
        }

        /* ── Shared input/select ── */
        .gm-input, .gm-select, .gm-textarea {
          width: 100%; padding: 10px 13px;
          background: #faf7f2;
          border: 1.5px solid rgba(196,168,128,0.3);
          border-radius: 8px;
          font-size: 0.85rem; font-family: 'DM Sans', sans-serif;
          color: #18100a; outline: none; box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .gm-input::placeholder, .gm-textarea::placeholder { color: #c8b49a; }
        .gm-input:focus, .gm-select:focus, .gm-textarea:focus {
          border-color: #d4833a; background: #fffcf6;
          box-shadow: 0 0 0 3px rgba(212,131,58,0.1);
        }
        .gm-textarea { resize: vertical; min-height: 110px; line-height: 1.65; }

        .gm-label {
          font-size: 0.67rem; font-weight: 500; letter-spacing: 0.13em;
          text-transform: uppercase; color: #7a6248; margin-bottom: 0.5rem; display: block;
        }
        .gm-req { color: #c07030; margin-left: 2px; }
        .gm-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .gm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        /* ── Stars ── */
        .gm-stars { display: flex; align-items: center; gap: 6px; margin-bottom: 0.3rem; }
        .gm-star-btn {
          background: none; border: none; cursor: pointer; padding: 2px;
          transition: transform 0.15s;
          display: flex; align-items: center;
        }
        .gm-star-btn:hover { transform: scale(1.18); }
        .gm-star-val {
          font-size: 0.78rem; color: #9a8270; margin-left: 4px;
          font-weight: 300;
        }

        /* ── Image upload ── */
        .gm-img-zone {
          border-radius: 9px; border: 1.5px dashed rgba(196,168,128,0.35);
          background: #faf7f2; cursor: pointer; text-align: center;
          padding: 1.5rem; transition: border-color 0.2s, background 0.2s;
          position: relative;
        }
        .gm-img-zone:hover { border-color: rgba(212,131,58,0.45); background: #fffcf6; }
        .gm-img-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }

        .gm-img-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(212,131,58,0.09); border: 1px solid rgba(212,131,58,0.18);
          display: flex; align-items: center; justify-content: center;
          color: #d4833a; margin: 0 auto 0.6rem;
        }
        .gm-img-main { font-size: 0.84rem; font-weight: 500; color: #18100a; margin-bottom: 2px; }
        .gm-img-main span { color: #c07030; text-decoration: underline; }
        .gm-img-sub { font-size: 0.7rem; color: #b8a080; font-weight: 300; }

        /* Preview */
        .gm-img-preview {
          position: relative; display: inline-block;
          border-radius: 9px; overflow: hidden;
          border: 2px solid rgba(212,131,58,0.3);
        }
        .gm-img-preview img { width: 120px; height: 120px; object-fit: cover; display: block; }
        .gm-img-remove {
          position: absolute; top: 5px; right: 5px;
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(24,16,10,0.75); color: #fffcf6; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .gm-uploading { font-size: 0.72rem; color: #c07030; margin-top: 0.4rem; text-align: center; }

        /* ── Submit zone ── */
        .gm-submit-zone {
          padding: 1.5rem 2rem;
          background: #faf7f2; border-top: 1px solid rgba(196,168,128,0.14);
        }
        .gm-submit-btn {
          width: 100%; padding: 13px;
          background: #18100a; color: #fffcf6; border: none;
          border-radius: 8px; font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.22s, transform 0.15s, box-shadow 0.22s;
        }
        .gm-submit-btn:hover:not(:disabled) {
          background: #d4833a; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212,131,58,0.25);
        }
        .gm-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        @media (max-width: 560px) {
          .gm-section { padding: 1.4rem 1.25rem; }
          .gm-grid { grid-template-columns: 1fr; }
          .gm-submit-zone { padding: 1.25rem; }
        }
      `}</style>

      <div className="gm-root">

        {/* Header */}
        <div className="gm-head">
          <div className="gm-eyebrow">
            <span className="gm-eline" /> Got Married
          </div>
          <h1 className="gm-title">Share Your Story</h1>
          <p className="gm-sub">
            Found your life partner through BandhanBD? Inspire others by sharing your journey.
          </p>
        </div>

        <div className="gm-form">

          {/* ── 01 · Your Biodata (auto-filled) ── */}
          <div className="gm-section">
            <div className="gm-sec-label">
              <span className="gm-sec-line" /> Your Biodata
            </div>

            {bioLoading ? (
              <div className="gm-no-biodata">Loading your profile…</div>
            ) : myBiodata ? (
              <div className="gm-id-card">
                <div className="gm-id-card-left">
                  <span className="gm-id-card-lbl">Auto-detected profile</span>
                  <span className="gm-id-card-name">{myBiodata.name}</span>
                  <span className="gm-id-card-sub">
                    {myBiodata.occupation} · {myBiodata.permanentDivision}
                  </span>
                </div>
                <div className="gm-id-badge">
                  #{myBiodata.biodataId}
                  <small>Biodata ID</small>
                </div>
              </div>
            ) : (
              <div className="gm-no-biodata">
                You don't have a biodata yet.{" "}
                <a href="/dashboard/edit-biodata">Create one first →</a>
              </div>
            )}
          </div>

          {/* ── 02 · Select Partner ── */}
          <div className="gm-section">
            <div className="gm-sec-label">
              <span className="gm-sec-line" /> Your Partner
            </div>

            {reqLoading ? (
              <div className="gm-no-biodata">Loading your matches…</div>
            ) : approvedPartners.length > 0 ? (
              <>
                <p style={{ fontSize: "0.75rem", color: "#9a8270", marginBottom: "0.8rem", fontWeight: 300 }}>
                  Select from your approved contact requests:
                </p>
                <div className="gm-partner-grid">
                  {approvedPartners.map((partner) => {
                    const isSelected = parseInt(form.partnerBiodataId) === partner.biodataId;
                    return (
                      <div
                        key={partner._id}
                        className={`gm-partner-card${isSelected ? " selected" : ""}`}
                        onClick={() => handlePartnerSelect(partner)}
                      >
                        {partner.profileImage ? (
                          <img src={partner.profileImage} alt={partner.biodataName} className="gm-partner-avatar" />
                        ) : (
                          <div className="gm-partner-avatar-placeholder">
                            {partner.biodataName?.[0] || "?"}
                          </div>
                        )}
                        <div className="gm-partner-info">
                          <p className="gm-partner-name">{partner.biodataName || `Biodata #${partner.biodataId}`}</p>
                          <p className="gm-partner-meta">
                            Biodata #{partner.biodataId} · Approved request
                          </p>
                        </div>
                        {isSelected ? (
                          <div className="gm-partner-check">
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        ) : (
                          <span className="gm-partner-id">#{partner.biodataId}</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Manual override */}
                <div className="gm-manual-toggle">
                  Partner not listed?
                  <button type="button" onClick={() => setForm(p => ({ ...p, partnerBiodataId: "" }))}>
                    Enter ID manually
                  </button>
                </div>
                {/* Show manual input only if no partner card selected */}
                {!selectedPartner && (
                  <div className="gm-manual-input">
                    <input
                      type="number"
                      name="partnerBiodataId"
                      value={form.partnerBiodataId}
                      onChange={handleChange}
                      placeholder="Enter partner's Biodata ID"
                      className="gm-input"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="gm-no-requests">
                  No approved contact requests found.<br />
                  <span style={{ fontSize: "0.7rem" }}>Please enter your partner's Biodata ID manually below.</span>
                </div>
                <div style={{ marginTop: "0.75rem" }}>
                  <label className="gm-label">Partner's Biodata ID <span className="gm-req">*</span></label>
                  <input
                    type="number"
                    name="partnerBiodataId"
                    value={form.partnerBiodataId}
                    onChange={handleChange}
                    placeholder="e.g. 24"
                    className="gm-input"
                  />
                </div>
              </>
            )}
          </div>

          {/* ── 03 · Wedding Details ── */}
          <div className="gm-section">
            <div className="gm-sec-label">
              <span className="gm-sec-line" /> Wedding Details
            </div>

            <div className="gm-grid" style={{ marginBottom: "1.2rem" }}>
              {/* Marriage Date */}
              <div className="gm-field">
                <label className="gm-label">Marriage Date <span className="gm-req">*</span></label>
                <input
                  type="date"
                  name="marriageDate"
                  value={form.marriageDate}
                  onChange={handleChange}
                  required
                  className="gm-input"
                />
              </div>

              {/* Star Rating */}
              <div className="gm-field">
                <label className="gm-label">Rating <span className="gm-req">*</span></label>
                <div className="gm-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="gm-star-btn"
                      onMouseEnter={() => setHoverStar(star)}
                      onMouseLeave={() => setHoverStar(0)}
                      onClick={() => setForm((p) => ({ ...p, reviewStar: star }))}
                    >
                      <FaStar
                        size={24}
                        color={
                          (hoverStar || form.reviewStar) >= star
                            ? "#d4833a"
                            : "rgba(196,168,128,0.3)"
                        }
                      />
                    </button>
                  ))}
                  <span className="gm-star-val">
                    {form.reviewStar > 0 ? `${form.reviewStar}/5` : "Rate us"}
                  </span>
                </div>
              </div>
            </div>

            {/* Couple Photo */}
            <div className="gm-field">
              <label className="gm-label">Couple Photo <span style={{ color: "#b8a080", fontWeight: 300, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
              {imagePreview ? (
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div className="gm-img-preview">
                    <img src={imagePreview} alt="Couple preview" />
                    <button type="button" className="gm-img-remove" onClick={removeImage}>
                      <FaTimes size={10} />
                    </button>
                  </div>
                  {uploading && <p className="gm-uploading">Uploading…</p>}
                  {!uploading && coupleImageUrl && (
                    <span style={{ fontSize: "0.72rem", color: "#2e6e30", fontWeight: 400 }}>✓ Uploaded</span>
                  )}
                </div>
              ) : (
                <div className="gm-img-zone">
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  <div className="gm-img-icon"><FaCloudUploadAlt size={18} /></div>
                  <p className="gm-img-main">Drop photo or <span>browse</span></p>
                  <p className="gm-img-sub">JPG, PNG, WEBP</p>
                </div>
              )}
            </div>
          </div>

          {/* ── 04 · Your Story ── */}
          <div className="gm-section">
            <div className="gm-sec-label">
              <span className="gm-sec-line" /> Your Story
            </div>
            <div className="gm-field">
              <label className="gm-label">Write your story <span className="gm-req">*</span></label>
              <textarea
                name="successStory"
                value={form.successStory}
                onChange={handleChange}
                rows={6}
                required
                placeholder="How did you first connect? What made you certain? Share the journey that led to your happily ever after…"
                className="gm-textarea"
              />
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="gm-submit-zone">
            <button
              type="button"
              className="gm-submit-btn"
              onClick={handleSubmit}
              disabled={submitting || uploading || !myBiodata}
            >
              {submitting ? (
                "Submitting…"
              ) : (
                <><FaHeart size={13} /> Submit Success Story</>
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default GotMarriedForm;