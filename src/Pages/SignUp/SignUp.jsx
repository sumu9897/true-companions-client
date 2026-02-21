import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaCloudUploadAlt } from "react-icons/fa";

const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.photoFile[0]);
      const imgRes = await fetch(IMAGE_HOSTING_API, { method: "POST", body: formData });
      const imgData = await imgRes.json();

      if (!imgData.success) {
        return Swal.fire({
          icon: "error", title: "Image upload failed. Please try again.",
          background: "#fffcf6", color: "#18100a",
        });
      }

      const photoURL = imgData.data.url;
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, photoURL);
      await axiosPublic.post("/users", { name: data.name, email: data.email, photoURL });

      Swal.fire({
        icon: "success", title: "Account Created!",
        text: "Welcome to BandhanBD.",
        timer: 1800, showConfirmButton: false,
        background: "#fffcf6", color: "#18100a", iconColor: "#d4833a",
      });
      reset();
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error", title: "Registration Failed", text: error.message,
        background: "#fffcf6", color: "#18100a",
      });
    }
  };

  return (
    <>
      <Helmet><title>Sign Up — BandhanBD</title></Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .su-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
        }

        /* Left panel */
        .su-panel {
          position: relative; background: #18100a;
          display: flex; flex-direction: column;
          justify-content: flex-end; padding: 3.5rem;
          overflow: hidden;
        }

        .su-panel-bg {
          position: absolute; inset: 0;
          background-image: url('https://i.ibb.co/G7RsbBQ/bgImage.jpg');
          background-size: cover; background-position: center;
          opacity: 0.22;
        }

        .su-panel::before {
          content: '';
          position: absolute; top: 40px; left: 40px;
          width: 100px; height: 100px;
          border-top: 1px solid rgba(212,131,58,0.4);
          border-left: 1px solid rgba(212,131,58,0.4);
          pointer-events: none;
        }

        .su-panel::after {
          content: '';
          position: absolute; bottom: 40px; right: 40px;
          width: 100px; height: 100px;
          border-bottom: 1px solid rgba(212,131,58,0.4);
          border-right: 1px solid rgba(212,131,58,0.4);
          pointer-events: none;
        }

        .su-panel-content { position: relative; z-index: 1; }

        .su-panel-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 700; color: #fffcf6;
          text-decoration: none; letter-spacing: -0.02em;
          display: flex; align-items: center; gap: 7px;
          position: absolute; top: 3.5rem; left: 3.5rem; z-index: 1;
        }

        .su-gem {
          width: 8px; height: 8px;
          background: linear-gradient(135deg, #d4833a, #e8a05a);
          border-radius: 2px; transform: rotate(45deg); flex-shrink: 0;
        }

        .su-panel-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 500; font-style: italic;
          color: #fffcf6; line-height: 1.3; margin-bottom: 1.2rem;
        }

        .su-panel-quote em { color: #d4a06a; font-style: normal; }

        .su-panel-perks {
          display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.5rem;
        }

        .su-perk {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.8rem; color: rgba(255,252,246,0.5); font-weight: 300;
        }

        .su-perk-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #d4833a; flex-shrink: 0;
        }

        /* Right form */
        .su-form-area {
          background: #fffcf6;
          display: flex; align-items: flex-start; justify-content: center;
          padding: 4rem 2rem 3rem; overflow-y: auto;
        }

        .su-form-box { width: 100%; max-width: 400px; }

        .su-eyebrow {
          font-size: 0.65rem; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: #c07030; margin-bottom: 0.6rem;
        }

        .su-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 700; color: #18100a;
          letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.4rem;
        }

        .su-sub {
          font-size: 0.84rem; color: #9a8270; font-weight: 300;
          margin-bottom: 2rem;
        }

        .su-field { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }

        .su-label {
          font-size: 0.67rem; font-weight: 500; letter-spacing: 0.13em;
          text-transform: uppercase; color: #7a6248;
        }

        .su-input-wrap { position: relative; }

        .su-input {
          width: 100%; padding: 11px 14px;
          background: #faf7f2;
          border: 1.5px solid rgba(196,168,128,0.35);
          border-radius: 8px;
          font-size: 0.88rem; font-family: 'DM Sans', sans-serif;
          color: #18100a; outline: none; box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .su-input::placeholder { color: #c0a888; }

        .su-input:focus {
          border-color: #d4833a; background: #fffcf6;
          box-shadow: 0 0 0 3px rgba(212,131,58,0.1);
        }

        .su-input.err { border-color: #c0392b; }
        .su-input.has-toggle { padding-right: 42px; }

        .su-toggle {
          position: absolute; right: 13px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #b8a080; padding: 2px;
          display: flex; align-items: center; transition: color 0.2s;
        }

        .su-toggle:hover { color: #c07030; }

        .su-err-msg {
          font-size: 0.72rem; color: #c0392b; margin-top: 2px;
        }

        /* Photo upload */
        .su-photo-upload {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 10px 14px;
          background: #faf7f2;
          border: 1.5px dashed rgba(196,168,128,0.5);
          border-radius: 8px; cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          position: relative; overflow: hidden;
        }

        .su-photo-upload:hover {
          border-color: #d4833a; background: #fdf8f2;
        }

        .su-photo-upload input[type="file"] {
          position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 2;
        }

        .su-photo-preview {
          width: 36px; height: 36px; border-radius: 6px; object-fit: cover;
          border: 1.5px solid rgba(212,131,58,0.35); flex-shrink: 0;
        }

        .su-photo-icon {
          width: 36px; height: 36px; border-radius: 6px;
          background: #f0e6d6;
          display: flex; align-items: center; justify-content: center;
          color: #c07030; flex-shrink: 0;
        }

        .su-photo-text { display: flex; flex-direction: column; gap: 1px; }
        .su-photo-main { font-size: 0.82rem; font-weight: 500; color: #3d2310; }
        .su-photo-hint { font-size: 0.72rem; color: #b8a080; }

        /* Password strength hints */
        .su-pw-hints {
          display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.4rem;
        }

        .su-pw-hint {
          font-size: 0.65rem; padding: 2px 7px; border-radius: 4px;
          font-weight: 400;
        }

        .su-pw-hint.ok { background: #e8f5e9; color: #2e7d32; }
        .su-pw-hint.no { background: #f5ede0; color: #9a7050; }

        /* Submit */
        .su-submit {
          width: 100%; margin-top: 0.5rem; padding: 13px;
          background: #18100a; color: #fffcf6; border: none;
          border-radius: 8px; font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.22s, transform 0.15s, box-shadow 0.22s;
        }

        .su-submit:hover:not(:disabled) {
          background: #d4833a; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212,131,58,0.28);
        }

        .su-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        .su-spin {
          width: 14px; height: 14px; flex-shrink: 0;
          border: 2px solid rgba(255,252,246,0.25);
          border-top-color: #fffcf6; border-radius: 50%;
          animation: suspin 0.7s linear infinite;
        }
        @keyframes suspin { to { transform: rotate(360deg); } }

        .su-footer {
          text-align: center; margin-top: 1.5rem;
          font-size: 0.82rem; color: #9a8270;
        }

        .su-footer a {
          color: #c07030; font-weight: 500; text-decoration: none;
          transition: color 0.2s;
        }

        .su-footer a:hover { color: #18100a; }

        @media (max-width: 768px) {
          .su-root { grid-template-columns: 1fr; }
          .su-panel { display: none; }
          .su-form-area { padding: 5rem 1.5rem 3rem; }
        }
      `}</style>

      <div className="su-root">
        {/* Left panel */}
        <div className="su-panel">
          <div className="su-panel-bg" />
          <Link to="/" className="su-panel-brand">
            <span className="su-gem" />
            BandhanBD
          </Link>
          <div className="su-panel-content">
            <p className="su-panel-quote">
              Your journey to a<br /><em>meaningful life</em><br />starts here.
            </p>
            <div className="su-panel-perks">
              {[
                "10,000+ verified profiles",
                "7 divisions across Bangladesh",
                "Safe, private & trusted",
                "3,200+ successful marriages",
              ].map((item) => (
                <div key={item} className="su-perk">
                  <span className="su-perk-dot" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="su-form-area">
          <div className="su-form-box">
            <p className="su-eyebrow">Get started</p>
            <h1 className="su-title">Create Account</h1>
            <p className="su-sub">Join thousands of families finding their perfect match</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="su-field">
                <label className="su-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className={`su-input${errors.name ? " err" : ""}`}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="su-err-msg">⚠ {errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="su-field">
                <label className="su-label">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`su-input${errors.email ? " err" : ""}`}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="su-err-msg">⚠ {errors.email.message}</p>}
              </div>

              {/* Photo upload */}
              <div className="su-field">
                <label className="su-label">Profile Photo</label>
                <div className="su-photo-upload">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("photoFile", { required: "Profile photo is required" })}
                    onChange={(e) => {
                      register("photoFile").onChange(e);
                      handlePhotoChange(e);
                    }}
                  />
                  {photoPreview ? (
                    <img src={photoPreview} alt="preview" className="su-photo-preview" />
                  ) : (
                    <div className="su-photo-icon">
                      <FaCloudUploadAlt size={16} />
                    </div>
                  )}
                  <div className="su-photo-text">
                    <span className="su-photo-main">
                      {photoPreview ? "Photo selected ✓" : "Upload your photo"}
                    </span>
                    <span className="su-photo-hint">JPG, PNG · max 5MB</span>
                  </div>
                </div>
                {errors.photoFile && <p className="su-err-msg">⚠ {errors.photoFile.message}</p>}
              </div>

              {/* Password */}
              <div className="su-field">
                <label className="su-label">Password</label>
                <div className="su-input-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    className={`su-input has-toggle${errors.password ? " err" : ""}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Minimum 8 characters" },
                      pattern: {
                        value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                        message: "Must include uppercase, lowercase, and a number",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="su-toggle"
                    onClick={() => setShowPass((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
                <div className="su-pw-hints">
                  {[
                    "8+ characters",
                    "Uppercase",
                    "Lowercase",
                    "Number",
                  ].map((h) => (
                    <span key={h} className="su-pw-hint no">{h}</span>
                  ))}
                </div>
                {errors.password && <p className="su-err-msg">⚠ {errors.password.message}</p>}
              </div>

              <button type="submit" className="su-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><span className="su-spin" /> Creating Account…</>
                ) : (
                  "Create Account →"
                )}
              </button>
            </form>

            <SocialLogin />

            <p className="su-footer">
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;