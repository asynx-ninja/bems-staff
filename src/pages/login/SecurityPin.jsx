import React, { useState, useRef } from "react";
import login from "../../assets/login/login.png";
import montalban_logo from "../../assets/login/montalban-logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import useCountdown from "../../hooks/useCountdown";
import axios from "axios";
import API_LINK from "../../config/API";

const SecurityPin = ({ numberOfDigits = 4 }) => {
  const { remainingSeconds, isCountdownRunning, startCountdown } = useCountdown(30);
  const [pin, setPin] = useState(new Array(numberOfDigits).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation(); 
  const [errorMessage, setErrorMessage] = useState("");
  const email = atob(location.pathname.split("/")[2]);
  const handleInputChange = (index, event) => {
    const newPin = [...pin];
    newPin[index] = event.target.value;
    setPin(newPin);

    if (event.target.value && index < numberOfDigits - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspaceAndEnter = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleProceed = async () => {
  try {
    const userPin = pin.join("");
    const encodedEmail = btoa(email);

    const response = await axios.get(`${API_LINK}/auth/check_pin/${email}/${userPin}`);
    if (response.status === 200) {
      console.log("PIN validation successful.");
      navigate(`/change/${encodedEmail}`);
    } else {
      setErrorMessage("❌ Wrong PIN. Please check again.");
    }
  } catch (error) {
    setErrorMessage("WRONG PIN!");
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
              srcSet=""
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
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#DCDCDC" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center md:h-full relative">
          <div className="sm:w-10/12 lg:w-8/12 sm:space-y-3 md:space-y-4">
            <div className="space-y-2">
              <h1 className="font-heavy text-xl md:text-2xl lg:text-3xl text-center">
                Security PIN
              </h1>
              <p className="sm:text-xs md:text-sm lg:text-base text-center font-regular">
                Kindly check your email to look thru 4-digit code
              </p>
            </div>
            {errorMessage && (
              <div className="w-full border-2 border-red-500 rounded-md p-2 mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}
            <div className="flex sm:h-[6rem] md:h-[8rem] sm:space-x-2 lg:space-x-3 xl:space-x-4 mt-2">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                  ref={(reference) => (inputRefs.current[index] = reference)}
                  id="input-label-with-helper-text"
                  className="text-center font-medium sm:text-4xl md:text-5xl py-3 px-4 block w-full border-2 border-solid border-[#C7D1DD] rounded-[12px] shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                  aria-describedby="hs-input-helper-text"
                />
              ))}
            </div>
            <div className="flex flex-col w-full space-y-3">
              <button
                onClick={handleProceed}
                className="w-full rounded-[12px] bg-gradient-to-r from-[#4b7c80] to-[#21556d] sm:py-1.5 lg:py-2.5 text-white font-medium text-base"
              >
                Proceed
              </button>
              <button
                onClick={startCountdown}
                className="text-center text-sm text-gray-500 hover:text-red-400"
              >
                Didn't receive code? Resend OTP{" "}
                {isCountdownRunning ? `in ${remainingSeconds}` : null}
              </button>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default SecurityPin;
