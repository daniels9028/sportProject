import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Trash2, Edit, ChevronLeft, ChevronRight, X } from "lucide-react";
import { sportActivitiesThunk } from "../features/activity/activityThunks";
import { Button } from "../components/Button";
import { motion, AnimatePresence } from "framer-motion";

const SportActivityPage = () => {
  const { activity, currentPage, totalPages } = useSelector(
    (state) => state.activity
  );

  const dispatch = useDispatch();

  const [newSport, setNewSport] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddSport = () => {
    if (newSport.trim()) {
      dispatch(createCategoryThunk({ name: newSport })).then(() => {
        dispatch(categoriesThunk(currentPage));
      });
      setNewSport("");
    }
  };

  const handleEditSport = (id, name) => {
    setEditingId(id);
    setEditedName(name);
    setIsModalOpen(true);
  };

  const handleUpdateSport = () => {
    if (editedName.trim()) {
      dispatch(updateCategoryThunk({ id: editingId, name: editedName })).then(
        () => {
          dispatch(categoriesThunk(currentPage));
          setIsModalOpen(false);
          setEditingId(null);
          setEditedName("");
        }
      );
    }
  };

  const handleDeleteSport = (id) => {
    dispatch(deleteCategoryThunk(id)).then(() => {
      dispatch(categoriesThunk(currentPage));
    });
  };

  useEffect(() => {
    dispatch(sportActivitiesThunk(currentPage));
  }, [dispatch, currentPage]);

  console.log(activity);

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <AdminNavbar />

      <div className="p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Sports Activity Management
        </h2>
        <div className="flex gap-2 mb-4 justify-end">
          <Button
            onClick={handleAddSport}
            className="rounded-2xl flex items-center gap-2"
          >
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
              onClick={() => setSelectedItem(item)}
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

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">
                Edit Sport Category
              </h3>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border rounded-2xl p-2 w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-2xl bg-gray-300 text-black"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateSport}
                  className="rounded-2xl bg-gray-300 text-black"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white border-[5px] border-black shadow-[10px_10px_0px_rgba(0,0,0,1)] rounded-sm w-full max-w-2xl p-8 relative"
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-black text-white p-2 rounded-sm hover:bg-red-600 transition-all"
                >
                  <X size={24} />
                </button>
                <h2 className="text-3xl font-extrabold uppercase mb-6 tracking-wide border-b-[3px] border-black pb-2">
                  {selectedItem.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
