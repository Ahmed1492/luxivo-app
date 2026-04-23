import { useEffect, useState } from "react";
import "./Toast.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";

// Custom event-based toast system
export const showToast = (message, type = "success") => {
  window.dispatchEvent(new CustomEvent("show-toast", { detail: { message, type, id: Date.now() } }));
};

export const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const toast = e.detail;
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    };

    window.addEventListener("show-toast", handler);
    return () => window.removeEventListener("show-toast", handler);
  }, []);

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <div className="toast-icon">
            {t.type === "success" ? <CheckCircleOutlineIcon /> : <RemoveShoppingCartOutlinedIcon />}
          </div>
          <span className="toast-msg">{t.message}</span>
          <button className="toast-close" onClick={() => remove(t.id)}>
            <CloseIcon />
          </button>
          <div className="toast-progress" />
        </div>
      ))}
    </div>
  );
};
