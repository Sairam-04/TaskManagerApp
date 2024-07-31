import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import postService from "../../services/postService";
import { getUser, setUser } from "../../utils/localStorage";
import { endpoint } from "../constants/url";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/slice";
import GoogleSignIn from "./GoogleSignIn";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!(getUser() === null)) {
      navigate("/home");
    }
  }, []);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});
  const status = useSelector((state) => state.users.loginData.status);
  const data = useSelector((state) => state.users.loginData.data);
  const error_data = useSelector((state) => state.users.loginData.error);
  const validateLoginForm = (values) => {
    const errors = {};
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    const errors = validateLoginForm(userData);
    setLoginErrors(validateLoginForm(userData));
    if (!Object.keys(errors).length) {
      dispatch(loginUser(userData));
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
    <div className="containerlogin w-full sm:h-[60vh] flex justify-center items-center ">
      <div className="content sm:w-[30%] w-[95%] mx-auto p-4 rounded-lg shadow-2xl bg-gray-100">
        <form
          onSubmit={onLoginSubmit}
          className="login flex flex-col items-center w-full p-2 gap-6 py-5"
        >
          <div className="text-center text-3xl font-semibold">Login</div>
          <div className="sm:w-4/5 w-full">
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
            <p className="mt-2 text-sm text-red-500">{loginErrors.email}</p>
          </div>
          <div className="sm:w-4/5 w-full">
            <label
              htmlFor="email"
              class="block mb-2 text-base font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
            <p class="mt-2 text-sm text-red-500">{loginErrors.password}</p>
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
            Don't have an Account ?
            <Link className="text-blue-700 font-semibold" to="/register">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
