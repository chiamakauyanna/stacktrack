import toast from "react-hot-toast";

const useToast = () => {
  return {
    success: (message) =>
      toast.success(message, {
        style: {
          borderRadius: "12px",
          background: "#F0FDF4",
          color: "#166534",
          border: "1px solid #86EFAC",
          fontWeight: 500,
        },
        iconTheme: {
          primary: "#22C55E",
          secondary: "#F0FDF4",
        },
      }),

    error: (message) =>
      toast.error(message, {
        style: {
          borderRadius: "12px",
          background: "#FEF2F2",
          color: "#991B1B",
          border: "1px solid #FCA5A5",
          fontWeight: 500,
        },
        iconTheme: {
          primary: "#EF4444",
          secondary: "#FEF2F2",
        },
      }),

    info: (message) =>
      toast(message, {
        style: {
          borderRadius: "12px",
          background: "#EFF6FF",
          color: "#1E3A8A",
          border: "1px solid #93C5FD",
          fontWeight: 500,
        },
        icon: "ℹ️",
      }),

    loading: (message) =>
      toast.loading(message, {
        style: {
          borderRadius: "12px",
          background: "#F9FAFB",
          color: "#374151",
          border: "1px solid #E5E7EB",
        },
      }),
  };
};

export default useToast;
