import toast from "react-hot-toast";
import { CheckCircle2, XCircle, Info, Loader2 } from "lucide-react";
import { createElement } from "react";

const useToast = () => {
  return {
    success: (message, options = {}) =>
      toast.success(message, {
        id: options.id,
        icon: createElement(CheckCircle2, { className: "text-green-500 w-5 h-5" }),
        style: {
          borderRadius: "12px",
          background: "#F0FDF4",
          color: "#166534",
          border: "1px solid #86EFAC",
          fontWeight: 500,
        },
      }),

    error: (message, options = {}) =>
      toast.error(message, {
        id: options.id,
        icon: createElement(XCircle, { className: "text-red-500 w-5 h-5" }),
        style: {
          borderRadius: "12px",
          background: "#FEF2F2",
          color: "#991B1B",
          border: "1px solid #FCA5A5",
          fontWeight: 500,
        },
      }),

    info: (message, options = {}) =>
      toast(message, {
        id: options.id,
        icon: createElement(Info, { className: "text-blue-600 w-5 h-5" }),
        style: {
          borderRadius: "12px",
          background: "#EFF6FF",
          color: "#1E3A8A",
          border: "1px solid #93C5FD",
          fontWeight: 500,
        },
      }),

    loading: (message, options = {}) =>
      toast.loading(message, {
        id: options.id,
        icon: createElement(Loader2, {
          className: "w-5 h-5 text-gray-600 animate-spin",
        }),
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
