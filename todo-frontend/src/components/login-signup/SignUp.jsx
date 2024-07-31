import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import postService from "../../services/postService";
import { getUser, setUser } from "../../utils/localStorage";
import { endpoint } from "../constants/url";
import { signUpGoogle } from "../../api";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/user/slice";
import GoogleSignIn from "./GoogleSignIn";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(getUser() === null)) {
      navigate("/home");
    }
  }, []);
  const [userData, setUserData] = useState({
    firstName: "",
    email: "",
    lastName: "",
    password: "",
  });

  const [userDataErrors, setUserDataErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const status = useSelector((state) => state.users.registerData.status);
  const error_data = useSelector((state) => state.users.registerData.error);
  const data = useSelector((state) => state.users.registerData.data);

  const validateSignUp = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "FirstName is Required";
    } else if (values.firstName.length < 3) {
      errors.name = "Name Should have atleast 3 characters";
    } else if (!/^[a-zA-Z\s]*$/.test(values.firstName)) {
      errors.name = "Name must contain only letters and spaces";
    }

    if (!values.lastName) {
      errors.lastName = "LastName is Required";
    } else if (values.lastName.length < 3) {
      errors.name = "LastName Should have atleast 3 characters";
    } else if (!/^[a-zA-Z\s]*$/.test(values.lastName)) {
      errors.name = "LastName must contain only letters and spaces";
    }

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is Required";
    } else if (values.password.length < 8) {
      errors.password = "Password should contain atleast 8 characters";
    }

    return errors;
  };

  const onSignUpSubmit = (e) => {
    e.preventDefault();
    const errors = validateSignUp(userData);
    setUserDataErrors(errors);
    if (!Object.keys(errors).length) {
      dispatch(registerUser(userData));
    }
  };

  useEffect(() => {
    if (status === "idle" && data && data.success) {
      setUser(data.token);
      navigate("/home");
    }
    if (error_data && error_data === "Network Error") {
      console.log("500");
    }
  }, [status, data, error_data]);

  return (
    <div className="containerlogin w-full h-[60vh] flex justify-center items-center ">
      <div className="content w-2/5 mx-auto p-4 rounded-lg shadow-2xl bg-gray-100">
        <form
          onSubmit={onSignUpSubmit}
          className="login flex flex-col items-center w-full p-2 gap-6 py-5"
        >
          <div className="text-center text-3xl font-semibold">SignUp</div>
          <div className="flex w-full gap-x-6">
            <div className="w-4/5">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <p className="mt-2 text-sm text-red-500">
                {userDataErrors.firstName}
              </p>
            </div>

            <div className="w-4/5">
              <label
                htmlFor="lastName"
                className="block mb-2 text-base font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <p className="mt-2 text-sm text-red-500">{userDataErrors.lastName}</p>
            </div>
          </div>
          <div className="flex w-full gap-x-6">
            <div className="w-4/5">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <p className="mt-2 text-sm text-red-500">
                {userDataErrors.email}
              </p>
            </div>
            <div className="w-4/5">
              <label
                htmlFor="password"
                className="block mb-2 text-base font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <p className="mt-2 text-sm text-red-500">{userDataErrors.password}</p>
            </div>
          </div>
          {status === "pending" ? (
            <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500"></div>
          ) : (
            <div
              className={`text-red-500 text-sm ${
                (error_data && error_data) || (data && data.message)
                  ? ""
                  : "hidden"
              }`}
            >
              {(error_data && error_data) || (data && data.message)}
            </div>
          )}
          <div className="Submitbtn text-center flex flex-col gap-3">
            <button
              className="bg-[#0560FD] hover:bg-[#0b64ff] text-white font-semibold py-2 px-4 rounded"
              type="submit"
              disabled={status === "pending"}
            >
              Submit
            </button>
            <hr />
            <GoogleSignIn />
          </div>
          <div className="text-center text-sm text-black">
            Already Have an Account ?{" "}
            <Link className="text-blue-700 font-semibold" to="/login">
              SignIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
