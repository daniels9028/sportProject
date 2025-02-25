import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Plus, Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from "../features/category/categoryThunks";

const SportCategoryPage = () => {
  const {
    category: sports,
    currentPage,
    totalPages,
  } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const [newSport, setNewSport] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    dispatch(categoriesThunk(currentPage));
  }, [dispatch, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(categoriesThunk(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(categoriesThunk(currentPage + 1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-2xl mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <Button className="rounded-2xl px-6 py-2">Logout</Button>
      </header>

      <div className="p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Sports Category Management
        </h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newSport}
            onChange={(e) => setNewSport(e.target.value)}
            placeholder="Add new sport category"
            className="border rounded-2xl p-2 flex-1"
          />
          <Button
            onClick={handleAddSport}
            className="rounded-2xl flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sports?.map((sport) => (
            <Card
              key={sport.id}
              className="rounded-2xl shadow-md bg-gray-50 p-4 flex justify-between items-center"
            >
              <h3 className="text-lg font-semibold">{sport.name}</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => handleEditSport(sport.id, sport.name)}
                  className="text-blue-500"
                >
                  <Edit className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleDeleteSport(sport.id)}
                  className="text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
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
      </div>
    </div>
  );
};

export default SportCategoryPage;
