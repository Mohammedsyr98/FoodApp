import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoPhonePortraitOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function RequestResetPass() {
  const notify = (message) => toast(message);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isloading, SetIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    SetIsLoading(true);
    try {
      let response = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request`,
        data
      );
      console.log(response);
      SetIsLoading(false);
      navigate("/resetpass");
      toast.success(response.data.message);
      console.log(data);
    } catch (error) {
      console.log(error);
      SetIsLoading(false);
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
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
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

          <button className="w-100 form-button text-white border-0 rounded-3">
            {isloading ? <div className="loader"></div> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
