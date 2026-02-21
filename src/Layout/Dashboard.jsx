import { useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import {
  FaEdit, FaEye, FaEnvelope, FaHeart, FaCheckCircle,
  FaUsers, FaClipboardCheck, FaUserShield, FaClipboardList,
  FaBars, FaTimes, FaSignOutAlt, FaTachometerAlt, FaHome,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogOut = () => {
    Swal.fire({
      title: "Sign out?",
      text: "You will be signed out of your account.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d4833a",
      cancelButtonColor: "#3d2310",
      confirmButtonText: "Yes, sign out",
      background: "#fffcf6",
      color: "#18100a",
    }).then((result) => {
      if (result.isConfirmed) logOut().then(() => navigate("/"));
    });
  };

  const adminNav = [
    { to: "/dashboard/admin",                 icon: FaTachometerAlt, label: "Overview"          },
    { to: "/dashboard/manage",                icon: FaUsers,         label: "Manage Users"      },
    { to: "/dashboard/approvedPremium",       icon: FaClipboardCheck,label: "Approve Premium"   },
    { to: "/dashboard/approvedContactRequest",icon: FaClipboardList, label: "Contact Requests"  },
  ];

  const userNav = [
    { to: "/dashboard/edit-biodata",   icon: FaEdit,        label: "Edit Biodata"         },
    { to: "/dashboard/view-biodata",   icon: FaEye,         label: "View Biodata"         },
    { to: "/dashboard/contact-request",icon: FaEnvelope,    label: "Contact Requests"     },
    { to: "/dashboard/my-favourites",  icon: FaHeart,       label: "My Favourites"        },
    { to: "/dashboard/got-married",    icon: FaCheckCircle, label: "Got Married"          },
  ];

  const navItems = isAdmin ? adminNav : userNav;

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="db-brand">
        <Link to="/" className="db-brand-link">
          <span className="db-gem" />
          <span className="db-brand-name">BandhanBD</span>
        </Link>
        <span className="db-brand-role">
          {isAdmin ? "Admin Panel" : "User Dashboard"}
        </span>
      </div>

      {/* User pill */}
      {user && (
        <div className="db-user-pill">
          <img
            src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "U")}&background=3d2310&color=d4a06a&bold=true`}
            alt={user.displayName}
            className="db-user-avatar"
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=U&background=3d2310&color=d4a06a&bold=true`; }}
          />
          <div className="db-user-info">
            <p className="db-user-name">{user.displayName || "User"}</p>
            <p className="db-user-email">{user.email}</p>
          </div>
        </div>
      )}

      {/* Section label */}
      <p className="db-nav-section">
        {isAdmin ? "Administration" : "My Account"}
      </p>

      {/* Nav */}
      <nav className="db-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `db-nav-link${isActive ? " active" : ""}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="db-nav-icon"><Icon size={14} /></span>
            <span className="db-nav-label">{label}</span>
            <span className="db-nav-arrow">›</span>
          </NavLink>
        ))}
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom actions */}
      <div className="db-bottom">
        <Link to="/" className="db-bottom-link">
          <FaHome size={13} /> Back to Site
        </Link>
        <button className="db-bottom-link logout" onClick={handleLogOut}>
          <FaSignOutAlt size={13} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .db-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          background: #f7f2ea;
        }

        /* ── SIDEBAR ── */
        .db-sidebar {
          width: 240px;
          flex-shrink: 0;
          background: #18100a;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
          overflow-y: auto;
          border-right: 1px solid rgba(212,131,58,0.12);
          scrollbar-width: none;
        }

        .db-sidebar::-webkit-scrollbar { display: none; }

        /* Mobile sidebar */
        .db-sidebar-mobile {
          position: fixed; top: 0; left: 0;
          width: 260px; height: 100vh; z-index: 50;
          background: #18100a;
          display: flex; flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          border-right: 1px solid rgba(212,131,58,0.12);
          overflow-y: auto; scrollbar-width: none;
        }

        .db-sidebar-mobile::-webkit-scrollbar { display: none; }
        .db-sidebar-mobile.open { transform: translateX(0); }

        /* overlay */
        .db-overlay {
          display: none; position: fixed; inset: 0;
          background: rgba(0,0,0,0.55); z-index: 40;
          backdrop-filter: blur(2px);
        }
        .db-overlay.show { display: block; }

        /* ── Brand ── */
        .db-brand {
          padding: 1.6rem 1.5rem 1.2rem;
          border-bottom: 1px solid rgba(212,131,58,0.1);
          display: flex; flex-direction: column; gap: 4px;
        }

        .db-brand-link {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none;
        }

        .db-gem {
          width: 8px; height: 8px; flex-shrink: 0;
          background: linear-gradient(135deg, #d4833a, #e8a05a);
          border-radius: 2px; transform: rotate(45deg);
        }

        .db-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem; font-weight: 700; color: #fffcf6;
          letter-spacing: -0.02em;
        }

        .db-brand-role {
          font-size: 0.62rem; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(212,131,58,0.55);
          padding-left: 16px; font-weight: 500;
        }

        /* ── User pill ── */
        .db-user-pill {
          display: flex; align-items: center; gap: 10px;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(212,131,58,0.08);
          background: rgba(212,131,58,0.04);
        }

        .db-user-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          object-fit: cover; flex-shrink: 0;
          border: 1.5px solid rgba(212,131,58,0.3);
        }

        .db-user-info { min-width: 0; }

        .db-user-name {
          font-size: 0.8rem; font-weight: 600; color: #fffcf6;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .db-user-email {
          font-size: 0.65rem; color: rgba(255,252,246,0.28);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-weight: 300;
        }

        /* ── Nav section label ── */
        .db-nav-section {
          font-size: 0.58rem; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,252,246,0.2);
          padding: 1.2rem 1.5rem 0.5rem;
        }

        /* ── Nav ── */
        .db-nav {
          display: flex; flex-direction: column; gap: 2px;
          padding: 0.25rem 0.6rem;
        }

        .db-nav-link {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px;
          border-radius: 7px;
          font-size: 0.8rem; font-weight: 400; color: rgba(255,252,246,0.45);
          text-decoration: none;
          transition: background 0.18s, color 0.18s;
          position: relative;
        }

        .db-nav-link:hover {
          background: rgba(212,131,58,0.08);
          color: rgba(255,252,246,0.75);
        }

        .db-nav-link.active {
          background: rgba(212,131,58,0.13);
          color: #fffcf6;
          border: 1px solid rgba(212,131,58,0.18);
        }

        .db-nav-icon {
          width: 28px; height: 28px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,252,246,0.04);
          color: inherit; flex-shrink: 0;
          transition: background 0.18s, color 0.18s;
        }

        .db-nav-link:hover .db-nav-icon { background: rgba(212,131,58,0.12); color: #d4a06a; }
        .db-nav-link.active .db-nav-icon { background: rgba(212,131,58,0.2); color: #d4833a; }

        .db-nav-label { flex: 1; }

        .db-nav-arrow {
          font-size: 0.9rem; color: rgba(255,252,246,0.15);
          opacity: 0; transform: translateX(-4px);
          transition: opacity 0.18s, transform 0.18s, color 0.18s;
        }

        .db-nav-link:hover .db-nav-arrow { opacity: 1; transform: translateX(0); color: rgba(212,131,58,0.5); }
        .db-nav-link.active .db-nav-arrow { opacity: 1; transform: translateX(0); color: #d4833a; }

        /* Active left accent bar */
        .db-nav-link.active::before {
          content: '';
          position: absolute; left: -0.6rem; top: 25%; bottom: 25%;
          width: 2px; border-radius: 999px;
          background: #d4833a;
        }

        /* ── Bottom ── */
        .db-bottom {
          padding: 0.75rem 0.6rem 1.2rem;
          border-top: 1px solid rgba(212,131,58,0.08);
          display: flex; flex-direction: column; gap: 2px;
        }

        .db-bottom-link {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 7px;
          font-size: 0.78rem; font-weight: 400;
          color: rgba(255,252,246,0.28);
          text-decoration: none; background: none; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.18s, color 0.18s; text-align: left;
          width: 100%;
        }

        .db-bottom-link:hover { background: rgba(255,252,246,0.04); color: rgba(255,252,246,0.55); }
        .db-bottom-link.logout:hover { background: rgba(200,60,60,0.08); color: #e87070; }

        /* ── TOPBAR (mobile) ── */
        .db-topbar {
          display: none;
          position: sticky; top: 0; z-index: 30;
          background: #fffcf6;
          border-bottom: 1px solid rgba(196,168,128,0.25);
          padding: 0 1.25rem;
          height: 56px; align-items: center; justify-content: space-between;
          box-shadow: 0 1px 12px rgba(180,140,80,0.07);
        }

        .db-topbar-left { display: flex; align-items: center; gap: 10px; }

        .db-topbar-menu {
          width: 36px; height: 36px; border-radius: 8px;
          background: none; border: 1.5px solid rgba(196,168,128,0.3);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #7a6248; transition: border-color 0.2s, color 0.2s;
        }

        .db-topbar-menu:hover { border-color: #d4833a; color: #c07030; }

        .db-topbar-brand {
          display: flex; align-items: center; gap: 7px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; color: #18100a;
          text-decoration: none; letter-spacing: -0.02em;
        }

        .db-topbar-gem {
          width: 7px; height: 7px;
          background: linear-gradient(135deg, #d4833a, #e8a05a);
          border-radius: 1px; transform: rotate(45deg); flex-shrink: 0;
        }

        /* ── MAIN CONTENT ── */
        .db-content {
          flex: 1; min-width: 0;
          display: flex; flex-direction: column;
        }

        .db-main {
          flex: 1;
          padding: 2rem;
          max-width: 1200px;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .db-sidebar { display: none; }
          .db-topbar { display: flex; }
          .db-main { padding: 1.5rem 1.25rem; }
        }
      `}</style>

      <div className="db-root">
        {/* Desktop sidebar */}
        <aside className="db-sidebar">
          <SidebarContent />
        </aside>

        {/* Mobile overlay */}
        <div
          className={`db-overlay${sidebarOpen ? " show" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Mobile sidebar */}
        <aside className={`db-sidebar-mobile${sidebarOpen ? " open" : ""}`}>
          <SidebarContent />
        </aside>

        {/* Main */}
        <div className="db-content">
          {/* Mobile topbar */}
          <header className="db-topbar">
            <div className="db-topbar-left">
              <button
                className="db-topbar-menu"
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {sidebarOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
              </button>
              <Link to="/" className="db-topbar-brand">
                <span className="db-topbar-gem" />
                BandhanBD
              </Link>
            </div>
            {user && (
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=U&background=3d2310&color=d4a06a&bold=true`}
                alt="avatar"
                style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid rgba(212,131,58,0.3)", objectFit: "cover" }}
              />
            )}
          </header>

          <main className="db-main">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;