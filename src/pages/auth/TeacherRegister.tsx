import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../api/auth";
import Loader from "../../components/Loader";

export default function TeacherRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    registrationNo: "",
    degsination: "",
    userRole: "STAFF",
    gender: "MALE",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.setItem("email", formData.email);
    await registerApi(formData);
    setIsLoading(false);
    navigate("/verify-otp");
  };

  const inputClass =
    "block w-full rounded-lg border border-gray-300 dark:outline-none dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50";

  if (isLoading) {
    <Loader />;
  }

  return (
    <>
      <div className="flex h-full flex-col justify-center px-6 pt-2 pb-4">
        {/*  Logo + Title Section */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          {/*  Increased Logo Size */}
          <img
            alt="MSU Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Medhavi_Skills_University_official_Logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-4 text-2xl/9 font-extrabold text-gray-900 dark:text-white">
            Join the MSU Family
          </h2>
        </div>

        {/* Form Container */}
        <div className=" sm:mx-auto sm:w-full sm:max-w-md bg-white dark:bg-gray-950 p-8 rounded-xl dark:border-gray-800">
          <form onSubmit={handelRegisterSubmit} className="space-y-3">
            {/*  FULL NAME */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/*  EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                University Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example.23@msuedu.com"
                value={formData.email}
                onChange={handleChange}
                pattern="^[^.]+\.[0-9]+@msu\.edu\.in$"
                required
                className={inputClass}
              />
            </div>

            {/*  PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* PHONE NUMBER */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                maxLength={10}
                placeholder="9876543210"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/*  REGISTRATION NUMBER */}
            <div>
              <label
                htmlFor="registrationNo"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Registration Number
              </label>
              <input
                id="registrationNo"
                name="registrationNo"
                type="text"
                maxLength={15}
                placeholder="2304100000XX"
                value={formData.registrationNo}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* DEGSINATION */}
            <div>
              <label
                htmlFor="degsination"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Designation
              </label>
              <input
                id="degsination"
                name="degsination"
                type="text"
                placeholder="IT FACULTY"
                value={formData.degsination}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/*  SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <span className="flex justify-center items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  ></path>
                </svg>
                Sign Up
              </span>
            </button>
          </form>

          {/* Footer link */}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition duration-150"
            >
              Sign in to start connecting
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
