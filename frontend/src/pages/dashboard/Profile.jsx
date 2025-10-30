// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Camera, Mail, User, Edit2, Save, X } from "lucide-react";
import useDashboardLayout from "../../hooks/useDashboardLayout";
import useProfile from "../../hooks/useProfile";

const Profile = () => {
  const { user, loading, fadeUp } = useDashboardLayout();
  const {
    isEditing,
    setIsEditing,
    form,
    fileInputRef,
    handleChange,
    handleAvatarChange,
    handleAvatarClick,
    handleSave,
    initials,
  } = useProfile();

  if (loading || !user) {
    return (
      <DashboardLayout pageTitle="My Profile">
        <div className="max-w-3xl mx-auto animate-pulse space-y-8 mt-10">
          <div className="h-40 bg-gray-100 rounded-2xl"></div>
          <div className="h-24 bg-gray-100 rounded-2xl"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto p-6 md:p-10 space-y-10"
      >
        {/* --- Profile Card --- */}
        <motion.section
          variants={fadeUp}
          custom={1}
          className="bg-white/70 backdrop-blur-lg border border-gray-100 shadow-md rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8"
        >
          {/* --- Avatar Section --- */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-app-secondary flex items-center justify-center text-app-surface font-bold text-3xl shadow-inner ring-2 ring-app-secondary">
              {form.avatar ? (
                <img
                  src={form.avatar}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarChange}
            />

            {/* Camera Button */}
            <button
              onClick={handleAvatarClick}
              title="Change Avatar"
              disabled={loading}
              className="absolute bottom-0 right-0 p-2 bg-white border rounded-full shadow-md hover:bg-app-secondary transition group-hover:scale-105"
            >
              <Camera size={16} className="text-app-secondary" />
            </button>
          </div>

          {/* --- Info Section --- */}
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <h1 className="text-2xl font-semibold text-gray-800">
              {user.username}
            </h1>

            {isEditing ? (
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-app-accent"
                placeholder="Role"
              />
            ) : (
              <p className="text-gray-500">{form.role || "Member"}</p>
            )}

            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
              <Mail size={16} /> {user.email}
            </div>
          </div>

          {/* --- Edit / Save Buttons --- */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-app-accent hover:bg-app-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-sm transition"
                >
                  <Save size={14} /> Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition"
                >
                  <X size={14} /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition"
              >
                <Edit2 size={14} /> Edit
              </button>
            )}
          </div>
        </motion.section>

        {/* --- About / Bio Section --- */}
        <motion.section
          variants={fadeUp}
          custom={2}
          className="bg-white/70 backdrop-blur-lg border border-gray-100 rounded-2xl p-8 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <User size={18} className="text-app-accent" /> About
          </h2>

          {isEditing ? (
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-app-accent"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-gray-600 leading-relaxed">
              {form.bio || "No bio added yet."}
            </p>
          )}
        </motion.section>
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile;
