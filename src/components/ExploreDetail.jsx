import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedItem } from "../features/activity/activitySlice";
import { X } from "lucide-react";
import DetailSportActivity from "./DetailList";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { formatCurreny } from "../utils/formatCurreny";
import ModalMetodePembayaran from "./ModalMetodePembayaran";
import { clearSelectedPayment } from "../features/payment/paymentSlice";
import { createTransactionThunk } from "../features/transaction/transactionThunks";
import { useNavigate } from "react-router-dom";

const ExploreDetail = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { selectedItem, selectedLoading } = useSelector(
    (state) => state.activity
  );

  const { loading } = useSelector((state) => state.transaction);

  const { selectedPayment } = useSelector((state) => state.payment);

  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);

  const handleOpenMethodModal = () => setIsMethodModalOpen(true);
  const handleCloseMethodModal = () => setIsMethodModalOpen(false);

  const handleCloseModal = () => {
    dispatch(clearSelectedItem());
    dispatch(clearSelectedPayment());
  };

  const [confirmModal, setConfirmModal] = useState(false);

  const handleOpenConfirmModal = () => setConfirmModal(true);
  const handleCloseConfirmModal = () => setConfirmModal(false);

  const isEmpty = (value) => {
    return (
      value == null || // Checks for null & undefined
      (typeof value === "object" && Object.keys(value).length === 0) // Checks for empty object
    );
  };

  const handleMakeTransaction = () => {
    if (isEmpty(selectedPayment)) {
      toast("Please Choose Payment Method", {
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
      return;
    }

    const payload = {
      sport_activity_id: selectedItem.id,
      payment_method_id: selectedPayment.id,
    };

    dispatch(createTransactionThunk(payload))
      .unwrap()
      .then((response) => {
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
        });

        setTimeout(() => {
          dispatch(clearSelectedItem());
          dispatch(clearSelectedPayment());
          navigate(`/transaction/${response?.result?.id}`);
        }, 2000);
      })
      .catch((response) => {
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
        });
      });

    handleCloseConfirmModal();
  };

  return (
    <>
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
                      label="Lokasi"
                      value={selectedItem?.address}
                    />
                    <DetailSportActivity
                      label="Tanggal"
                      value={`${selectedItem?.activity_date}`}
                    />
                    <DetailSportActivity
                      label="Waktu"
                      value={`${selectedItem?.start_time} - ${selectedItem?.end_time}`}
                    />
                    <DetailSportActivity
                      label="Biaya Pendaftaran"
                      value={`Rp. ${formatCurreny(selectedItem?.price)}`}
                    />
                    <DetailSportActivity
                      label="Metode Pembayaran"
                      image={selectedPayment?.image_url}
                    />
                  </div>
                  <div
                    className="my-6 flex items-center justify-center cursor-pointer hover:underline transition-all text-green-600 font-semibold"
                    onClick={handleOpenMethodModal}
                  >
                    Pilih Metode Pembayaran
                  </div>
                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 mt-10">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: "2deg" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-green-600 text-white border-[3px] border-black px-6 py-3 text-lg font-bold uppercase shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-green-600 transition-all duration-300"
                      onClick={handleOpenConfirmModal}
                    >
                      Buat Transaksi
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ModalMetodePembayaran
        isModalOpen={isMethodModalOpen}
        onClose={handleCloseMethodModal}
        title="Pilih Metode Pembayaran"
      />

      {confirmModal && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white border-[8px] border-black shadow-[20px_20px_0px_rgba(0,0,0,1)] p-10 text-center max-w-sm w-full relative"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseConfirmModal}
              className="absolute top-3 right-3 bg-black text-white p-2 border-2 border-black hover:bg-red-600 transition-all"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <p className="text-3xl font-extrabold uppercase mb-6 tracking-widest">
              Confirm Transaction
            </p>

            {/* Button Actions */}
            <div className="flex justify-between gap-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: "-2deg" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMakeTransaction}
                disabled={loading}
                className="flex-1 py-4 font-bold uppercase border-[4px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all bg-yellow-400 text-black hover:bg-black hover:text-yellow-400"
              >
                {loading ? "Loading..." : "Yes"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: "2deg" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCloseConfirmModal}
                className="flex-1 py-4 font-bold uppercase bg-black text-white border-[4px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ExploreDetail;
