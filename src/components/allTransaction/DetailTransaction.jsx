import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedItem } from "../../features/transaction/transactionSlice";
import { Pencil, Trash, X } from "lucide-react";
import DetailList from "../DetailList";
import {
  cancelTransactionThunk,
  allTransactionThunk,
  updateStatusThunk,
} from "../../features/transaction/transactionThunks";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { formatCurreny } from "../../utils/formatCurreny";

const DetailTransaction = () => {
  const {
    selectedItem,
    selectedLoading,
    loading,
    allTransactionCurrentPage: currentPage,
  } = useSelector((state) => state.transaction);

  const dispatch = useDispatch();

  const handleCloseModal = () => dispatch(clearSelectedItem());

  const handleCancelTransaction = (id) => {
    dispatch(cancelTransactionThunk({ id: id }))
      .unwrap()
      .then(() => {
        toast("Cancel Transaction Successfully", {
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

        dispatch(allTransactionThunk({ page: currentPage }));
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

  const handleUpdateStatus = (id) => {
    dispatch(updateStatusThunk({ id: id }))
      .unwrap()
      .then(() => {
        toast("Confirmation Transaction Successfully", {
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

        dispatch(allTransactionThunk({ page: currentPage }));
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
              className="bg-white border-[6px] border-black shadow-[15px_15px_0px_rgba(0,0,0,1)] rounded-none w-full max-w-3xl p-10 relative max-h-[80vh] overflow-hidden"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-black text-white p-2 rounded-sm hover:bg-red-600 transition-all"
              >
                <X size={24} />
              </button>

              <div className="max-h-[70vh] overflow-y-auto p-4 hide-scrollbar">
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
                      Detail Transaction
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <DetailList
                        label="INVOICE"
                        value={selectedItem?.invoice_id}
                      />
                      <DetailList
                        label="Total"
                        value={`Rp. ${formatCurreny(
                          selectedItem?.total_amount
                        )}`}
                      />
                      <DetailList
                        label="Order Date"
                        value={selectedItem?.order_date}
                      />
                      <DetailList
                        label="Expired Date"
                        value={selectedItem?.expired_date}
                      />
                      <DetailList
                        label="Title"
                        value={selectedItem?.transaction_items?.title}
                      />
                      <DetailList
                        label="Description"
                        value={
                          selectedItem?.transaction_items?.sport_activities
                            ?.description
                        }
                      />
                      <DetailList
                        label="Address"
                        value={
                          selectedItem?.transaction_items?.sport_activities
                            ?.address
                        }
                      />
                      <DetailList
                        label="Slot"
                        value={
                          selectedItem?.transaction_items?.sport_activities
                            ?.slot
                        }
                      />
                      <DetailList
                        label="Start Time"
                        value={
                          selectedItem?.transaction_items?.sport_activities
                            ?.start_time
                        }
                      />
                      <DetailList
                        label="End Time"
                        value={
                          selectedItem?.transaction_items?.sport_activities
                            ?.end_time
                        }
                      />
                      <DetailList
                        label="Status"
                        value={`${
                          selectedItem?.status === "success"
                            ? "SUCCESS"
                            : selectedItem?.status === "cancelled"
                            ? "CANCELLED"
                            : "PENDING"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-8 my-8">
                      <div className="flex flex-col">
                        <p className="font-bold text-base uppercase">
                          Proof Payment
                        </p>
                        <img
                          src={selectedItem?.proof_payment_url}
                          alt={selectedItem?.id}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {selectedItem?.status === "pending" && (
                      <div className="flex justify-end gap-4 mt-10">
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: "-2deg" }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 bg-black text-white border-[3px] border-black px-6 py-3 text-lg font-bold uppercase shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-yellow-400 hover:text-black transition-all duration-300"
                          disabled={loading}
                          onClick={() => handleUpdateStatus(selectedItem?.id)}
                        >
                          <Pencil size={20} />
                          Confirm Transaction
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: "2deg" }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 bg-red-600 text-white border-[3px] border-black px-6 py-3 text-lg font-bold uppercase shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-red-600 transition-all duration-300"
                          disabled={loading}
                          onClick={() =>
                            handleCancelTransaction(selectedItem?.id)
                          }
                        >
                          <Trash size={20} />
                          {loading ? "Loading..." : "Cancel Transaction"}
                        </motion.button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DetailTransaction;
