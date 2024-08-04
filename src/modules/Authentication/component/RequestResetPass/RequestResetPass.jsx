import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoPhonePortraitOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usersUrls } from "../../../../constants/EndPoints";
import { emailValidation } from "../../../../constants/Validations";
export default function RequestResetPass() {
  const notify = (message) => toast(message);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(usersUrls.resetRequest, data);
      console.log(response);

      navigate("/reset-passwword");
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
        <span className="form-title ">Forgot Your Password?</span>
        <span className="form-desc">
          No worries! Please enter your email and we will send a password reset
          link
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="input-group mb-5">
              <span className="input-group-text">
                <IoPhonePortraitOutline />
              </span>

              <input
                type="text"
                className="form-control py-2"
                placeholder="Enter Your E-mail"
                {...register("email", {
                  required: "Email Address is required",
                  emailValidation,
                })}
              />
            </div>
            {errors.email && (
              <p className="text-danger ">
                {errors.email.type === "required"
                  ? "This field is required."
                  : "Please enter a valid email address."}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="w-100 form-button text-white border-0 rounded-3">
            {isSubmitting ? <div className="loader"></div> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
