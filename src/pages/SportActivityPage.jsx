import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Pencil,
  Trash,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  deleteSportActivityThunk,
  sportActivitiesThunk,
  sportActivityByIdThunk,
} from "../features/activity/activityThunks";
import { clearSelectedItem } from "../features/activity/activitySlice";
import { Button } from "../components/Button";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast, Bounce } from "react-toastify";

const SportActivityPage = () => {
  const { activity, currentPage, totalPages, selectedItem, selectedLoading } =
    useSelector((state) => state.activity);

  const dispatch = useDispatch();

  // const handleAddActivity = () => {
  //   if (newSport.trim()) {
  //     dispatch(createCategoryThunk({ name: newSport })).then(() => {
  //       dispatch(categoriesThunk(currentPage));
  //     });
  //     setNewSport("");
  //   }
  // };

  // const handleUpdateActivity = () => {
  //   if (editedName.trim()) {
  //     dispatch(updateCategoryThunk({ id: editingId, name: editedName })).then(
  //       () => {
  //         dispatch(categoriesThunk(currentPage));
  //         setIsModalOpen(false);
  //         setEditingId(null);
  //         setEditedName("");
  //       }
  //     );
  //   }
  // };

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

        dispatch(sportActivitiesThunk(currentPage));
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

  useEffect(() => {
    dispatch(sportActivitiesThunk(currentPage));
  }, [dispatch, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(sportActivitiesThunk(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(sportActivitiesThunk(currentPage + 1));
    }
  };

  const handleCardClick = (id) => dispatch(sportActivityByIdThunk(id));
  const handleCloseModal = () => dispatch(clearSelectedItem());

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <AdminNavbar />

      <div className="p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Sports Activity Management
        </h2>
        <div className="flex gap-2 mb-4 justify-end">
          <Button className="rounded-2xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Sport Activity
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activity?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, rotate: "-2deg" }}
              whileTap={{ scale: 0.97 }}
              className="p-6 flex flex-col border-[5px] border-black bg-white rounded-sm shadow-[8px_8px_0px_rgba(0,0,0,1)] 
                     hover:bg-yellow-300 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => handleCardClick(item.id)}
            >
              <h3 className="text-2xl font-extrabold mb-4 uppercase tracking-wider leading-tight">
                {item?.title}
              </h3>
              <div className="flex gap-3 flex-col">
                <Detail
                  label="Kategori"
                  value={item?.sport_category?.name || "N/A"}
                />
                <Detail label="Harga" value={item?.price} />
                <Detail label="Slot" value={item?.slot} />
                <Detail label="Lokasi" value={item?.address} />
                <Detail
                  label="Tanggal"
                  value={`${item?.activity_date} | ${item?.start_time} - ${item?.end_time}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-6 gap-4 items-center">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="rounded-2xl px-4 py-2 bg-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="rounded-2xl px-4 py-2 bg-gray-200"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Modal */}
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
                      <Detail
                        label="Kategori"
                        value={selectedItem?.sport_category?.name || "N/A"}
                      />
                      <Detail label="Harga" value={selectedItem?.price} />
                      <Detail label="Slot" value={selectedItem?.slot} />
                      <Detail label="Lokasi" value={selectedItem?.address} />
                      <Detail
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
                        onClick={() => console.log("Edit clicked")}
                      >
                        <Pencil size={20} />
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: "2deg" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-red-600 text-white border-[3px] border-black px-6 py-3 text-lg font-bold uppercase shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-red-600 transition-all duration-300"
                        onClick={() => handleDeleteActivity(selectedItem.id)}
                      >
                        <Trash size={20} />
                        Delete
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex flex-col">
    <p className="font-bold text-base uppercase">{label}</p>
    <p className="text-lg font-medium">{value}</p>
  </div>
);

export default SportActivityPage;
