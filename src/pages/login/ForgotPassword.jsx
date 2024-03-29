import React from "react";
import login from "../../assets/login/login.png";
import montalban_logo from "../../assets/login/montalban-logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_LINK from "../../config/API";

const ForgotPassword = () => {
  const [eye, isEye] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleForgot = async () => {
    if (!email) {
      setError("Please provide an email address.");
      return;
    }
  
    try {
      const checkEmailResponse = await axios.get(`${API_LINK}/auth/findemail?email=${email}`);
      const { exists, type } = checkEmailResponse.data;
  
      if (!exists) {
        setError("Email does not exist");
        return;
      }
  
      if (type !== "Staff" && type !== "Brgy Admin") {
        setError("Access denied: Only Staff and Brgy Admin accounts can proceed.");
        return;
      }
  
      const resetResponse = await axios.patch(`${API_LINK}/auth/send_pin/${email}`, { type });
      const encodedEmail = btoa(email);
  
      if (resetResponse.status === 200) {
        setSuccessMessage("Password reset initiated. Check your email for instructions.");
     
        navigate(`/pin/${encodedEmail}`);
      } else {
        setError("Error sending PIN");
        console.error(resetResponse.data.error); // Log the detailed error message
      }
    } catch (error) {
      setError("Error checking email");
      console.log(error.message);
    }
  };
  

  return (
    <div className='bg-[url("/imgs/login-bg.jpg")] bg-cover bg-center bg-no-repeat md:px-[3rem] md:py-[3rem] lg:px-[7rem] lg:py-[4rem] h-screen flex sm:flex-col md:flex-row sm:space-y-5 md:space-y-0'>
      <div className="sm:block md:hidden h-[320px] border-[5px] border-t-0 border-[#1C8058] bg-[url('/imgs/login.png)] flex flex-col w-full rounded-b-full overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.51)]">
        <img
          src={login}
          className="p-[0.05rem] w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-row bg-white justify-center items-center w-full sm:h-full sm:rounded-t-3xl md:rounded-3xl overflow-hidden sm:shadow-[0px_-3px_4px_rgba(0,0,0,0.51)] md:shadow-[4px_4px_4px_rgba(0,0,0,0.51)]">
        <div className="sm:hidden md:block w-9/12 h-full relative">
          <img
            src={login}
            className="p-[0.05rem] w-full h-full object-cover"
            alt=""
          />
          <div>
            <img
              src={montalban_logo}
              className="absolute bottom-4 left-5 z-50 w-8/12"
              alt=""
              srcset=""
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-[0.05rem] left-[0.05rem]"
              viewBox="0 0 567 270"
              fill="none"
            >
              <path
                d="M196.173 98.5207C83.9074 113.814 18.5163 38.3432 0 0V270H567C535.305 227.396 442.39 137.396 393.347 114.497L392.208 113.965C343.971 91.4376 322.337 81.334 196.173 98.5207Z"
                fill="#017446"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-[0.05rem] "
              viewBox="0 0 558 254"
              fill="none"
            >
              <path
                d="M192.938 92.5C82.5235 106.859 18.2109 36 0 0V253.5H557.648C526.477 213.5 435.094 129 386.859 107.5L385.739 107.001C338.298 85.8498 317.02 76.3636 192.938 92.5Z"
                fill="url(#paint0_linear_596_573)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_596_573"
                  x1="278.824"
                  y1="0"
                  x2="278.824"
                  y2="253.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="#DCDCDC" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center md:h-full relative">
          <div className="sm:w-10/12 lg:w-8/12 sm:space-y-3 md:space-y-4">
            <div className="space-y-2">
              <h1 className="font-heavy text-xl md:text-2xl lg:text-3xl text-center">
                Forgot Password
              </h1>
              <p className="sm:text-xs md:text-sm lg:text-base text-center font-regular">
                Please provide your email address that you've been registered in
                this account.
              </p>
            </div>
            <div>

              {error && (
                <div class="w-full bg-white border rounded-md border-red-500 flex items-center justify-center">
                  <div class="flex p-4">
                    <div class="flex-shrink-0">
                      <svg class="h-4 w-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm text-red-700 dark:text-gray-400">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {successMessage && (
                <div class="w-full bg-white border rounded-md border-green-500 flex items-center justify-center">
                  <div class="flex p-4">
                    <div class="flex-shrink-0">
                      <svg class="h-4 w-4 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm text-green-700 dark:text-gray-400">
                        {successMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <label
                htmlFor="input-label-with-helper-text"
                className="mt-2 block sm:text-xs lg:text-sm font-medium mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="input-label-with-helper-text"
                className="sm:py-2 sm:px-3 lg:py-3 lg:px-4 block w-full border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                placeholder="you@site.com"
                aria-describedby="hs-input-helper-text"
                onChange={(e) => setEmail(e.target.value)}

              />
            </div>

            <div className="flex flex-col w-full space-y-3">
              <button
                onClick={handleForgot}
                className="w-full rounded-[12px] bg-gradient-to-r from-[#4b7c80] to-[#21556d] sm:py-1.5 lg:py-2.5 text-white font-medium text-base"
              >
                Proceed
              </button>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
