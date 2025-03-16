import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { allTransactionThunk } from "../features/transaction/transactionThunks";
import TransactionList from "../components/allTransaction/TransactionList";
import TransactionPagination from "../components/allTransaction/TransactionPagination";
import DetailTransaction from "../components/allTransaction/DetailTransaction";

const AdminTransactionPage = () => {
  const dispatch = useDispatch();

  const {
    allTransaction,
    allTransactionCurrentPage,
    allTransactionTotalPages,
    loading,
  } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(allTransactionThunk({ page: allTransactionCurrentPage }));
  }, [dispatch, allTransactionCurrentPage]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <AdminNavbar />

      <div className="p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">All Transactions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTransaction?.map((item, index) => (
            <TransactionList item={item} key={item.id} index={index} />
          ))}
        </div>

        <TransactionPagination
          currentPage={allTransactionCurrentPage}
          totalPages={allTransactionTotalPages}
          transactionThunk={allTransactionThunk}
          loading={loading}
        />

        <DetailTransaction />
        {/* Modal */}
        {/* <ModalDetailSportActivity />

        <ModalCreateSportActivity
          isModalOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Input Sport Activity"
        /> */}
      </div>
    </div>
  );
};

export default AdminTransactionPage;
