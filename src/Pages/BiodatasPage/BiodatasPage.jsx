import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import {
  FaUser, FaMapMarkerAlt, FaBriefcase,
  FaSlidersH, FaTimes, FaChevronDown,
} from "react-icons/fa";

const DIVISIONS = ["Dhaka","Chattagram","Rajshahi","Rangpur","Barisal","Khulna","Mymensingh","Sylhet"];
const ITEMS_PER_PAGE = 20;

const BiodatasPage = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(65);
  const [biodataType, setBiodataType] = useState("");
  const [division, setDivision] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["biodatas", ageMin, ageMax, biodataType, division, currentPage],
    queryFn: async () => {
      const params = { ageMin, ageMax, page: currentPage, limit: ITEMS_PER_PAGE };
      if (biodataType) params.biodataType = biodataType;
      if (division) params.division = division;
      const res = await axiosPublic.get("/biodatas", { params });
      return res.data;
    },
  });

  const biodatas = data?.biodatas || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const hasActive = biodataType || division || ageMin !== 18 || ageMax !== 60;

  const applyFilters = () => { setCurrentPage(1); setDrawerOpen(false); };
  const resetFilters = () => {
    setAgeMin(18); setAgeMax(60); setBiodataType(""); setDivision(""); setCurrentPage(1);
  };
  const viewProfile = (id) => navigate(user ? `/biodata/${id}` : "/login");

  const FilterBody = () => (
    <>
      {/* Age */}
      <div style={{ marginBottom: "1.8rem" }}>
        <p className="bp-flabel">Age Range</p>
        <div className="bp-age-row">
          <span className="bp-age-num">{ageMin}</span>
          <span style={{ color: "rgba(196,168,128,0.4)", fontSize: "0.8rem" }}>–</span>
          <span className="bp-age-num">{ageMax}</span>
          <span style={{ fontSize: "0.7rem", color: "#9a8270", marginLeft: 2 }}>yrs</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div>
            <div className="bp-range-row"><span>Min</span><span className="bp-range-val">{ageMin}</span></div>
            <input type="range" min={18} max={ageMax} value={ageMin}
              onChange={(e) => setAgeMin(+e.target.value)} className="bp-range" />
          </div>
          <div>
            <div className="bp-range-row"><span>Max</span><span className="bp-range-val">{ageMax}</span></div>
            <input type="range" min={ageMin} max={80} value={ageMax}
              onChange={(e) => setAgeMax(+e.target.value)} className="bp-range" />
          </div>
        </div>
      </div>

      {/* Type */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p className="bp-flabel">Biodata Type</p>
        <div className="bp-pills">
          {["", "Male", "Female"].map((t) => (
            <button key={t} className={`bp-pill${biodataType === t ? " on" : ""}`}
              onClick={() => setBiodataType(t)}>{t || "All"}</button>
          ))}
        </div>
      </div>

      {/* Division */}
      <div style={{ marginBottom: "1.8rem" }}>
        <p className="bp-flabel">Division</p>
        <div className="bp-sel-wrap">
          <select value={division} onChange={(e) => setDivision(e.target.value)} className="bp-sel">
            <option value="">All Divisions</option>
            {DIVISIONS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <FaChevronDown style={{ position:"absolute", right:11, top:"50%", transform:"translateY(-50%)", color:"#9a8270", fontSize:"0.6rem", pointerEvents:"none" }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.6rem" }}>
        <button className="bp-btn-apply" onClick={applyFilters}>Apply</button>
        {hasActive && <button className="bp-btn-reset" onClick={resetFilters}>Reset</button>}
      </div>
    </>
  );

  // Smart pagination array
  const paginationPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const arr = [1];
    const lo = Math.max(2, currentPage - 2);
    const hi = Math.min(totalPages - 1, currentPage + 2);
    if (lo > 2) arr.push("…");
    for (let p = lo; p <= hi; p++) arr.push(p);
    if (hi < totalPages - 1) arr.push("…");
    arr.push(totalPages);
    return arr;
  };

  return (
    <>
      <Helmet><title>Browse Biodatas — BandhanBD</title></Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .bp { font-family: 'DM Sans', sans-serif; }

        /* ── Hero ─── */
        .bp-hero {
          background: #18100a; padding: 6rem 2.5rem 2.8rem;
          position: relative; overflow: hidden;
        }
        .bp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 90% at 10% 50%, rgba(212,131,58,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .bp-hero-in { max-width: 1280px; margin: 0 auto; position: relative; }
        .bp-hero-eye {
          font-size: 0.65rem; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: #c07030;
          display: flex; align-items: center; gap: 8px; margin-bottom: 0.65rem;
        }
        .bp-hero-eye span { display: block; width: 22px; height: 1px; background: currentColor; opacity: 0.55; }
        .bp-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 700;
          color: #fffcf6; letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.5rem;
        }
        .bp-hero-sub { font-size: 0.86rem; color: rgba(255,252,246,0.38); font-weight: 300; margin-bottom: 1rem; }
        .bp-hero-pill {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 999px;
          background: rgba(212,131,58,0.1); border: 1px solid rgba(212,131,58,0.22);
          font-size: 0.73rem; color: #d4a06a; font-weight: 500;
        }
        .bp-hero-dot { width: 6px; height: 6px; border-radius: 50%; background: #d4833a; flex-shrink: 0; }

        /* ── Body grid ─── */
        .bp-body {
          max-width: 1280px; margin: 0 auto;
          padding: 2.5rem;
          display: grid;
          grid-template-columns: 252px 1fr;
          gap: 2rem; align-items: start;
        }

        /* ── Sidebar ─── */
        .bp-sidebar {
          background: #fffcf6;
          border: 1px solid rgba(196,168,128,0.22);
          border-radius: 14px; padding: 1.7rem 1.4rem;
          position: sticky; top: 84px;
          box-shadow: 0 2px 16px rgba(180,140,80,0.07);
        }
        .bp-sidebar-hd {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-weight: 700; color: #18100a;
          display: flex; align-items: center; justify-content: space-between;
          padding-bottom: 0.9rem; margin-bottom: 1.4rem;
          border-bottom: 1px solid rgba(196,168,128,0.18);
        }
        .bp-sidebar-clear {
          font-size: 0.7rem; color: #c07030; background: none; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: color 0.2s;
        }
        .bp-sidebar-clear:hover { color: #18100a; }
        .bp-flabel {
          font-size: 0.64rem; font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase; color: #9a8270; margin-bottom: 0.6rem;
        }
        .bp-age-row {
          display: flex; align-items: baseline; gap: 6px;
          margin-bottom: 0.75rem;
        }
        .bp-age-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 700; color: #18100a; line-height: 1;
        }
        .bp-range-row {
          display: flex; justify-content: space-between;
          font-size: 0.68rem; color: #b8a080; margin-bottom: 3px;
        }
        .bp-range-val { color: #c07030; font-weight: 500; }
        .bp-range { width: 100%; height: 3px; accent-color: #d4833a; cursor: pointer; }
        .bp-pills { display: flex; gap: 0.35rem; flex-wrap: wrap; }
        .bp-pill {
          font-size: 0.72rem; font-weight: 500; padding: 5px 12px;
          border-radius: 999px; border: 1px solid rgba(196,168,128,0.32);
          color: #7a6248; background: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.18s;
        }
        .bp-pill:hover { border-color: #d4833a; color: #c07030; }
        .bp-pill.on { background: #18100a; color: #d4a06a; border-color: #18100a; }
        .bp-sel-wrap { position: relative; }
        .bp-sel {
          width: 100%; padding: 9px 30px 9px 11px;
          background: #faf7f2; border: 1.5px solid rgba(196,168,128,0.3);
          border-radius: 7px; font-size: 0.83rem; color: #18100a;
          font-family: 'DM Sans', sans-serif; outline: none; appearance: none;
          cursor: pointer; transition: border-color 0.2s;
        }
        .bp-sel:focus { border-color: #d4833a; }
        .bp-btn-apply {
          flex: 1; padding: 9px; background: #18100a; color: #fffcf6;
          border: none; border-radius: 7px; font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .bp-btn-apply:hover { background: #d4833a; transform: translateY(-1px); }
        .bp-btn-reset {
          padding: 9px 14px; background: none;
          border: 1.5px solid rgba(196,168,128,0.35); border-radius: 7px;
          font-family: 'DM Sans', sans-serif; font-size: 0.76rem; color: #9a8270;
          cursor: pointer; transition: border-color 0.2s, color 0.2s;
        }
        .bp-btn-reset:hover { border-color: #d4833a; color: #c07030; }

        /* ── Mobile bar ─── */
        .bp-mbar {
          display: none; max-width: 1280px; margin: 0 auto;
          padding: 1rem 1.25rem 0; gap: 0.6rem; align-items: center; flex-wrap: wrap;
        }
        .bp-mbar-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 14px; background: #fffcf6;
          border: 1.5px solid rgba(196,168,128,0.3); border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
          color: #3d2310; cursor: pointer; transition: border-color 0.2s;
        }
        .bp-mbar-btn:hover, .bp-mbar-btn.on { border-color: #d4833a; }
        .bp-mbar-btn.on { background: #18100a; color: #d4a06a; }
        .bp-tag {
          display: flex; align-items: center; gap: 5px;
          padding: 4px 10px; background: #f5ede0;
          border: 1px solid rgba(212,131,58,0.25); border-radius: 999px;
          font-size: 0.7rem; color: #7a4a1a; font-weight: 500;
        }
        .bp-tag button { background: none; border: none; cursor: pointer; color: #c07030; padding: 0; display: flex; }

        /* ── Drawer ─── */
        .bp-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 90; }
        .bp-drawer {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
          background: #fffcf6; border-radius: 20px 20px 0 0;
          padding: 1.4rem 1.5rem 2.5rem; max-height: 88vh; overflow-y: auto;
        }
        .bp-drawer-handle {
          width: 36px; height: 4px; background: rgba(196,168,128,0.35);
          border-radius: 2px; margin: 0 auto 1.4rem;
        }
        .bp-drawer-hd {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .bp-drawer-hd p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem; font-weight: 700; color: #18100a;
        }
        .bp-drawer-close {
          background: none; border: none; cursor: pointer; color: #9a8270;
          display: flex; padding: 4px; transition: color 0.2s;
        }
        .bp-drawer-close:hover { color: #c07030; }

        /* ── Results ─── */
        .bp-results-bar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.5rem;
        }
        .bp-results-count { font-size: 0.78rem; color: #9a8270; }
        .bp-results-count strong { color: #18100a; }

        /* ── Card grid ─── */
        .bp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
          gap: 1.2rem;
        }

        /* ── Card ─── */
        .bp-card {
          background: #fffcf6;
          border: 1px solid rgba(196,168,128,0.18);
          border-radius: 13px; overflow: hidden;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          cursor: pointer;
        }
        .bp-card:hover {
          box-shadow: 0 8px 30px rgba(180,140,80,0.13);
          transform: translateY(-3px);
          border-color: rgba(212,131,58,0.28);
        }
        .bp-card-img {
          position: relative; height: 178px;
          background: #f5ede0; overflow: hidden;
        }
        .bp-card-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.4s ease;
        }
        .bp-card:hover .bp-card-img img { transform: scale(1.06); }
        .bp-card-ov {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(24,16,10,0.45) 0%, transparent 50%);
          pointer-events: none;
        }
        .bp-bid {
          position: absolute; top: 9px; left: 9px;
          background: rgba(255,252,246,0.92); backdrop-filter: blur(6px);
          font-size: 0.66rem; font-weight: 700; color: #18100a;
          padding: 3px 9px; border-radius: 999px;
          border: 1px solid rgba(196,168,128,0.28);
        }
        .bp-btype {
          position: absolute; top: 9px; right: 9px;
          font-size: 0.63rem; font-weight: 600; padding: 3px 9px;
          border-radius: 999px; letter-spacing: 0.04em;
        }
        .bp-btype.m { background: rgba(219,234,254,0.92); color: #1e40af; }
        .bp-btype.f { background: rgba(252,231,243,0.92); color: #9d174d; }
        .bp-card-body { padding: 0.95rem 1.05rem 1.05rem; }
        .bp-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.08rem; font-weight: 700; color: #18100a;
          margin-bottom: 0.55rem; line-height: 1.2;
        }
        .bp-card-meta { display: flex; flex-direction: column; gap: 3px; margin-bottom: 0.9rem; }
        .bp-card-mrow {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.76rem; color: #7a6248;
        }
        .bp-card-mrow svg { color: #c07030; flex-shrink: 0; }
        .bp-card-btn {
          width: 100%; padding: 8px;
          background: #18100a; color: #fffcf6;
          border: none; border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.73rem; font-weight: 500; letter-spacing: 0.07em;
          text-transform: uppercase; cursor: pointer;
          transition: background 0.2s;
        }
        .bp-card-btn:hover { background: #d4833a; }

        /* ── Empty ─── */
        .bp-empty {
          grid-column: 1/-1; text-align: center; padding: 5rem 1rem;
        }
        .bp-empty-icon {
          width: 60px; height: 60px; border-radius: 50%;
          background: #f5ede0; margin: 0 auto 1.1rem;
          display: flex; align-items: center; justify-content: center; font-size: 1.6rem;
        }
        .bp-empty-t { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 700; color: #18100a; margin-bottom: 0.35rem; }
        .bp-empty-s { font-size: 0.82rem; color: #9a8270; margin-bottom: 1rem; }
        .bp-empty-link { font-size: 0.78rem; color: #c07030; background: none; border: none; cursor: pointer; text-decoration: underline; }

        /* ── Pagination ─── */
        .bp-pag {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
          margin-top: 2.5rem; padding-top: 1.5rem;
          border-top: 1px solid rgba(196,168,128,0.18);
        }
        .bp-pag-info { font-size: 0.76rem; color: #9a8270; }
        .bp-pag-pages { display: flex; align-items: center; gap: 3px; flex-wrap: wrap; }
        .bp-pg {
          min-width: 32px; height: 32px; padding: 0 6px;
          border-radius: 6px; font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; font-weight: 500; cursor: pointer;
          border: 1.5px solid rgba(196,168,128,0.28);
          background: none; color: #7a6248;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.16s;
        }
        .bp-pg:hover:not(:disabled) { border-color: #d4833a; color: #c07030; }
        .bp-pg.on { background: #18100a; color: #d4a06a; border-color: #18100a; }
        .bp-pg:disabled { opacity: 0.32; cursor: not-allowed; }
        .bp-pg-dots { font-size: 0.78rem; color: #c8b49a; padding: 0 3px; }

        /* ── Background ─── */
        .bp-bg { background: #f7f2ea; min-height: 100vh; }

        /* ── Responsive ─── */
        @media (max-width: 1024px) {
          .bp-body { grid-template-columns: 1fr; }
          .bp-sidebar { display: none; }
          .bp-mbar { display: flex; }
        }
        @media (max-width: 640px) {
          .bp-body { padding: 1.25rem; }
          .bp-hero { padding: 5rem 1.25rem 2rem; }
        }
      `}</style>

      <div className="bp bp-bg">
        {/* Hero */}
        <div className="bp-hero">
          <div className="bp-hero-in">
            <div className="bp-hero-eye">
              <span />{" "}Find Your Match{" "}<span />
            </div>
            <h1 className="bp-hero-title">Browse Biodatas</h1>
            <p className="bp-hero-sub">Every profile verified. Every connection intentional.</p>
            {totalItems > 0 && (
              <div className="bp-hero-pill">
                <span className="bp-hero-dot" />
                {totalItems.toLocaleString()} verified profiles
              </div>
            )}
          </div>
        </div>

        {/* Mobile filter bar */}
        <div className="bp-mbar">
          <button className={`bp-mbar-btn${drawerOpen ? " on" : ""}`} onClick={() => setDrawerOpen(true)}>
            <FaSlidersH size={12} /> Filters{hasActive ? " •" : ""}
          </button>
          {biodataType && (
            <span className="bp-tag">{biodataType}
              <button onClick={() => setBiodataType("")}><FaTimes size={9} /></button>
            </span>
          )}
          {division && (
            <span className="bp-tag">{division}
              <button onClick={() => setDivision("")}><FaTimes size={9} /></button>
            </span>
          )}
          {(ageMin !== 18 || ageMax !== 60) && (
            <span className="bp-tag">Age {ageMin}–{ageMax}
              <button onClick={() => { setAgeMin(18); setAgeMax(60); }}><FaTimes size={9} /></button>
            </span>
          )}
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div className="bp-overlay"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)} />
              <motion.div className="bp-drawer"
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 320 }}>
                <div className="bp-drawer-handle" />
                <div className="bp-drawer-hd">
                  <p>Filter Biodatas</p>
                  <button className="bp-drawer-close" onClick={() => setDrawerOpen(false)}>
                    <FaTimes size={15} />
                  </button>
                </div>
                <FilterBody />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <div className="bp-body">
          {/* Desktop sidebar */}
          <aside className="bp-sidebar">
            <div className="bp-sidebar-hd">
              <span>Filters</span>
              {hasActive && <button className="bp-sidebar-clear" onClick={resetFilters}>Clear all</button>}
            </div>
            <FilterBody />
          </aside>

          {/* Results */}
          <div>
            {isLoading ? (
              <div style={{ padding: "4rem 0", textAlign: "center" }}><Loading /></div>
            ) : isError ? (
              <div className="bp-empty">
                <div className="bp-empty-icon">⚠</div>
                <p className="bp-empty-t">Something went wrong</p>
                <p className="bp-empty-s">Please refresh and try again.</p>
              </div>
            ) : (
              <>
                {biodatas.length > 0 && (
                  <div className="bp-results-bar">
                    <p className="bp-results-count">
                      Showing{" "}
                      <strong>{(currentPage-1)*ITEMS_PER_PAGE+1}–{Math.min(currentPage*ITEMS_PER_PAGE, totalItems)}</strong>
                      {" "}of <strong>{totalItems}</strong> profiles
                    </p>
                  </div>
                )}

                <div className="bp-grid">
                  {biodatas.length > 0 ? (
                    biodatas.map((b, i) => (
                      <motion.div key={b._id} className="bp-card"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.38, delay: Math.min(i * 0.04, 0.36) }}>
                        <div className="bp-card-img">
                          <img
                            src={b.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(b.name)}&size=300&background=f5ede0&color=c07030&bold=true`}
                            alt={b.name}
                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(b.name)}&size=300&background=f5ede0&color=c07030&bold=true`; }}
                          />
                          <div className="bp-card-ov" />
                          <span className="bp-bid">#{b.biodataId}</span>
                          <span className={`bp-btype ${b.biodataType === "Male" ? "m" : "f"}`}>{b.biodataType}</span>
                        </div>
                        <div className="bp-card-body">
                          <h3 className="bp-card-name">{b.name}</h3>
                          <div className="bp-card-meta">
                            <div className="bp-card-mrow"><FaUser size={10} /> Age {b.age}</div>
                            {b.permanentDivision && <div className="bp-card-mrow"><FaMapMarkerAlt size={10} /> {b.permanentDivision}</div>}
                            {b.occupation && <div className="bp-card-mrow"><FaBriefcase size={10} /> {b.occupation}</div>}
                          </div>
                          <button className="bp-card-btn" onClick={() => viewProfile(b._id)}>
                            View Profile →
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="bp-empty">
                      <div className="bp-empty-icon">🔍</div>
                      <p className="bp-empty-t">No profiles found</p>
                      <p className="bp-empty-s">Try adjusting your filters to see more results.</p>
                      <button className="bp-empty-link" onClick={resetFilters}>Clear all filters</button>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bp-pag">
                    <p className="bp-pag-info">Page {currentPage} of {totalPages}</p>
                    <div className="bp-pag-pages">
                      <button className="bp-pg" onClick={() => setCurrentPage(1)} disabled={currentPage===1}>«</button>
                      <button className="bp-pg" onClick={() => setCurrentPage(p=>Math.max(1,p-1))} disabled={currentPage===1}>‹</button>
                      {paginationPages().map((p, i) =>
                        p === "…"
                          ? <span key={`d${i}`} className="bp-pg-dots">…</span>
                          : <button key={p} className={`bp-pg${currentPage===p?" on":""}`} onClick={() => setCurrentPage(p)}>{p}</button>
                      )}
                      <button className="bp-pg" onClick={() => setCurrentPage(p=>Math.min(totalPages,p+1))} disabled={currentPage===totalPages}>›</button>
                      <button className="bp-pg" onClick={() => setCurrentPage(totalPages)} disabled={currentPage===totalPages}>»</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BiodatasPage;