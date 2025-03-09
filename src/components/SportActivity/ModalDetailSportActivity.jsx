import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedItem } from "../../features/activity/activitySlice";
import { Pencil, Trash, X } from "lucide-react";
import DetailSportActivity from "../DetailList";
import {
  deleteSportActivityThunk,
  sportActivitiesThunk,
} from "../../features/activity/activityThunks";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { formatCurreny } from "../../utils/formatCurreny";
import ModalCreateSportActivity from "./ModalCreateSportActivity";

const ModalDetailSportActivity = () => {
  const { selectedItem, selectedLoading, loading, currentPage } = useSelector(
    (state) => state.activity
  );

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModalCrud = () => setIsModalOpen(true);
  const handleCloseModalCrud = () => setIsModalOpen(false);

  const handleCloseModal = () => dispatch(clearSelectedItem());

  const handleDeleteActivity = (id) => {
    dispatch(deleteSportActivityThunk(id))
      .unwrap()
      .then(() => {
        toast("Sport Activity Deleted Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        dispatch(sportActivitiesThunk({ page: currentPage }));
        dispatch(clearSelectedItem());
      })
      .catch((response) =>
        toast(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        })
      );
  };

  return (
    <>
      <ToastContainer />
      <AnimatePresence>
        {(selectedItem || selectedLoading) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-[6px] border-black shadow-[15px_15px_0px_rgba(0,0,0,1)] rounded-none w-full max-w-3xl p-10 relative"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-black text-white p-2 rounded-sm hover:bg-red-600 transition-all"
              >
                <X size={24} />
              </button>

              {selectedLoading ? (
                <div className="flex justify-center items-center h-64">
                  <motion.div
                    className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-4xl font-extrabold uppercase mb-8 tracking-wide border-b-[5px] border-black pb-3">
                    {selectedItem.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <DetailSportActivity
                      label="Kategori"
                      value={selectedItem?.sport_category?.name || "N/A"}
                    />
                    <DetailSportActivity
                      label="Harga"
                      value={`Rp. ${formatCurreny(selectedItem?.price)}`}
                    />
                    <DetailSportActivity
                      label="Slot"
                      value={selectedItem?.slot}
                    />
                    <DetailSportActivity
                      label="Lokasi"
                      value={selectedItem?.address}
                    />
                    <DetailSportActivity
                      label="Tanggal"
                      value={`${selectedItem?.activity_date} | ${selectedItem?.start_time} - ${selectedItem?.end_time}`}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 mt-10">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: "-2deg" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-black text-white border-[3px] border-black px-6 py-3 text-lg font-bold uppercase shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-yellow-400 hover:text-black transition-all duration-300"
                      onClick={handleOpenModalCrud}
                    >
                      <Pencil size={20} />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: "2deg" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-red-600 text-white border-[3px] border-black px-6 py-3 text-lg font-bold uppercase shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-red-600 transition-all duration-300"
                      disabled={loading}
                      onClick={() => handleDeleteActivity(selectedItem.id)}
                    >
                      <Trash size={20} />
                      {loading ? "Loading..." : "Delete"}
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ModalCreateSportActivity
        isModalOpen={isModalOpen}
        onClose={handleCloseModalCrud}
        selectedItem={selectedItem}
        title="Edit Sport Activity"
      />
    </>
  );
};

export default ModalDetailSportActivity;
