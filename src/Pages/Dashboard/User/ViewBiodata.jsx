import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import {
  FaUser, FaMapMarkerAlt, FaBriefcase, FaPhone,
  FaEnvelope, FaCrown, FaCheckCircle, FaClock,
} from "react-icons/fa";

const Field = ({ label, value }) =>
  value ? (
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="text-gray-800 font-medium mt-0.5">{value}</span>
    </div>
  ) : null;

const ViewBiodata = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: biodata,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas/mine");
      return res.data;
    },
  });

  const handlePremiumRequest = () => {
    Swal.fire({
      title: "Request Premium Status?",
      text: "Your request will be reviewed by an admin. Once approved, your contact details will be visible to other users.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Request Premium",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.post("/biodatas/premium-request");
          queryClient.invalidateQueries(["my-biodata", user?.email]);
          Swal.fire({
            icon: "success",
            title: "Request Sent!",
            text: "Your premium request is pending admin approval.",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Request Failed",
            text: error.response?.data?.message || "Please try again.",
          });
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  if (isError || !biodata) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="text-5xl mb-4">📋</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">No Biodata Found</h2>
        <p className="text-gray-500 mb-6">You haven't created a biodata profile yet.</p>
        <a
          href="/dashboard/edit-biodata"
          className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Create Biodata Now
        </a>
      </div>
    );
  }

  const PremiumBadge = () => {
    if (biodata.premiumStatus === "approved") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
          <FaCheckCircle size={12} /> Premium Approved
        </span>
      );
    }
    if (biodata.premiumStatus === "pending") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full">
          <FaClock size={12} /> Pending Approval
        </span>
      );
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>View Biodata — BandhanBD</title>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Biodata</h1>
            <p className="text-gray-500 text-sm mt-1">Biodata ID: #{biodata.biodataId}</p>
          </div>
          <div className="flex items-center gap-3">
            <PremiumBadge />
            <a
              href="/dashboard/edit-biodata"
              className="text-sm font-semibold text-indigo-600 hover:underline"
            >
              Edit Profile →
            </a>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          <div className="h-24 bg-gradient-to-r from-indigo-600 to-purple-600" />
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-12">
              <img
                src={biodata.profileImage || `https://ui-avatars.com/api/?name=${biodata.name}&size=96&background=4f46e5&color=fff`}
                alt={biodata.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow"
              />
              <div className="pb-1">
                <h2 className="text-xl font-bold text-gray-900">{biodata.name}</h2>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1.5">
                    <FaUser size={11} /> {biodata.biodataType}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaMapMarkerAlt size={11} /> {biodata.permanentDivision}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaBriefcase size={11} /> {biodata.occupation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Personal */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-4">Personal Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Date of Birth" value={biodata.dob} />
              <Field label="Age" value={biodata.age ? `${biodata.age} years` : null} />
              <Field label="Height" value={biodata.height} />
              <Field label="Weight" value={biodata.weight} />
              <Field label="Complexion" value={biodata.race} />
              <Field label="Occupation" value={biodata.occupation} />
            </div>
          </div>

          {/* Family */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-4">Family Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <Field label="Father's Name" value={biodata.fatherName} />
              <Field label="Mother's Name" value={biodata.motherName} />
              <Field label="Permanent Division" value={biodata.permanentDivision} />
              <Field label="Present Division" value={biodata.presentDivision} />
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-4">Partner Preferences</h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expected Age" value={biodata.expectedPartnerAge ? `${biodata.expectedPartnerAge} yrs` : null} />
              <Field label="Expected Height" value={biodata.expectedPartnerHeight} />
              <Field label="Expected Weight" value={biodata.expectedPartnerWeight} />
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-400 shrink-0" />
                <span className="text-sm text-gray-700">{biodata.email}</span>
              </div>
              {biodata.mobileNumber && (
                <div className="flex items-center gap-3">
                  <FaPhone className="text-indigo-400 shrink-0" />
                  <span className="text-sm text-gray-700">{biodata.mobileNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Premium Request CTA */}
        {(!biodata.premiumStatus || biodata.premiumStatus === "none") && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FaCrown className="text-yellow-500" />
                <h3 className="font-bold text-gray-900">Go Premium</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Make your biodata premium so your contact info is visible to other users who purchase access.
              </p>
            </div>
            <button
              onClick={handlePremiumRequest}
              className="shrink-0 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm whitespace-nowrap"
            >
              Request Premium Status
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewBiodata;