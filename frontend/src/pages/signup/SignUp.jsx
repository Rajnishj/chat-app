import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import userAuth from "../../hooks/userAuth";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const { loading, authenticated } = userAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authenticated(
      "/api/auth/signup",
      inputs,
      "User signed in successfully!!!!",
      false,
      "/login"
    );
  };
  return (
    <div className="flex flex-col items-center justify-center mx-auto sm:max-w-sm md:max-w-md md:min-w-96 lg:max-w-lg xl:max-w-xl">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={inputs.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            href="#">
            Already have an account?
          </Link>

          <div>
            <div>
              <button
                className="btn btn-block btn-sm mt-2 border border-slate-700"
                disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
