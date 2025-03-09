import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { cn } from "@/lib/utils"

export default function Modal({ isOpen, onClose, modalSize = "lg" }) {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-y-scroll bg-slate-900/20 p-8 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0, rotate: "180deg" }}
            animate={{
              scale: 1,
              rotate: "0deg",
              transition: {
                type: "spring",
                bounce: 0.25,
              },
            }}
            exit={{ scale: 0, rotate: "180deg" }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative w-full max-w-lg cursor-default overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 p-6 text-white shadow-2xl",
              {
                "max-w-sm": modalSize === "sm",
              }
            )}
          >
            <div className="flex flex-col gap-3">
              <CircleAlert className="mx-auto text-white" size={48} />
              <h3
                className={cn("text-center text-3xl font-bold", {
                  "text-2xl": modalSize === "sm",
                })}
              >
                🚀 Special Offer for You! 🚀
              </h3>

              <p className="mt-2">
                We create amazing websites at affordable prices. Let's build something great together!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="w-full rounded bg-transparent py-2 font-semibold text-white transition-colors hover:bg-white/30"
                >
                  Close!
                </button>
                <button
                  onClick={() => {
                    onClose(); // Close the modal
                    navigate("/services"); // Navigate to /services
                  }}
                  className="w-full rounded bg-white py-2 font-semibold text-indigo-600 transition-opacity hover:opacity-80"
                >
                  Make a Request
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
