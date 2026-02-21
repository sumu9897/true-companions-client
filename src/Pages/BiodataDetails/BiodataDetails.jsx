import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import {
  FaUser, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt,
  FaPhone, FaEnvelope, FaHeart, FaLock, FaCrown,
} from "react-icons/fa";

const Field = ({ label, value }) =>
  value ? (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  ) : null;

const BiodataDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  // Fetch biodata details (contact info conditionally returned by server)
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

  const handleAddToFavourites = async () => {
    try {
      await axiosSecure.post("/favourites", { biodataMongoId: id });
      Swal.fire({
        icon: "success",
        title: "Added to Favourites",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Already in Favourites",
        text: "This biodata is already saved in your favourites.",
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

  const contactVisible = !!(biodata.contactEmail || biodata.mobileNumber);

  return (
    <>
      <Helmet>
        <title>{biodata.name} — BandhanBD</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600" />
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
                <img
                  src={biodata.profileImage || `https://ui-avatars.com/api/?name=${biodata.name}&size=128&background=4f46e5&color=fff`}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column: all biodata fields */}
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

            {/* Right column: contact & actions */}
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

              {/* Actions */}
              <button
                onClick={handleAddToFavourites}
                className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-sm rounded-xl border border-rose-200 transition-colors"
              >
                <FaHeart /> Add to Favourites
              </button>
            </div>
          </div>

          {/* Similar Biodatas */}
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
                      src={similar.profileImage || `https://ui-avatars.com/api/?name=${similar.name}&size=80&background=e0e7ff&color=4f46e5`}
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