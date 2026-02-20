import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;

const DIVISIONS = ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];
const HEIGHTS = ["4'6\"","4'8\"","4'10\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"","5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"","6'1\"","6'2\""];
const WEIGHTS = ["40 kg","45 kg","50 kg","55 kg","60 kg","65 kg","70 kg","75 kg","80 kg","85 kg","90 kg"];
const OCCUPATIONS = ["Student", "Job", "House wife", "Business", "Doctor", "Engineer", "Teacher", "Other"];
const RACES = ["Fair", "Wheatish", "Dark"];

const FormField = ({ label, required, error, children }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch existing biodata (if any)
  const { data: existingBiodata, isLoading: isFetching } = useQuery({
    queryKey: ["my-biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/biodatas/mine");
        return res.data;
      } catch {
        return null;
      }
    },
  });

  // Pre-fill form with existing biodata
  useEffect(() => {
    if (existingBiodata) {
      const fields = [
        "biodataType", "name", "dob", "height", "weight",
        "occupation", "race", "fatherName", "motherName",
        "permanentDivision", "presentDivision", "expectedPartnerAge",
        "expectedPartnerHeight", "expectedPartnerWeight", "mobileNumber",
      ];
      fields.forEach((f) => setValue(f, existingBiodata[f] || ""));
    } else {
      setValue("name", user?.displayName || "");
      setValue("email", user?.email || "");
    }
  }, [existingBiodata, user, setValue]);

  // Auto-calculate age from DOB
  const dob = watch("dob");
  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
      if (age > 0) setValue("age", age);
    }
  }, [dob, setValue]);

  const onSubmit = async (data) => {
    try {
      let profileImage = existingBiodata?.profileImage || "";

      // Upload new image only if a new file was selected
      if (data.imageFile?.[0]) {
        const formData = new FormData();
        formData.append("image", data.imageFile[0]);
        const imgRes = await axiosPublic.post(IMAGE_HOSTING_API, formData, {
          headers: { "content-type": "multipart/form-data" },
        });
        if (!imgRes.data.success) {
          return Swal.fire({ icon: "error", title: "Image upload failed" });
        }
        profileImage = imgRes.data.data.url;
      }

      const biodataPayload = {
        biodataType: data.biodataType,
        name: data.name,
        profileImage,
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
        // Update existing biodata
        await axiosSecure.put(`/biodatas/${user.email}`, biodataPayload);
        Swal.fire({ icon: "success", title: "Biodata Updated!", timer: 1500, showConfirmButton: false });
      } else {
        // Create new biodata
        await axiosSecure.post("/biodatas", biodataPayload);
        Swal.fire({ icon: "success", title: "Biodata Created!", timer: 1500, showConfirmButton: false });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to save biodata",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  const selectClass =
    "w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white";
  const inputClass =
    "w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{existingBiodata ? "Edit Biodata" : "Create Biodata"} — BandhanBD</title>
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {existingBiodata ? "Edit Your Biodata" : "Create Your Biodata"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {existingBiodata
              ? "Update your profile information below."
              : "Fill in your details to create your matrimonial profile."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6"
        >
          {/* Section: Basic Info */}
          <div>
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <FormField label="Biodata Type" required error={errors.biodataType}>
                <select
                  {...register("biodataType", { required: "Biodata type is required" })}
                  className={selectClass}
                >
                  <option value="">Select type</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </FormField>

              <FormField label="Full Name" required error={errors.name}>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name", { required: "Name is required" })}
                  className={inputClass}
                />
              </FormField>

              <FormField label="Profile Image">
                <input
                  type="file"
                  accept="image/*"
                  {...register("imageFile")}
                  className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:font-medium"
                />
                {existingBiodata?.profileImage && (
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={existingBiodata.profileImage}
                      alt="Current"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="text-xs text-gray-500">Current image (upload new to replace)</span>
                  </div>
                )}
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Date of Birth" required error={errors.dob}>
                  <input
                    type="date"
                    {...register("dob", { required: "Date of birth is required" })}
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Age (auto-calculated)">
                  <input
                    type="number"
                    {...register("age")}
                    readOnly
                    className={`${inputClass} bg-gray-50 cursor-not-allowed`}
                    placeholder="Auto"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Height">
                  <select {...register("height")} className={selectClass}>
                    <option value="">Select height</option>
                    {HEIGHTS.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                </FormField>
                <FormField label="Weight">
                  <select {...register("weight")} className={selectClass}>
                    <option value="">Select weight</option>
                    {WEIGHTS.map((w) => <option key={w} value={w}>{w}</option>)}
                  </select>
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Occupation">
                  <select {...register("occupation")} className={selectClass}>
                    <option value="">Select occupation</option>
                    {OCCUPATIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </FormField>
                <FormField label="Complexion">
                  <select {...register("race")} className={selectClass}>
                    <option value="">Select complexion</option>
                    {RACES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </FormField>
              </div>
            </div>
          </div>

          {/* Section: Family Info */}
          <div>
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">
              Family Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Father's Name">
                  <input
                    type="text"
                    placeholder="Father's full name"
                    {...register("fatherName")}
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Mother's Name">
                  <input
                    type="text"
                    placeholder="Mother's full name"
                    {...register("motherName")}
                    className={inputClass}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Permanent Division">
                  <select {...register("permanentDivision")} className={selectClass}>
                    <option value="">Select division</option>
                    {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </FormField>
                <FormField label="Present Division">
                  <select {...register("presentDivision")} className={selectClass}>
                    <option value="">Select division</option>
                    {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </FormField>
              </div>
            </div>
          </div>

          {/* Section: Partner Preferences */}
          <div>
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">
              Partner Preferences
            </h2>
            <div className="space-y-4">
              <FormField label="Expected Partner Age">
                <input
                  type="number"
                  placeholder="e.g. 28"
                  {...register("expectedPartnerAge")}
                  className={inputClass}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Expected Height">
                  <select {...register("expectedPartnerHeight")} className={selectClass}>
                    <option value="">Select height</option>
                    {HEIGHTS.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                </FormField>
                <FormField label="Expected Weight">
                  <select {...register("expectedPartnerWeight")} className={selectClass}>
                    <option value="">Select weight</option>
                    {WEIGHTS.map((w) => <option key={w} value={w}>{w}</option>)}
                  </select>
                </FormField>
              </div>
            </div>
          </div>

          {/* Section: Contact Info */}
          <div>
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <FormField label="Mobile Number">
                <input
                  type="tel"
                  placeholder="e.g. 01700000000"
                  {...register("mobileNumber")}
                  className={inputClass}
                />
              </FormField>

              <FormField label="Email Address">
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className={`${inputClass} bg-gray-50 cursor-not-allowed text-gray-500`}
                />
                <p className="text-xs text-gray-400 mt-1">Email is read-only and linked to your account.</p>
              </FormField>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Saving…"
              : existingBiodata
              ? "Update Biodata"
              : "Create Biodata"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBiodata;