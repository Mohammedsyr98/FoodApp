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
import { FileUploader } from "react-drag-drop-files";
import { usersUrls } from "../../../../constants/EndPoints";
import { passwordValidation } from "../../../../constants/Validations";
export default function Register() {
  const notify = (message) => toast(message);
  const [showPassword, setShowPassword] = useState(true);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [isloading, SetIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const handleChange = (file) => {
    setValue("profileImage", file);
  };
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    SetIsLoading(true);
    console.log(data.confirmPassword);
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage ? data.profileImage : "");

    try {
      let response = await axios.post(usersUrls.register, formData);
      console.log(response);
      SetIsLoading(false);
      navigate("/verify");
      toast.success(response.data.message);
    } catch (error) {
      SetIsLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {" "}
      <div className="register d-flex flex-column">
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
                  {...register("userName", {
                    required: "The userName field is required.",
                    minLength: {
                      value: 4,
                      message: "The userName must be at least 4 characters.",
                    },
                    pattern: {
                      value: /^[a-zA-Z]+\d*$/,
                      message:
                        "The userName must contain characters and end with numbers without spaces.",
                    },
                  })}
                />
              </div>
              {errors.userName && (
                <p className="text-danger ">{errors.userName.message}</p>
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
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-danger ">{errors.phoneNumber.message}</p>
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
                  required: "The confirm paswword field is required",
                  ...passwordValidation,
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
              <br></br>
              {errors.confirmPassword && (
                <p className="text-danger ">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <div className="uploader">
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              label={"Upload or drop a profile photo "}
            />
          </div>
          <button className="w-100 form-button text-white border-0 rounded-3">
            {isloading ? <div className="loader"></div> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
