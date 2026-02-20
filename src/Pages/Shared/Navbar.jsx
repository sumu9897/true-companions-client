import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({ icon: "success", title: "Logged out", timer: 1200, showConfirmButton: false });
        navigate("/");
      })
      .catch(() => {});
  };

  const dashboardPath = isAdmin ? "/dashboard/admin" : "/dashboard/edit-biodata";

  const links = [
    { to: "/", label: "Home" },
    { to: "/biodatapage", label: "Biodatas" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    ...(user ? [{ to: dashboardPath, label: "Dashboard" }] : []),
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .nb { font-family: 'DM Sans', sans-serif; }

        .nb-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(255, 252, 246, 0.96);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(196, 168, 128, 0.22);
          transition: box-shadow 0.3s;
        }

        .nb-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 2.5rem; height: 70px;
          display: flex; align-items: center; justify-content: space-between;
        }

        .nb-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 700;
          color: #18100a; text-decoration: none;
          letter-spacing: -0.02em;
          display: flex; align-items: center; gap: 6px;
        }

        .nb-brand-gem {
          width: 8px; height: 8px; border-radius: 2px;
          background: linear-gradient(135deg, #d4833a, #e8a05a);
          transform: rotate(45deg);
          display: inline-block; flex-shrink: 0;
        }

        .nb-links { display: flex; align-items: center; gap: 2.5rem; list-style: none; margin: 0; padding: 0; }

        .nb-link {
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: #7a6248;
          text-decoration: none; position: relative; padding-bottom: 3px;
          transition: color 0.2s;
        }

        .nb-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px; background: #d4833a;
          transition: width 0.28s cubic-bezier(0.4,0,0.2,1);
        }

        .nb-link:hover, .nb-link-active { color: #18100a; }
        .nb-link:hover::after, .nb-link-active::after { width: 100%; }

        .nb-auth { display: flex; align-items: center; gap: 0.9rem; }

        .nb-chip {
          display: flex; align-items: center; gap: 0.55rem;
          padding: 4px 14px 4px 5px;
          background: #f8eedd; border: 1px solid #e4cba8;
          border-radius: 999px;
        }

        .nb-avatar {
          width: 33px; height: 33px; border-radius: 50%; object-fit: cover;
          border: 1.5px solid #d4833a;
        }

        .nb-uname {
          font-size: 0.82rem; font-weight: 500; color: #3d2310;
          max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        .nb-signout {
          font-size: 0.75rem; font-weight: 500; letter-spacing: 0.07em;
          text-transform: uppercase; color: #9e7553;
          background: none; border: none; cursor: pointer; padding: 0;
          transition: color 0.2s;
        }

        .nb-signout:hover { color: #b93333; }

        .nb-login {
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; color: #fffcf6;
          background: #18100a; border: none;
          padding: 10px 24px; border-radius: 5px;
          cursor: pointer; text-decoration: none;
          transition: background 0.22s, transform 0.15s;
          white-space: nowrap;
        }

        .nb-login:hover { background: #d4833a; transform: translateY(-1px); }

        /* Hamburger */
        .nb-ham {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: 1.5px solid #d9c4a8;
          border-radius: 7px; padding: 7px 9px; cursor: pointer;
          transition: border-color 0.2s;
        }
        .nb-ham:hover { border-color: #d4833a; }

        .nb-bar {
          width: 19px; height: 1.5px; background: #3d2310; border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          transform-origin: center;
        }
        .nb-bar.o1 { transform: translateY(6.5px) rotate(45deg); }
        .nb-bar.o2 { opacity: 0; transform: scaleX(0); }
        .nb-bar.o3 { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile drawer */
        .nb-drawer {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1);
          background: #fffcf6;
          border-top: 1px solid rgba(196, 168, 128, 0.2);
        }
        .nb-drawer.open { max-height: 420px; }

        .nb-drawer-inner {
          padding: 1.5rem 2rem 2rem;
          display: flex; flex-direction: column; gap: 1.25rem;
        }

        .nb-m-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1rem; }
        .nb-m-link {
          font-size: 0.88rem; letter-spacing: 0.08em; text-transform: uppercase;
          font-weight: 500; color: #7a6248; text-decoration: none; transition: color 0.2s;
        }
        .nb-m-link:hover, .nb-m-link-active { color: #18100a; }

        .nb-sep { height: 1px; background: #e8d5b8; }

        @media (max-width: 768px) {
          .nb-dlinks, .nb-auth { display: none !important; }
          .nb-ham { display: flex; }
          .nb-inner { padding: 0 1.25rem; }
        }
      `}</style>

      <nav className="nb-root nb">
        <div className="nb-inner">
          {/* Brand */}
          <Link to="/" className="nb-brand">
            <span className="nb-brand-gem" />
            BandhanBD
          </Link>

          {/* Desktop links */}
          <ul className="nb-links nb-dlinks">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `nb-link${isActive ? " nb-link-active" : ""}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop auth */}
          <div className="nb-auth">
            {user ? (
              <>
                <div className="nb-chip">
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "U")}&background=d4833a&color=fff`
                    }
                    alt={user.displayName}
                    className="nb-avatar"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "U")}&background=d4833a&color=fff`;
                    }}
                  />
                  <span className="nb-uname">{user.displayName}</span>
                </div>
                <button className="nb-signout" onClick={handleLogOut}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="nb-login">Login</Link>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="nb-ham"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`nb-bar${menuOpen ? " o1" : ""}`} />
            <span className={`nb-bar${menuOpen ? " o2" : ""}`} />
            <span className={`nb-bar${menuOpen ? " o3" : ""}`} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`nb-drawer${menuOpen ? " open" : ""}`}>
          <div className="nb-drawer-inner">
            <ul className="nb-m-links">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `nb-m-link${isActive ? " nb-m-link-active" : ""}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="nb-sep" />

            {user ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="nb-chip">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "U")}&background=d4833a&color=fff`}
                    alt={user.displayName}
                    className="nb-avatar"
                  />
                  <span className="nb-uname">{user.displayName}</span>
                </div>
                <button className="nb-signout" onClick={handleLogOut}>Sign Out</button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="nb-login"
                style={{ textAlign: "center", display: "block" }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;