import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { emailValidation } from "../../../../constants/Validations";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { usersUrls } from "../../../../constants/EndPoints";

export default function Verify() {
  const notify = (message) => toast(message);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      let response = await axios.put(usersUrls.verify, data);
      console.log(response);

      navigate("/login");
      toast.success(response.data.message);
      console.log(data);
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {" "}
      <div className="d-flex flex-column">
        <span className="form-title ">Verify Your Account</span>

        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="input-group mb-1">
              <span className="input-group-text">
                <IoPhonePortraitOutline />
              </span>

              <input
                type="text"
                className="form-control py-2"
                placeholder="Enter Your E-mail"
                {...register("email", {
                  required: "Email Address is required",
                  ...emailValidation,
                })}
              />
            </div>
            {errors.email && (
              <p className="text-danger ">{errors.email.message}</p>
            )}
          </div>
          <div className="input-group mt-3 mb-1 position-relative ">
            <span className="input-group-text">
              <RiLockPasswordFill />
            </span>

            <input
              type={`text`}
              className="form-control py-2"
              placeholder="code"
              {...register("code", {
                required: "The code field is required",
              })}
            />
          </div>
          {errors.code && (
            <p className=" text-danger "> {errors.code.message}</p>
          )}

          <button
            disabled={isSubmitting}
            className="w-100 form-button text-white border-0 rounded-3">
            {isSubmitting ? <div className="loader"></div> : "verify"}
          </button>
        </form>
      </div>
    </>
  );
}
