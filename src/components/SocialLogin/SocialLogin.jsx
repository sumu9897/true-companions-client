import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      await axiosPublic.post("/users", {
        email: result.user?.email,
        name: result.user?.displayName,
        photoURL: result.user?.photoURL,
      });
      Swal.fire({
        icon: "success",
        title: "Signed in with Google!",
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
        title: "Google Sign-in Failed",
        text: error.message,
        background: "#fffcf6",
        color: "#18100a",
      });
    }
  };

  return (
    <div style={{ marginTop: "1.5rem" }}>
      {/* Divider */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        margin: "0 0 1.25rem",
      }}>
        <div style={{ flex: 1, height: "1px", background: "rgba(196,168,128,0.25)" }} />
        <span style={{
          fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "#b8a48a",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          or continue with
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(196,168,128,0.25)" }} />
      </div>

      {/* Google button */}
      <button
        onClick={handleGoogleSignIn}
        style={{
          width: "100%",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          padding: "11px 20px",
          background: "#ffffff",
          border: "1.5px solid rgba(196,168,128,0.35)",
          borderRadius: "8px",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.84rem", fontWeight: 500, color: "#3d2310",
          transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#d4833a";
          e.currentTarget.style.background = "#fdf8f2";
          e.currentTarget.style.boxShadow = "0 2px 12px rgba(212,131,58,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(196,168,128,0.35)";
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Google "G" logo in brand colors */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;