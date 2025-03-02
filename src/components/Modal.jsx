import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 px-4 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white text-black p-8 w-full max-w-3xl border-4 border-black rounded-none shadow-none overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-4">
              <h2 className="md:text-2xl text-lg font-extrabold uppercase">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-black hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
