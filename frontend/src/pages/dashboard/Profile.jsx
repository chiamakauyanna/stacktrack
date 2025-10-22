import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Camera, Mail, User } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = "My Profile | StackTrack";

    // Simulated user data (replace with context or backend later)
    setUser({
      name: "Chammy",
      email: "chammy@example.com",
      profile: {
        bio: "Full-stack dev who loves smooth UIs, APIs, and coffee ☕",
        avatar: "", // fallback to initials
        role: "Developer",
      },
    });
  }, []);

  if (!user) return null;

  const initials = user.name.charAt(0).toUpperCase();

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
        {/* Profile Header Card */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6"
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-[var(--color-landing-primary)] to-[var(--color-landing-secondary)] flex items-center justify-center text-white font-bold text-3xl shadow-md">
              {user.profile.avatar ? (
                <img
                  src={user.profile.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <button
              className="absolute bottom-0 right-0 p-2 bg-white border rounded-full shadow-sm hover:bg-gray-50 transition"
              title="Change Avatar"
            >
              <Camera size={16} className="text-gray-500" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-[var(--color-landing-navy)]">
              {user.name}
            </h1>
            <p className="text-[var(--color-app-text-muted)]">{user.profile.role}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
              <Mail size={16} /> {user.email}
            </div>
          </div>
        </motion.div>

        {/* Bio Card */}
        <motion.div
          variants={fadeUp}
          custom={2}
          className="bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-[var(--color-landing-navy)] flex items-center gap-2 mb-3">
            <User size={18} /> About
          </h2>
          <p className="text-[var(--color-app-text)] leading-relaxed">
            {user.profile.bio}
          </p>
        </motion.div>

        {/* Account Settings (placeholder for future) */}
        <motion.div
          variants={fadeUp}
          custom={3}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-[var(--color-landing-navy)] mb-3">
            Account Settings
          </h2>
          <p className="text-sm text-[var(--color-app-text-muted)]">
            This section will let you update your info, change password, and manage your
            connected services.
          </p>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile;
