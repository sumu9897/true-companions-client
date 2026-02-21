import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import {
  FaUser, FaMapMarkerAlt, FaBriefcase,
  FaPhone, FaEnvelope, FaHeart, FaLock, FaCrown,
} from "react-icons/fa";

// ── Field component ──────────────────────────────────────────────────────────
const Field = ({ label, value }) =>
  value ? (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  ) : null;

// ── Image Gallery component ──────────────────────────────────────────────────
const ImageGallery = ({ images, name }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images?.length) return null;

  return (
    <div>
      {/* Main image */}
      <div className="relative w-full rounded-xl overflow-hidden bg-gray-100 mb-3" style={{ aspectRatio: "4/3" }}>
        <img
          src={images[activeIdx]}
          alt={`${name} photo ${activeIdx + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Counter badge */}
        <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
          {activeIdx + 1} / {images.length}
        </span>
        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIdx((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors text-sm"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              onClick={() => setActiveIdx((prev) => (prev + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors text-sm"
              aria-label="Next photo"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                i === activeIdx
                  ? "border-indigo-500 shadow-md scale-105"
                  : "border-gray-200 hover:border-indigo-300 opacity-70 hover:opacity-100"
              }`}
              aria-label={`View photo ${i + 1}`}
            >
              <img src={url} alt={`thumb-${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const BiodataDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  // Fetch biodata details
  const {
    data: biodata,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["biodata-detail", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodatas/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch similar biodatas (same type, max 3)
  const { data: similarData } = useQuery({
    queryKey: ["similar-biodatas", biodata?.biodataType],
    queryFn: async () => {
      const res = await axiosPublic.get("/biodatas", {
        params: { biodataType: biodata.biodataType, limit: 6 },
      });
      return res.data.biodatas.filter((b) => b._id !== id).slice(0, 3);
    },
    enabled: !!biodata?.biodataType,
  });

  // Check if already in favourites
  const { data: isFavourite, refetch: refetchFavourite } = useQuery({
    queryKey: ["is-favourite", id, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/favourites/check", {
        params: { biodataMongoId: id },
      });
      return res.data.isFavourite; // expects: { isFavourite: true/false }
    },
    enabled: !!id && !!user?.email,
    retry: false,
  });

  const handleAddToFavourites = async () => {
    try {
      await axiosSecure.post("/favourites", { biodataMongoId: id });
      refetchFavourite(); // instantly update button state
      Swal.fire({
        icon: "success",
        title: "Added to Favourites",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  if (isLoading) return <Loading />;
  if (isError || !biodata)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">
        Biodata not found.
      </div>
    );

  // Resolve image array — support both profileImages[] and legacy profileImage
  const allImages =
    biodata.profileImages?.length
      ? biodata.profileImages
      : biodata.profileImage
      ? [biodata.profileImage]
      : [];

  const primaryImage =
    allImages[0] ||
    `https://ui-avatars.com/api/?name=${biodata.name}&size=128&background=4f46e5&color=fff`;

  const contactVisible = !!(biodata.contactEmail || biodata.mobileNumber);

  return (
    <>
      <Helmet>
        <title>{biodata.name} — BandhanBD</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 md:px-8">

          {/* ── Profile Header ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600" />
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
                <img
                  src={primaryImage}
                  alt={biodata.name}
                  className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white shadow"
                />
                <div className="flex-1 pt-4 sm:pt-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">{biodata.name}</h1>
                    {biodata.isPremium && (
                      <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <FaCrown size={10} /> Premium
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FaUser size={12} /> {biodata.biodataType} · Age {biodata.age}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaMapMarkerAlt size={12} /> {biodata.permanentDivision}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaBriefcase size={12} /> {biodata.occupation}
                    </span>
                  </div>
                </div>
                <span className="hidden sm:block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  Biodata ID #{biodata.biodataId}
                </span>
              </div>
            </div>
          </div>

          {/* ── Photo Gallery ── */}
          {allImages.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-4">
                Photos
                <span className="ml-2 text-xs font-normal text-gray-400">
                  ({allImages.length} {allImages.length === 1 ? "photo" : "photos"})
                </span>
              </h2>
              <ImageGallery images={allImages} name={biodata.name} />
            </div>
          )}

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Left column */}
            <div className="md:col-span-2 space-y-6">

              {/* Personal Info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Date of Birth" value={biodata.dob} />
                  <Field label="Age" value={biodata.age ? `${biodata.age} years` : null} />
                  <Field label="Height" value={biodata.height} />
                  <Field label="Weight" value={biodata.weight} />
                  <Field label="Occupation" value={biodata.occupation} />
                  <Field label="Race / Complexion" value={biodata.race} />
                </div>
              </div>

              {/* Family Info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 mb-4">Family Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Father's Name" value={biodata.fatherName} />
                  <Field label="Mother's Name" value={biodata.motherName} />
                  <Field label="Permanent Division" value={biodata.permanentDivision} />
                  <Field label="Present Division" value={biodata.presentDivision} />
                </div>
              </div>

              {/* Partner Preferences */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 mb-4">Partner Preferences</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expected Age" value={biodata.expectedPartnerAge ? `${biodata.expectedPartnerAge} years` : null} />
                  <Field label="Expected Height" value={biodata.expectedPartnerHeight} />
                  <Field label="Expected Weight" value={biodata.expectedPartnerWeight} />
                </div>
              </div>

            </div>

            {/* Right column */}
            <div className="space-y-4">

              {/* Contact Info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 mb-4">Contact Information</h2>

                {contactVisible ? (
                  <div className="space-y-3">
                    {biodata.contactEmail && (
                      <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                        <FaEnvelope className="text-indigo-500 shrink-0" />
                        <span className="text-sm text-gray-700 break-all">{biodata.contactEmail}</span>
                      </div>
                    )}
                    {biodata.mobileNumber && (
                      <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                        <FaPhone className="text-indigo-500 shrink-0" />
                        <span className="text-sm text-gray-700">{biodata.mobileNumber}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <FaLock className="mx-auto text-gray-300 mb-3" size={32} />
                    <p className="text-sm text-gray-500 mb-4">
                      Contact details are only available to premium members or after purchase.
                    </p>
                    <button
                      onClick={() => navigate(`/checkout/${id}`)}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      Request Contact Info — $5
                    </button>
                  </div>
                )}
              </div>

              {/* ── Favourite Button ── */}
              {isFavourite ? (
                <button
                  disabled
                  title="Already saved in your favourites"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-300 font-semibold text-sm rounded-xl border border-rose-200 cursor-not-allowed select-none"
                >
                  <FaHeart /> Already in Favourites
                </button>
              ) : (
                <button
                  onClick={handleAddToFavourites}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-sm rounded-xl border border-rose-200 transition-colors"
                >
                  <FaHeart /> Add to Favourites
                </button>
              )}

            </div>
          </div>

          {/* ── Similar Profiles ── */}
          {similarData?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Similar Profiles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {similarData.map((similar) => (
                  <div
                    key={similar._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/biodata/${similar._id}`)}
                  >
                    <img
                      src={
                        similar.profileImages?.[0] ||
                        similar.profileImage ||
                        `https://ui-avatars.com/api/?name=${similar.name}&size=80&background=e0e7ff&color=4f46e5`
                      }
                      alt={similar.name}
                      className="w-16 h-16 rounded-xl object-cover mb-3"
                    />
                    <h3 className="font-bold text-gray-900 text-sm">{similar.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Age {similar.age} · {similar.occupation}</p>
                    <p className="text-xs text-indigo-500 mt-1">ID #{similar.biodataId}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default BiodataDetails;