import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesThunk,
  createCategoryThunk,
} from "../features/category/categoryThunks";

const CategoryPage = () => {
  const dispatch = useDispatch();

  const { category, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.category
  );

  const handlePageChange = (page) => {
    dispatch(categoriesThunk(page));
  };

  const handleSubmit = () => {
    dispatch(createCategoryThunk());
  };

  useEffect(() => {
    dispatch(categoriesThunk(currentPage));
  }, []);

  return (
    <>
      <table className="w-full text-center border border-gray-200">
        <thead>
          <tr>
            <th className="p-2 border-b">Name</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border-b">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center my-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CategoryPage;
