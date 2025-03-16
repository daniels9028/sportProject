import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedPayment } from "../features/payment/paymentSlice";

const PaymentList = ({ item, onClose }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="border-2 my-4 border-black bg-white p-3 flex items-center justify-between cursor-pointer 
                 hover:bg-gray-900 hover:text-white hover:translate-x-1 transition-all duration-150"
      onClick={() => {
        onClose();
        dispatch(setSelectedPayment(item));
      }}
    >
      <div className="flex flex-col leading-none">
        <h1 className="text-lg font-extrabold">{item?.name}</h1>
        <h2 className="text-sm font-bold bg-black text-white px-1">
          {item?.virtual_account_number}
        </h2>
        <p className="text-xs">{item?.virtual_account_name}</p>
      </div>
      <img src={item?.image_url} className="h-20 w-20" alt={item?.id} />
    </div>
  );
};

export default PaymentList;
