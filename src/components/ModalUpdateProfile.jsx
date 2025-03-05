import React from "react";
import Modal from "./Modal";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { profileSchema } from "../formSchema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";

const ModalUpdateProfile = ({ isOpen, onClose, title }) => {
  const { user, loading } = useSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      password: "",
      c_password: "",
      phone_number: user?.phone_number,
    },
  });

  const onSubmit = (data) => {
    const result = profileSchema.safeParse(data);

    if (!result.success) {
      return;
    }

    console.log(result);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="email"
          label="Email"
          name="email"
          register={register}
          errors={errors.email}
        />
        <InputField
          type="text"
          label="Name"
          name="name"
          register={register}
          errors={errors.name}
        />
        <InputField
          type="password"
          label="Password"
          name="password"
          register={register}
          errors={errors.password}
        />
        <InputField
          type="password"
          label="Confirmation Password"
          name="c_password"
          register={register}
          errors={errors.c_password}
        />
        <InputField
          type="number"
          label="Phone Number"
          name="phone_number"
          register={register}
          errors={errors.phone_number}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white text-lg font-extrabold uppercase hover:bg-gray-800"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProfile;
