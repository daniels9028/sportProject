import React from "react";
import { motion } from "framer-motion";
import { transactionByIdThunk } from "../../features/transaction/transactionThunks";
import { useDispatch } from "react-redux";
import DetailList from "../DetailList";
import { formatCurreny } from "../../utils/formatCurreny";

const TransactionList = ({ item, index }) => {
  const dispatch = useDispatch();

  const handleCardClick = (id) => dispatch(transactionByIdThunk(id));

  return (
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
        <DetailList label="Invoice" value={item?.invoice_id} />
        <DetailList
          label="Total"
          value={`Rp. ${formatCurreny(item?.total_amount)}`}
        />
        <DetailList label="Order Date" value={item?.order_date} />
        <DetailList label="Expired Date" value={item?.expired_date} />
        <DetailList
          label="Status"
          value={`${
            item?.status === "success"
              ? "Success"
              : item?.status === "cancelled"
              ? "Cancelled"
              : "Pending"
          }`}
        />
      </div>
    </motion.div>
  );
};

export default TransactionList;
