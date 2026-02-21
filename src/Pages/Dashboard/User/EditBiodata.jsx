import { useContext, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCloudUploadAlt, FaTimes, FaStar, FaCheck } from "react-icons/fa";

const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;

const DIVISIONS   = ["Dhaka","Chattagram","Rangpur","Barisal","Khulna","Mymensingh","Sylhet"];
const HEIGHTS     = ["4'6\"","4'8\"","4'10\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"","5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"","6'1\"","6'2\""];
const WEIGHTS     = ["40 kg","45 kg","50 kg","55 kg","60 kg","65 kg","70 kg","75 kg","80 kg","85 kg","90 kg"];
const OCCUPATIONS = ["Student","Job","House wife","Business","Doctor","Engineer","Teacher","Other"];
const RACES       = ["Fair","Wheatish","Dark"];

// ── Shared style tokens ──────────────────────────────────────────────────────
const inputCls  = "eb-input";
const selectCls = "eb-select";

// ── Sub-components ───────────────────────────────────────────────────────────
const Field = ({ label, required, hint, error, children }) => (
  <div className="eb-field">
    <label className="eb-label">
      {label}
      {required && <span className="eb-req">*</span>}
    </label>
    {children}
    {hint && !error && <p className="eb-hint">{hint}</p>}
    {error && <p className="eb-error">{error.message}</p>}
  </div>
);

const SectionHead = ({ num, title, desc }) => (
  <div className="eb-section-head">
    <span className="eb-section-num">{num}</span>
    <div>
      <h2 className="eb-section-title">{title}</h2>
      {desc && <p className="eb-section-desc">{desc}</p>}
    </div>
  </div>
);

// ── Multi-image uploader ─────────────────────────────────────────────────────
const MAX_IMAGES = 6;

