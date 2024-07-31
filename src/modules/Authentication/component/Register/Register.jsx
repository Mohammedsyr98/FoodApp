import React, { useState } from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Register() {
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
      SetIsLoading(false);
      let response = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/Users/Login`,
        data
      );
      navigate("/dashboard");
      toast.success("Login Succefully");
    } catch (error) {
      SetIsLoading(false);

      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {" "}
      <div className="d-flex flex-column">
        <span className="form-title ">Register</span>
        <span className="form-desc">
          Welcome Back! Please enter your details
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="username col-6 mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <IoPhonePortraitOutline />
                </span>

                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="UserName"
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
            <div className="email col-6 mb-4">
              <div className="input-group ">
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
            <div className="country col-6 mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <TbWorld />
                </span>

                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Country"
                  {...register("country", {
                    required: "country is required",
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
            <div className="phonenumber col-6 mb-4">
              <div className="input-group ">
                <span className="input-group-text">
                  <IoPhonePortraitOutline />
                </span>

                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="phoneNumber"
                  {...register("email", {
                    required: "Phone number is required",
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
            <div style={{ width: "50%" }} className="input-group col-6 mb-4">
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
            <div style={{ width: "50%" }} className="input-group col-6 mb-4">
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
          </div>

          <button className="w-100 form-button text-white border-0 rounded-3">
            {isloading ? <div className="loader"></div> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
