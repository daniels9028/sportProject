import React, { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import DashboardNavbar from "../components/DashboardNavbar";
import { useParams } from "react-router-dom";
import { transactionByIdThunk } from "../features/transaction/transactionThunks";
import { useDispatch, useSelector } from "react-redux";
import { formatCurreny } from "../utils/formatCurreny";
import { motion } from "framer-motion";

import uploadServices from "../api/uploadServices";
import transactionServices from "../api/transactionServices";
import { X } from "lucide-react";

const DetailMyTransactionPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { selectedItem, loading } = useSelector((state) => state.transaction);

  const [file, setFile] = useState("");

  const [confirmModal, setConfirmModal] = useState(false);

  const handleOpenConfirmModal = () => setConfirmModal(true);
  const handleCloseConfirmModal = () => setConfirmModal(false);

  const showToast = (message) => {
    toast(message, {
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
  };

  const handleUploadProofPayment = async (e) => {
    const uploadFile = e.target.files[0];
    if (!uploadFile) return;

    if (uploadFile.size > 300 * 1024) {
      return showToast("File size exceeds 300KB!");
    }

    const imageTypes = ["image/jpeg", "image/png", "image/webp"];
    const fileTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
      "text/csv", // CSV
    ];

    const isImage = imageTypes.includes(uploadFile.type);
    const isFile = fileTypes.includes(uploadFile.type);
    if (!isImage && !isFile) {
      return showToast(
        "Only PNG, JPG, JPEG, WEBP, PDF, DOCX, XLSX, or CSV files are allowed!"
      );
    }

    try {
      const upload = isImage
        ? await uploadServices.uploadImageRequest(uploadFile)
        : await uploadServices.uploadFileRequest(uploadFile);

      setFile(upload.data.result);
    } catch (error) {
      return showToast(`${error.response.data.message || "Error when upload"}`);
    }
  };

  const handleUpdateProofPayment = async () => {
    if (!file || file === "") {
      return showToast("Proof payment not found!");
    }

    try {
      await transactionServices.updateProofPaymentUrlRequest({
        id: id,
        proof_payment_url: file,
      });

      showToast("Proof payment has been updated successfully");
      setFile(null);
      dispatch(transactionByIdThunk(id));
    } catch (error) {
      showToast(error);
    }
  };

  const handleCancelTransaction = async () => {
    try {
      await transactionServices.cancelTransactionRequest({
        id: id,
      });

      showToast("Transaction has been canceled successfully");
      dispatch(transactionByIdThunk(id));
      handleCloseConfirmModal();
    } catch (error) {
      showToast(error);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(transactionByIdThunk(id));
    }
  }, [id]);

  console.log(selectedItem);

  return (
    <>
      <div className="bg-white min-h-screen font-mono relative">
        <ToastContainer />
        <DashboardNavbar />

        <div className="min-h-screen flex justify-center items-center p-6 mt-32">
          <div className="w-full max-w-3xl bg-white border-[8px] border-black shadow-[16px_16px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-3xl font-bold mb-4 border-b-[5px] border-black pb-2">
              Detail Transaksi
            </h2>

            <div className="p-4 border-[5px] border-black bg-gray-100 mb-6">
              <p className="font-bold text-xl">
                Invoice: <span>{selectedItem?.invoice_id}</span>
              </p>
              <p>
                <span className="font-bold">Status:</span>{" "}
                <span
                  className={`${
                    selectedItem?.status === "success"
                      ? "text-green-500"
                      : selectedItem?.status === "cancelled"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {selectedItem?.status}
                </span>
              </p>
              <p>
                <span className="font-bold">Total Bayar:</span>{" "}
                {`Rp. ${formatCurreny(selectedItem?.total_amount)}`}
              </p>
              <p>
                <span className="font-bold">Tanggal Pemesanan:</span>{" "}
                {selectedItem?.order_date}
              </p>
              <p>
                <span className="font-bold">Tanggal Kedaluwarsa:</span>{" "}
                {selectedItem?.expired_date}
              </p>
            </div>

            <div className="p-4 border-[5px] border-black bg-gray-100">
              <h3 className="text-xl font-bold border-b-[3px] border-black pb-2 mb-4">
                Item Transaksi
              </h3>
              <p className="font-bold text-2xl capitalize">
                {selectedItem?.transaction_items?.sport_activities?.title}
              </p>
              <p>
                <span className="font-bold">Deskripsi:</span>{" "}
                {selectedItem?.transaction_items?.sport_activities?.description}
              </p>
              <p>
                <span className="font-bold">Harga:</span>{" "}
                {`Rp. ${formatCurreny(
                  selectedItem?.transaction_items?.sport_activities?.price
                )}`}
              </p>
              <p>
                <span className="font-bold">Tanggal Aktivitas:</span>{" "}
                {
                  selectedItem?.transaction_items?.sport_activities
                    ?.activity_date
                }{" "}
                |{" "}
                {selectedItem?.transaction_items?.sport_activities?.start_time}{" "}
                - {selectedItem?.transaction_items?.sport_activities?.end_time}
              </p>
              <p>
                <span className="font-bold">Lokasi:</span>{" "}
                {selectedItem?.transaction_items?.sport_activities?.address}
              </p>
              <a
                href={
                  selectedItem?.transaction_items?.sport_activities?.map_url
                }
                target="__blank"
                className="text-green-600 underline font-bold hover:text-green-800"
              >
                Lihat Lokasi
              </a>
            </div>

            <div className="mt-6 border-[5px] border-black p-4 bg-gray-100">
              <h3 className="text-xl font-bold border-b-[3px] border-black pb-2 mb-4">
                Bukti Transfer
              </h3>
              <img
                src={selectedItem?.proof_payment_url}
                alt={selectedItem?.id}
                className="w-full h-[300px]"
              />
              <p
                className={`font-bold mt-2 ${
                  selectedItem?.proof_payment_url
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {selectedItem?.proof_payment_url
                  ? "Sudah ada bukti transfer"
                  : "Belum ada bukti transfer"}
              </p>
              <p className="text-green-700">
                Unggah bukti transfer sebelum tanggal kedaluwarsa
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <input
                  type="file"
                  className="border-[3px] border-black p-2 w-full sm:w-auto cursor-pointer"
                  onChange={handleUploadProofPayment}
                />
                <button
                  disabled={!file || file === ""}
                  className="bg-gray-400 text-black px-4 py-2 border-[3px] border-black shadow-md cursor-pointer hover:bg-gray-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                  onClick={handleUpdateProofPayment}
                >
                  Update Proof Payment
                </button>
              </div>
            </div>

            <button
              onClick={handleOpenConfirmModal}
              className={`mt-6 bg-red-600 text-white text-lg font-bold px-6 py-3 border-[5px] border-black shadow-md cursor-pointer hover:bg-red-700 ${
                selectedItem?.status !== "pending" ? "hidden" : ""
              }`}
            >
              Batalkan Transaksi
            </button>
          </div>
        </div>
      </div>

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
              Cancel Transaction
            </p>

            {/* Button Actions */}
            <div className="flex justify-between gap-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: "-2deg" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancelTransaction}
                disabled={loading}
                className="flex-1 py-4 font-bold uppercase border-[4px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all bg-red-600 text-black hover:bg-black hover:text-red-600"
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

export default DetailMyTransactionPage;
