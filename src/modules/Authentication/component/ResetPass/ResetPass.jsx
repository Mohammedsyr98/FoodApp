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
import { usersUrls } from "../../../../constants/EndPoints";
import {
  emailValidation,
  passwordValidation,
} from "../../../../constants/Validations";

export default function ResetPass() {
  const notify = (message) => toast(message);
  const [showPassword, setShowPassword] = useState(true);
  const [isloading, SetIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    SetIsLoading(true);
    try {
      let response = await axios.post(usersUrls.reset, data);
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
            <div className="input-group mb-1">
              <span className="input-group-text">
                <MdOutlineMailOutline />
              </span>

              <input
                type="text"
                className="form-control py-2"
                placeholder="Enter Your E-mail"
                {...register("email", {
                  ...emailValidation,
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
          <div className="input-group mt-3 mb-1 position-relative ">
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

          <div className="input-group mt-3 mb-1 position-relative ">
            <span className="input-group-text">
              <RiLockPasswordFill />
            </span>

            <input
              type={showPassword ? `password` : `text`}
              className="form-control py-2"
              placeholder="New Password"
              {...register("password", {
                required: true,
                ...passwordValidation,
              })}
            />
            <button
              className="border-0"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              onMouseUp={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}>
              {showPassword ? (
                <BiShow className="show-password position-absolute" />
              ) : (
                <BiHide className="show-password position-absolute" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className=" text-danger "> {errors.password.message}</p>
          )}

          <div className="input-group mt-3 mb-1 position-relative ">
            <span className="input-group-text">
              <RiLockPasswordFill />
            </span>

            <input
              type={showPassword ? `password` : `text`}
              className="form-control py-2"
              placeholder="Confirm New Password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === getValues("password") ||
                  "The confirm Password and password fields must match.",
              })}
            />
            <button
              className="border-0"
              onClick={() => setShowPassword(!showPassword)}
              onMouseUp={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}>
              {showPassword ? (
                <BiShow className="show-password position-absolute" />
              ) : (
                <BiHide className="show-password position-absolute" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className=" text-danger "> {errors.confirmPassword.message}</p>
          )}

          <button
            disabled={isSubmitting}
            className="w-100 form-button text-white border-0 rounded-3">
            {isSubmitting ? <div className="loader"></div> : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
}