const ImageUploader = ({ existingImages = [], onChange }) => {
  const [previews, setPreviews] = useState(
    existingImages.map((url) => ({ url, file: null, isExisting: true }))
  );
  const [dragging, setDragging] = useState(false);
  const [primaryIdx, setPrimaryIdx] = useState(0);
  const inputRef = useRef();

  const addFiles = (files) => {
    const remaining = MAX_IMAGES - previews.length;
    const toAdd = Array.from(files).slice(0, remaining);
    const newPreviews = toAdd.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      isExisting: false,
    }));
    const updated = [...previews, ...newPreviews];
    setPreviews(updated);
    onChange(updated, primaryIdx);
  };

  const removeImage = (idx) => {
    const updated = previews.filter((_, i) => i !== idx);
    const newPrimary = primaryIdx >= updated.length ? Math.max(0, updated.length - 1) : primaryIdx;
    setPrimaryIdx(newPrimary);
    setPreviews(updated);
    onChange(updated, newPrimary);
  };

  const setPrimary = (idx) => {
    setPrimaryIdx(idx);
    onChange(previews, idx);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="eb-imgup">
      {/* Grid of thumbnails */}
      {previews.length > 0 && (
        <div className="eb-img-grid">
          {previews.map((p, i) => (
            <div
              key={p.url}
              className={`eb-img-thumb${i === primaryIdx ? " primary" : ""}`}
              onClick={() => setPrimary(i)}
              title={i === primaryIdx ? "Primary photo" : "Click to set as primary"}
            >
              <img src={p.url} alt={`photo-${i}`} />

              {/* Primary badge */}
              {i === primaryIdx && (
                <span className="eb-img-primary-badge">
                  <FaStar size={8} /> Primary
                </span>
              )}

              {/* Remove button */}
              <button
                type="button"
                className="eb-img-remove"
                onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                aria-label="Remove image"
              >
                <FaTimes size={10} />
              </button>

              {/* Existing vs new pill */}
              <span className={`eb-img-pill${p.isExisting ? "" : " new"}`}>
                {p.isExisting ? "Saved" : "New"}
              </span>
            </div>
          ))}

          {/* Add more slot */}
          {previews.length < MAX_IMAGES && (
            <button
              type="button"
              className="eb-img-add-slot"
              onClick={() => inputRef.current?.click()}
            >
              <FaCloudUploadAlt size={18} />
              <span>Add</span>
            </button>
          )}
        </div>
      )}

      {/* Drop zone (shown when no images) */}
      {previews.length === 0 && (
        <div
          className={`eb-dropzone${dragging ? " dragging" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <div className="eb-dropzone-icon">
            <FaCloudUploadAlt size={24} />
          </div>
          <p className="eb-dropzone-main">
            Drop photos here or <span>browse files</span>
          </p>
          <p className="eb-dropzone-sub">
            Up to {MAX_IMAGES} photos · JPG, PNG, WEBP · First photo becomes your profile picture
          </p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => addFiles(e.target.files)}
      />

      {previews.length > 0 && (
        <p className="eb-img-footer">
          {previews.length}/{MAX_IMAGES} photos · Click a photo to set it as primary · 
          <button type="button" className="eb-img-add-text" onClick={() => inputRef.current?.click()}>
            {" "}Add more
          </button>
        </p>
      )}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure  = useAxiosSecure();
  const axiosPublic  = useAxiosPublic();

  // Image state managed separately from react-hook-form
  const [imageData, setImageData] = useState({ previews: [], primaryIdx: 0 });

  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch existing biodata
  const { data: existingBiodata, isLoading: isFetching } = useQuery({
    queryKey: ["my-biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/biodatas/mine");
        return res.data;
      } catch { return null; }
    },
  });

  // Pre-fill form
  useEffect(() => {
    if (existingBiodata) {
      const fields = [
        "biodataType","name","dob","height","weight","occupation","race",
        "fatherName","motherName","permanentDivision","presentDivision",
        "expectedPartnerAge","expectedPartnerHeight","expectedPartnerWeight","mobileNumber",
      ];
      fields.forEach((f) => setValue(f, existingBiodata[f] || ""));

      // Pre-load existing images (support both profileImage and profileImages array)
      const existing = existingBiodata.profileImages?.length
        ? existingBiodata.profileImages
        : existingBiodata.profileImage
          ? [existingBiodata.profileImage]
          : [];
      setImageData({ previews: existing.map((url) => ({ url, file: null, isExisting: true })), primaryIdx: 0 });
    } else {
      setValue("name", user?.displayName || "");
    }
  }, [existingBiodata, user, setValue]);

  // Auto-calculate age
  const dob = watch("dob");
  useEffect(() => {
    if (!dob) return;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    if (age > 0) setValue("age", age);
  }, [dob, setValue]);

  // Upload a single file to ImgBB
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axiosPublic.post(IMAGE_HOSTING_API, formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    if (!res.data.success) throw new Error("Image upload failed");
    return res.data.data.url;
  };

  const onSubmit = async (data) => {
    try {
      const { previews, primaryIdx } = imageData;

      if (previews.length === 0) {
        return Swal.fire({
          icon: "warning", title: "No photos added",
          text: "Please upload at least one profile photo.",
          background: "#fffcf6", color: "#18100a",
        });
      }

      // Upload only new files
      const uploadedUrls = await Promise.all(
        previews.map(async (p) => {
          if (p.isExisting) return p.url;
          return await uploadToImgBB(p.file);
        })
      );

      // Reorder so primary is first
      const reordered = [
        uploadedUrls[primaryIdx],
        ...uploadedUrls.filter((_, i) => i !== primaryIdx),
      ];

      const payload = {
        biodataType: data.biodataType,
        name: data.name,
        profileImage: reordered[0],       // primary (backwards-compat)
        profileImages: reordered,          // full array
        dob: data.dob,
        age: parseInt(data.age),
        height: data.height,
        weight: data.weight,
        occupation: data.occupation,
        race: data.race,
        fatherName: data.fatherName,
        motherName: data.motherName,
        permanentDivision: data.permanentDivision,
        presentDivision: data.presentDivision,
        expectedPartnerAge: data.expectedPartnerAge,
        expectedPartnerHeight: data.expectedPartnerHeight,
        expectedPartnerWeight: data.expectedPartnerWeight,
        mobileNumber: data.mobileNumber,
        email: user.email,
      };

      if (existingBiodata) {
        await axiosSecure.put(`/biodatas/${user.email}`, payload);
      } else {
        await axiosSecure.post("/biodatas", payload);
      }

      Swal.fire({
        icon: "success",
        title: existingBiodata ? "Biodata Updated!" : "Biodata Created!",
        timer: 1600, showConfirmButton: false,
        background: "#fffcf6", color: "#18100a", iconColor: "#d4833a",
      });
    } catch (error) {
      Swal.fire({
        icon: "error", title: "Failed to save biodata",
        text: error.response?.data?.message || error.message,
        background: "#fffcf6", color: "#18100a",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="eb-loading">
        <div className="eb-spinner" />
        <p>Loading your biodata…</p>
      </div>
    );
  }

  const isEdit = !!existingBiodata;

  return (
    <>
      <Helmet>
        <title>{isEdit ? "Edit Biodata" : "Create Biodata"} — BandhanBD</title>
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .eb-root { font-family: 'DM Sans', sans-serif; max-width: 680px; }

        /* ── Page header ── */
        .eb-page-head { margin-bottom: 2rem; }

        .eb-page-eyebrow {
          font-size: 0.62rem; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: #c07030;
          display: flex; align-items: center; gap: 7px; margin-bottom: 0.55rem;
        }

        .eb-page-eline { width: 18px; height: 1px; background: currentColor; opacity: 0.5; }

        .eb-page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: #18100a;
          letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.35rem;
        }

        .eb-page-sub { font-size: 0.84rem; color: #9a8270; font-weight: 300; }

        /* ── Form card ── */
        .eb-form {
          display: flex; flex-direction: column; gap: 0;
          background: #fffcf6;
          border: 1px solid rgba(196,168,128,0.22);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 20px rgba(180,140,80,0.07);
        }

        /* ── Section ── */
        .eb-section {
          padding: 2rem;
          border-bottom: 1px solid rgba(196,168,128,0.15);
        }

        .eb-section:last-of-type { border-bottom: none; }

        .eb-section-head {
          display: flex; align-items: flex-start; gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .eb-section-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 700; color: rgba(212,131,58,0.18);
          line-height: 1; flex-shrink: 0; min-width: 32px;
        }

        .eb-section-title {
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: #c07030; margin-bottom: 2px;
        }

        .eb-section-desc {
          font-size: 0.78rem; color: #9a8270; font-weight: 300;
        }

        .eb-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .eb-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
        .eb-stack { display: flex; flex-direction: column; gap: 1rem; }

        /* ── Field ── */
        .eb-field { display: flex; flex-direction: column; gap: 0.4rem; }

        .eb-label {
          font-size: 0.67rem; font-weight: 500; letter-spacing: 0.13em;
          text-transform: uppercase; color: #7a6248;
          display: flex; align-items: center; gap: 4px;
        }

        .eb-req { color: #c07030; }

        .eb-hint { font-size: 0.7rem; color: #baa890; font-weight: 300; }
        .eb-error { font-size: 0.7rem; color: #b05030; font-weight: 400; }

        /* ── Inputs ── */
        .eb-input, .eb-select {
          width: 100%; padding: 10px 13px;
          background: #faf7f2;
          border: 1.5px solid rgba(196,168,128,0.3);
          border-radius: 8px;
          font-size: 0.85rem; font-family: 'DM Sans', sans-serif;
          color: #18100a; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
        }

        .eb-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%239a8270'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px; }

        .eb-input::placeholder { color: #c8b49a; }

        .eb-input:focus, .eb-select:focus {
          border-color: #d4833a;
          background: #fffcf6;
          box-shadow: 0 0 0 3px rgba(212,131,58,0.1);
        }

        .eb-input:read-only, .eb-input[readonly] {
          background: #f5f0e8; color: #b8a080; cursor: not-allowed;
          border-color: rgba(196,168,128,0.18);
        }

        /* ── Image uploader ── */
        .eb-imgup { display: flex; flex-direction: column; gap: 0.8rem; }

        .eb-img-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 0.6rem;
        }

        .eb-img-thumb {
          position: relative; aspect-ratio: 1;
          border-radius: 8px; overflow: hidden;
          border: 2px solid rgba(196,168,128,0.25);
          cursor: pointer; transition: border-color 0.2s, transform 0.2s;
        }

        .eb-img-thumb:hover { transform: scale(1.02); border-color: rgba(212,131,58,0.4); }
        .eb-img-thumb.primary { border-color: #d4833a; box-shadow: 0 0 0 2px rgba(212,131,58,0.2); }

        .eb-img-thumb img {
          width: 100%; height: 100%; object-fit: cover;
          display: block;
        }

        .eb-img-primary-badge {
          position: absolute; bottom: 5px; left: 5px;
          background: #d4833a; color: #fffcf6;
          font-size: 0.55rem; font-weight: 600; letter-spacing: 0.08em;
          padding: 2px 6px; border-radius: 3px;
          display: flex; align-items: center; gap: 3px;
          text-transform: uppercase;
        }

        .eb-img-remove {
          position: absolute; top: 5px; right: 5px;
          width: 20px; height: 20px; border-radius: 50%;
          background: rgba(24,16,10,0.75); color: #fffcf6;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.2s;
        }

        .eb-img-thumb:hover .eb-img-remove { opacity: 1; }

        .eb-img-pill {
          position: absolute; top: 5px; left: 5px;
          font-size: 0.52rem; font-weight: 600; letter-spacing: 0.08em;
          padding: 2px 6px; border-radius: 3px; text-transform: uppercase;
          background: rgba(24,16,10,0.6); color: rgba(255,252,246,0.6);
        }

        .eb-img-pill.new { background: rgba(34,100,50,0.75); color: #a0f0b0; }

        .eb-img-add-slot {
          aspect-ratio: 1; border-radius: 8px;
          border: 1.5px dashed rgba(196,168,128,0.4);
          background: #faf7f2; cursor: pointer;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px; color: #b8a080; font-size: 0.68rem; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }

        .eb-img-add-slot:hover { border-color: #d4833a; color: #c07030; background: #fffcf6; }

        /* Drop zone */
        .eb-dropzone {
          padding: 2.5rem 1.5rem; border-radius: 10px;
          border: 2px dashed rgba(196,168,128,0.35);
          background: #faf7f2; cursor: pointer; text-align: center;
          transition: border-color 0.2s, background 0.2s;
        }

        .eb-dropzone:hover, .eb-dropzone.dragging {
          border-color: #d4833a; background: #fffcf6;
        }

        .eb-dropzone-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(212,131,58,0.08); border: 1px solid rgba(212,131,58,0.18);
          display: flex; align-items: center; justify-content: center;
          color: #d4833a; margin: 0 auto 1rem;
        }

        .eb-dropzone-main {
          font-size: 0.88rem; font-weight: 500; color: #18100a; margin-bottom: 0.3rem;
        }

        .eb-dropzone-main span { color: #c07030; text-decoration: underline; }

        .eb-dropzone-sub { font-size: 0.75rem; color: #b8a080; font-weight: 300; }

        .eb-img-footer {
          font-size: 0.72rem; color: #b8a080; font-weight: 300;
        }

        .eb-img-add-text {
          background: none; border: none; cursor: pointer;
          color: #c07030; font-size: inherit; font-family: inherit;
          text-decoration: underline; padding: 0;
        }

        /* ── Submit zone ── */
        .eb-submit-zone {
          padding: 1.5rem 2rem;
          background: #faf7f2;
          border-top: 1px solid rgba(196,168,128,0.15);
          display: flex; align-items: center; gap: 1rem;
        }

        .eb-submit-btn {
          flex: 1; padding: 13px;
          background: #18100a; color: #fffcf6; border: none;
          border-radius: 8px; font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.22s, transform 0.15s, box-shadow 0.22s;
        }

        .eb-submit-btn:hover:not(:disabled) {
          background: #d4833a; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212,131,58,0.25);
        }

        .eb-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        .eb-submit-hint {
          font-size: 0.72rem; color: #b8a080; font-weight: 300; max-width: 200px;
        }

        .eb-spin {
          width: 14px; height: 14px; flex-shrink: 0;
          border: 2px solid rgba(255,252,246,0.25);
          border-top-color: #fffcf6; border-radius: 50%;
          animation: ebspin 0.7s linear infinite;
        }
        @keyframes ebspin { to { transform: rotate(360deg); } }

        /* ── Loading ── */
        .eb-loading {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; min-height: 280px; gap: 1rem;
          color: #9a8270; font-size: 0.84rem; font-weight: 300;
        }

        .eb-spinner {
          width: 32px; height: 32px;
          border: 2px solid rgba(196,168,128,0.25);
          border-top-color: #d4833a; border-radius: 50%;
          animation: ebspin 0.8s linear infinite;
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .eb-grid, .eb-grid-3 { grid-template-columns: 1fr; }
          .eb-section { padding: 1.5rem; }
          .eb-submit-zone { flex-direction: column; align-items: stretch; }
          .eb-submit-hint { max-width: none; text-align: center; }
          .eb-img-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div className="eb-root">
        {/* Page header */}
        <div className="eb-page-head">
          <div className="eb-page-eyebrow">
            <span className="eb-page-eline" />
            {isEdit ? "Update Profile" : "New Profile"}
          </div>
          <h1 className="eb-page-title">
            {isEdit ? "Edit Your Biodata" : "Create Your Biodata"}
          </h1>
          <p className="eb-page-sub">
            {isEdit
              ? "Keep your profile accurate to find the best matches."
              : "Fill in your details to create your matrimonial profile."}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="eb-form">

          {/* ── 01 · Profile Photos ── */}
          <div className="eb-section">
            <SectionHead
              num="01"
              title="Profile Photos"
              desc={`Upload up to ${MAX_IMAGES} photos · Click any photo to set it as primary`}
            />
            <ImageUploader
              existingImages={
                existingBiodata?.profileImages?.length
                  ? existingBiodata.profileImages
                  : existingBiodata?.profileImage
                    ? [existingBiodata.profileImage]
                    : []
              }
              onChange={(previews, primaryIdx) => setImageData({ previews, primaryIdx })}
            />
          </div>

          {/* ── 02 · Basic Information ── */}
          <div className="eb-section">
            <SectionHead num="02" title="Basic Information" desc="Your personal details and physical attributes" />
            <div className="eb-stack">

              <div className="eb-grid">
                <Field label="Biodata Type" required error={errors.biodataType}>
                  <select className={selectCls}
                    {...register("biodataType", { required: "Biodata type is required" })}>
                    <option value="">Select type</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </Field>

                <Field label="Full Name" required error={errors.name}>
                  <input type="text" placeholder="Your full name" className={inputCls}
                    {...register("name", { required: "Name is required" })} />
                </Field>
              </div>

              <div className="eb-grid">
                <Field label="Date of Birth" required error={errors.dob}>
                  <input type="date" className={inputCls}
                    {...register("dob", { required: "Date of birth is required" })} />
                </Field>

                <Field label="Age" hint="Auto-calculated from date of birth">
                  <input type="number" readOnly className={inputCls} placeholder="Auto"
                    {...register("age")} />
                </Field>
              </div>

              <div className="eb-grid-3">
                <Field label="Height">
                  <select className={selectCls} {...register("height")}>
                    <option value="">Select</option>
                    {HEIGHTS.map((h) => <option key={h}>{h}</option>)}
                  </select>
                </Field>
                <Field label="Weight">
                  <select className={selectCls} {...register("weight")}>
                    <option value="">Select</option>
                    {WEIGHTS.map((w) => <option key={w}>{w}</option>)}
                  </select>
                </Field>
                <Field label="Complexion">
                  <select className={selectCls} {...register("race")}>
                    <option value="">Select</option>
                    {RACES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Occupation">
                <select className={selectCls} {...register("occupation")}>
                  <option value="">Select occupation</option>
                  {OCCUPATIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>

            </div>
          </div>

          {/* ── 03 · Family Information ── */}
          <div className="eb-section">
            <SectionHead num="03" title="Family Information" desc="Details about your parents and location" />
            <div className="eb-stack">
              <div className="eb-grid">
                <Field label="Father's Name">
                  <input type="text" placeholder="Father's full name" className={inputCls}
                    {...register("fatherName")} />
                </Field>
                <Field label="Mother's Name">
                  <input type="text" placeholder="Mother's full name" className={inputCls}
                    {...register("motherName")} />
                </Field>
              </div>
              <div className="eb-grid">
                <Field label="Permanent Division">
                  <select className={selectCls} {...register("permanentDivision")}>
                    <option value="">Select division</option>
                    {DIVISIONS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Present Division">
                  <select className={selectCls} {...register("presentDivision")}>
                    <option value="">Select division</option>
                    {DIVISIONS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
              </div>
            </div>
          </div>

          {/* ── 04 · Partner Preferences ── */}
          <div className="eb-section">
            <SectionHead num="04" title="Partner Preferences" desc="What you're looking for in a life partner" />
            <div className="eb-stack">
              <Field label="Expected Partner Age">
                <input type="number" placeholder="e.g. 28" className={inputCls}
                  {...register("expectedPartnerAge")} />
              </Field>
              <div className="eb-grid">
                <Field label="Expected Height">
                  <select className={selectCls} {...register("expectedPartnerHeight")}>
                    <option value="">Select height</option>
                    {HEIGHTS.map((h) => <option key={h}>{h}</option>)}
                  </select>
                </Field>
                <Field label="Expected Weight">
                  <select className={selectCls} {...register("expectedPartnerWeight")}>
                    <option value="">Select weight</option>
                    {WEIGHTS.map((w) => <option key={w}>{w}</option>)}
                  </select>
                </Field>
              </div>
            </div>
          </div>

          {/* ── 05 · Contact Information ── */}
          <div className="eb-section">
            <SectionHead num="05" title="Contact Information" desc="These details are only revealed after a paid request" />
            <div className="eb-stack">
              <Field label="Mobile Number">
                <input type="tel" placeholder="e.g. 01700000000" className={inputCls}
                  {...register("mobileNumber")} />
              </Field>
              <Field label="Email Address" hint="Linked to your account — cannot be changed here">
                <input type="email" value={user?.email || ""} readOnly className={inputCls} />
              </Field>
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="eb-submit-zone">
            <button type="submit" className="eb-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <><span className="eb-spin" /> Saving…</>
              ) : (
                <><FaCheck size={12} /> {isEdit ? "Update Biodata" : "Create Biodata"}</>
              )}
            </button>
            <p className="eb-submit-hint">
              Your contact info is only visible to users with approved requests.
            </p>
          </div>

        </form>
      </div>
    </>
  );
};

export default EditBiodata;