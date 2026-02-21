import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setLoading(true);
    try {
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        timer: 1200,
        showConfirmButton: false,
        background: "#fffcf6",
        color: "#18100a",
        iconColor: "#d4833a",
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
        background: "#fffcf6",
        color: "#18100a",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Login — BandhanBD</title></Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .lg-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
        }

        /* Left decorative panel */
        .lg-panel {
          position: relative;
          background: #18100a;
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: 3.5rem;
          overflow: hidden;
        }

        .lg-panel-bg {
          position: absolute; inset: 0;
          background-image: url('https://i.ibb.co/G7RsbBQ/bgImage.jpg');
          background-size: cover; background-position: center;
          opacity: 0.25;
        }

        /* Geometric accent lines */
        .lg-panel::before {
          content: '';
          position: absolute; top: 40px; left: 40px;
          width: 100px; height: 100px;
          border-top: 1px solid rgba(212,131,58,0.4);
          border-left: 1px solid rgba(212,131,58,0.4);
          pointer-events: none;
        }

        .lg-panel::after {
          content: '';
          position: absolute; bottom: 40px; right: 40px;
          width: 100px; height: 100px;
          border-bottom: 1px solid rgba(212,131,58,0.4);
          border-right: 1px solid rgba(212,131,58,0.4);
          pointer-events: none;
        }

        .lg-panel-content { position: relative; z-index: 1; }

        .lg-panel-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 700; color: #fffcf6;
          text-decoration: none; letter-spacing: -0.02em;
          display: flex; align-items: center; gap: 7px;
          position: absolute; top: 3.5rem; left: 3.5rem; z-index: 1;
        }

        .lg-panel-gem {
          width: 8px; height: 8px;
          background: linear-gradient(135deg, #d4833a, #e8a05a);
          border-radius: 2px; transform: rotate(45deg);
          flex-shrink: 0;
        }

        .lg-panel-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 500; font-style: italic;
          color: #fffcf6; line-height: 1.3;
          margin-bottom: 1.2rem;
        }

        .lg-panel-quote em { color: #d4a06a; font-style: normal; }

        .lg-panel-sub {
          font-size: 0.82rem; color: rgba(255,252,246,0.45);
          font-weight: 300; letter-spacing: 0.04em;
        }

        /* Right: form area */
        .lg-form-area {
          background: #fffcf6;
          display: flex; align-items: center; justify-content: center;
          padding: 3rem 2rem;
        }

        .lg-form-box { width: 100%; max-width: 400px; }

        .lg-form-eyebrow {
          font-size: 0.65rem; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: #c07030; margin-bottom: 0.6rem;
        }

        .lg-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 700; color: #18100a;
          letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.4rem;
        }

        .lg-form-sub {
          font-size: 0.84rem; color: #9a8270; font-weight: 300;
          margin-bottom: 2.2rem;
        }

        /* Field */
        .lg-field { display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1.1rem; }

        .lg-label {
          font-size: 0.68rem; font-weight: 500; letter-spacing: 0.13em;
          text-transform: uppercase; color: #7a6248;
        }

        .lg-input-wrap { position: relative; }

        .lg-input {
          width: 100%; padding: 11px 14px;
          background: #faf7f2;
          border: 1.5px solid rgba(196,168,128,0.35);
          border-radius: 8px;
          font-size: 0.88rem; font-family: 'DM Sans', sans-serif;
          color: #18100a; outline: none; box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .lg-input::placeholder { color: #c0a888; }

        .lg-input:focus {
          border-color: #d4833a;
          background: #fffcf6;
          box-shadow: 0 0 0 3px rgba(212,131,58,0.1);
        }

        .lg-input.has-toggle { padding-right: 42px; }

        .lg-toggle {
          position: absolute; right: 13px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #b8a080; padding: 2px;
          display: flex; align-items: center;
          transition: color 0.2s;
        }

        .lg-toggle:hover { color: #c07030; }

        /* Submit */
        .lg-submit {
          width: 100%; margin-top: 0.4rem; padding: 13px;
          background: #18100a; color: #fffcf6; border: none;
          border-radius: 8px; font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.22s, transform 0.15s, box-shadow 0.22s;
        }

        .lg-submit:hover:not(:disabled) {
          background: #d4833a; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(212,131,58,0.28);
        }

        .lg-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        .lg-spin {
          width: 14px; height: 14px; flex-shrink: 0;
          border: 2px solid rgba(255,252,246,0.25);
          border-top-color: #fffcf6; border-radius: 50%;
          animation: lgspin 0.7s linear infinite;
        }
        @keyframes lgspin { to { transform: rotate(360deg); } }

        /* Footer link */
        .lg-footer {
          text-align: center; margin-top: 1.5rem;
          font-size: 0.82rem; color: #9a8270;
        }

        .lg-footer a {
          color: #c07030; font-weight: 500; text-decoration: none;
          transition: color 0.2s;
        }

        .lg-footer a:hover { color: #18100a; }

        /* Mobile: stack */
        @media (max-width: 768px) {
          .lg-root { grid-template-columns: 1fr; }
          .lg-panel { display: none; }
          .lg-form-area { padding: 5rem 1.5rem 3rem; align-items: flex-start; }
        }
      `}</style>

      <div className="lg-root">
        {/* Left decorative panel */}
        <div className="lg-panel">
          <div className="lg-panel-bg" />
          <Link to="/" className="lg-panel-brand">
            <span className="lg-panel-gem" />
            BandhanBD
          </Link>
          <div className="lg-panel-content">
            <p className="lg-panel-quote">
              Every great love story<br />begins with a <em>single step.</em>
            </p>
            <p className="lg-panel-sub">
              Thousands of families found their match here.
            </p>
          </div>
        </div>

        {/* Right form area */}
        <div className="lg-form-area">
          <div className="lg-form-box">
            <p className="lg-form-eyebrow">Welcome back</p>
            <h1 className="lg-form-title">Sign In</h1>
            <p className="lg-form-sub">Enter your credentials to access your account</p>

            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="lg-field">
                <label className="lg-label">Email Address</label>
                <div className="lg-input-wrap">
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="lg-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="lg-field">
                <label className="lg-label">Password</label>
                <div className="lg-input-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    required
                    className="lg-input has-toggle"
                  />
                  <button
                    type="button"
                    className="lg-toggle"
                    onClick={() => setShowPass((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="lg-submit" disabled={loading}>
                {loading ? (
                  <><span className="lg-spin" /> Signing in…</>
                ) : (
                  "Sign In →"
                )}
              </button>
            </form>

            <SocialLogin />

            <p className="lg-footer">
              New to BandhanBD?{" "}
              <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;