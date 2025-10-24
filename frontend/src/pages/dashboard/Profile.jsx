// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Camera, Mail, User, Edit2, Save, X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Profile = () => {
  const { user, patchUserProfile, loading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    bio: "",
    role: "",
    avatar: "",
  });

  const fileInputRef = useRef(null);

  // Sync form when user changes
  useEffect(() => {
    if (user) {
      setForm({
        bio: user.bio || "",
        role: user.role || "",
        avatar: user.avatar || "",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.bio, user?.role, user?.avatar]); 

  if (!user) return null;

  const initials = user.username?.charAt(0)?.toUpperCase() || "?";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result;
      setForm((prev) => ({ ...prev, avatar: base64Data }));

      try {
        const updated = await patchUserProfile({ avatar: base64Data });
       
        setForm((prev) => ({ ...prev, ...updated }));
      } catch (err) {
        console.error("Avatar upload failed", err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const updated = await patchUserProfile({
        bio: form.bio,
        role: form.role,
      });

      setForm((prev) => ({ ...prev, ...updated }));

      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <DashboardLayout pageTitle="My Profile">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto space-y-10"
      >
        {/* Profile Header */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6"
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-[var(--color-landing-primary)] to-[var(--color-landing-secondary)] flex items-center justify-center text-white font-bold text-3xl shadow-md">
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

            <button
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 p-2 bg-white border rounded-full shadow-sm hover:bg-gray-50 transition"
              title="Change Avatar"
              disabled={loading}
            >
              <Camera size={16} className="text-gray-500" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-[var(--color-landing-navy)]">
              {user.username}
            </h1>
            {isEditing ? (
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                className="text-sm border rounded-lg px-2 py-1 w-40"
                placeholder="Role"
              />
            ) : (
              <p className="text-[var(--color-app-text-muted)]">
                {form.role || "Member"}
              </p>
            )}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
              <Mail size={16} /> {user.email}
            </div>
          </div>

          {/* Edit / Save */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-[var(--color-landing-primary)] hover:bg-[var(--color-landing-secondary)] text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm"
                >
                  <Save size={14} /> Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-1 text-sm"
                >
                  <X size={14} /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-1 text-sm"
              >
                <Edit2 size={14} /> Edit
              </button>
            )}
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          variants={fadeUp}
          custom={2}
          className="bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-[var(--color-landing-navy)] flex items-center gap-2 mb-3">
            <User size={18} /> About
          </h2>
          {isEditing ? (
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg p-3 text-sm"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-[var(--color-app-text)] leading-relaxed">
              {form.bio || "No bio added yet."}
            </p>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile;
