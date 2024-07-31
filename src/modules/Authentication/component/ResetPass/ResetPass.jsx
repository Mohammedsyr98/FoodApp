import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPass() {
  const notify = (message) => toast(message);
  const [showPassword, setShowPassword] = useState(true);
  const [isloading, SetIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    SetIsLoading(true);
    try {
      let response = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/Users/Reset`,
        data
      );
      navigate("/login");
      SetIsLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.response);
      toast.error(
        error.response.data.message === "Error on validating your request"
          ? "The confirm Password and password fields must match."
          : error.response.data.message
      );
      SetIsLoading(false);
    }
  };
  return (
    <>
      {" "}
      <div className="d-flex flex-column">
        <span className="form-title ">Reset Password</span>
        <span className="form-desc">
          Please Enter Your Otp or Check Your Inbox
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <MdOutlineMailOutline />
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
          <div className="input-group mt-3 mb-3 position-relative ">
            <span className="input-group-text">
              <RiLockPasswordFill />
            </span>

            <input
              type={`text`}
              className="form-control py-2"
              placeholder="seed"
              {...register("seed", {
                required: true,
              })}
            />
          </div>
          {errors.OTP && (
            <p className=" text-danger "> This field is required</p>
          )}

          <div className="input-group mt-3 mb-3 position-relative ">
            <span className="input-group-text">
              <RiLockPasswordFill />
            </span>

            <input
              type={showPassword ? `text` : `password`}
              className="form-control py-2"
              placeholder="New Password"
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
                },
              })}
            />
            {showPassword ? (
              <BiShow
                onClick={() => setShowPassword(!showPassword)}
                className="show-password position-absolute"
              />
            ) : (
              <BiHide
                onClick={() => setShowPassword(!showPassword)}
                className="show-password position-absolute"
              />
            )}
          </div>
          {errors.password && (
            <p className=" text-danger "> {errors.password.message}</p>
          )}

          <div className="input-group mt-3 mb-3 position-relative ">
            <span className="input-group-text">
              <RiLockPasswordFill />
            </span>

            <input
              type={showPassword ? `text` : `password`}
              className="form-control py-2"
              placeholder="Confirm New Password"
              {...register("confirmPassword", {
                required: true,
              })}
            />
            {showPassword ? (
              <BiShow
                onClick={() => setShowPassword(!showPassword)}
                className="show-password position-absolute"
              />
            ) : (
              <BiHide
                onClick={() => setShowPassword(!showPassword)}
                className="show-password position-absolute"
              />
            )}
          </div>
          {errors.password && (
            <p className=" text-danger "> {errors.password.message}</p>
          )}

          <button className="w-100 form-button text-white border-0 rounded-3">
            {isloading ? <div className="loader"></div> : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
}
