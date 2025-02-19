import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  myProfileThunk,
  updateUserThunk,
} from "../features/profile/profileThunks";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const userId = 3;

  const [credential, setCredential] = useState({
    email: "syukran@gmail.com",
    name: "Syukran",
    password: "syukran123",
    c_password: "syukran123",
    role: "admin",
    phone_number: "",
  });

  useEffect(() => {
    dispatch(myProfileThunk());
    dispatch(updateUserThunk({ userId, credential }));
  }, []);
  return <div>DashboardPage</div>;
};

export default DashboardPage;
