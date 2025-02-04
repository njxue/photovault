"use client";

import { useFormStatus } from "react-dom";
import { useEffect } from "react";

const SubmitButton = ({ text, preventBrowserRefresh, disabled = false }) => {
  const { pending } = useFormStatus();
  useEffect(() => {
    if (!preventBrowserRefresh) {
      return;
    }
    const showAlert = (e) => {
      if (pending) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", showAlert);
    return () => {
      window.removeEventListener("beforeunload", showAlert);
    };
  }, [pending]);

  return (
    <button
      className="btn-gray w-full h-9 text-white font-bold"
      type="submit"
      disabled={pending || disabled}>
      {pending ? "Loading..." : text ?? "Submit"}
    </button>
  );
};

export default SubmitButton;
