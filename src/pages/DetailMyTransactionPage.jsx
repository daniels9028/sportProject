import React, { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import DashboardNavbar from "../components/DashboardNavbar";
import { useParams } from "react-router-dom";
import { transactionByIdThunk } from "../features/transaction/transactionThunks";
import { useDispatch, useSelector } from "react-redux";
import { formatCurreny } from "../utils/formatCurreny";

import uploadServices from "../api/uploadServices";
import transactionServices from "../api/transactionServices";

const DetailMyTransactionPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { selectedItem } = useSelector((state) => state.transaction);

  const [file, setFile] = useState("");

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
      const response = await transactionServices.updateProofPaymentUrlRequest({
        id: id,
        proof_payment_url: file,
      });

      showToast(response.data.message);
      dispatch(transactionByIdThunk(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(transactionByIdThunk(id));
    }
  }, [id]);

  console.log(selectedItem);
  return (
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
              {selectedItem?.transaction_items?.sport_activities?.activity_date}{" "}
              | {selectedItem?.transaction_items?.sport_activities?.start_time}{" "}
              - {selectedItem?.transaction_items?.sport_activities?.end_time}
            </p>
            <p>
              <span className="font-bold">Lokasi:</span>{" "}
              {selectedItem?.transaction_items?.sport_activities?.address}
            </p>
            <a
              href={selectedItem?.transaction_items?.sport_activities?.map_url}
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
                className="border-[3px] border-black p-2 w-full sm:w-auto"
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

          <button className="mt-6 bg-red-600 text-white text-lg font-bold px-6 py-3 border-[5px] border-black shadow-md cursor-pointer hover:bg-red-700">
            Batalkan Transaksi
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailMyTransactionPage;
