import React, { useState } from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { emailValidation } from "../../../../constants/Validations";
import "react-toastify/dist/ReactToastify.css";
import { usersUrls } from "../../../../constants/EndPoints";
export default function Login({ loginInformation }) {
  const notify = (message) => toast(message);
  const [showPassword, setShowPassword] = useState(true);
  const [isloading, SetIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    SetIsLoading(true);
    try {
      SetIsLoading(false);
      let response = await axios.post(usersUrls.login, data);
      console.log(response);
      navigate("/dashboard");
      toast.success("Login Succefully");
      loginInformation(response);
    } catch (error) {
      SetIsLoading(false);

      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      {" "}
      <div className="d-flex flex-column">
        <span className="form-title ">Log In</span>
        <span className="form-desc">
          Welcome Back! Please enter your details
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div
            style={{ marginTop: "32px" }}
            className="input-group mb-1 position-relative ">
            <span className="input-group-text">
              <RiLockPasswordFill />
            </span>

            <input
              type={showPassword ? `password` : `text`}
              className="form-control py-2"
              placeholder="Enter Your Password"
              {...register("password", {
                required: true,
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
            <p className=" text-danger "> This field is required</p>
          )}
          <div className="links d-flex justify-content-between ">
            <Link to="/register" className="text-decoration-none text-black">
              Register Now?
            </Link>
            <Link
              to="/request-reset-passwword"
              className="text-decoration-none">
              Forget Password?
            </Link>
          </div>
          <button
            disabled={isSubmitting}
            className="w-100 form-button text-white border-0 rounded-3">
            {isSubmitting ? <div className="loader"></div> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
