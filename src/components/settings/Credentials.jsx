import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Credentials = ({
  userCred,
  handleUserChangeCred,
  editButton,
  message,
  passwordStrengthError,
  passwordStrengthSuccess,
  passwordStrength,
}) => {
  const [changePass, setChangePass] = useState(false);
  const [newpasswordShown, setNewPasswordShown] = useState(false);
  const [oldpasswordShown, setOldPasswordShown] = useState(false);

  const toggleOldPassword = (e) => {
    setOldPasswordShown(!oldpasswordShown);
  };

  const toggleNewPassword = (e) => {
    setNewPasswordShown(!newpasswordShown);
  };

  return (
    <div className="flex flex-col w-[80%] justify-center mx-auto gap-4">
      <div className={message.display ? "block" : "hidden"}>
        <div
          className={
            message.success ? "w-[100%] bg-green-400 rounded-md flex" : "hidden"
          }
        >
          <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
            {message.message}
          </p>
        </div>
        <div
          className={
            message.error ? "w-[100%] bg-red-500 rounded-md flex" : "hidden"
          }
        >
          <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
            {message.message}
          </p>
        </div>
      </div>
      <div className={!changePass ? "flex flex-col" : "hidden"}>
        <label
          htmlFor="username"
          className="block sm:text-xs lg:text-sm font-medium mb-2"
        >
          Username
        </label>
        <input
          type="text"
          disabled={editButton}
          id="username"
          className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
          placeholder="Username"
          aria-describedby="hs-input-helper-text"
          value={userCred.username || ""}
          onChange={(e) => handleUserChangeCred("username", e.target.value)}
        />
      </div>

      <div className="relative z-0">
        <label
          htmlFor="oldpass"
          className="block sm:text-xs lg:text-sm font-medium mb-2"
        >
          Enter your old password
        </label>
        <input
          type={oldpasswordShown ? "text" : "password"}
          disabled={editButton}
          id="oldpass"
          className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
          placeholder="Password"
          aria-describedby="hs-input-helper-text"
          onChange={(e) => handleUserChangeCred("oldPass", e.target.value)}
        />
        <button
          name="old"
          type="button"
          onClick={toggleOldPassword}
          className="absolute right-2 sm:top-5 lg:top-7 p-2.5 mt-1 text-sm font-medium text-white"
        >
          {oldpasswordShown ? (
            <AiOutlineEye style={{ color: "green" }} size={20} />
          ) : (
            <AiOutlineEyeInvisible style={{ color: "green" }} size={20} />
          )}
        </button>
      </div>
      <div className={changePass ? "flex flex-col" : "hidden"}>
        <div className="relative z-0">
          <label
            htmlFor="newpass"
            className="block sm:text-xs lg:text-sm font-medium mb-2"
          >
            Enter your new password
          </label>
          <input
            type={newpasswordShown ? "text" : "password"}
            disabled={editButton}
            readOnly={userCred.oldPass === ""}
            id="newpass"
            className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
            placeholder="Password"
            aria-describedby="hs-input-helper-text"
            onChange={(e) => handleUserChangeCred("newPass", e.target.value)}
          />
          <button
            name="new"
            type="button"
            onClick={toggleNewPassword}
            className="absolute right-2 sm:top-5 lg:top-7 p-2.5 mt-1 text-sm font-medium text-white"
          >
            {newpasswordShown ? (
              <AiOutlineEye style={{ color: "green" }} size={20} />
            ) : (
              <AiOutlineEyeInvisible style={{ color: "green" }} size={20} />
            )}
          </button>
        </div>
        <div>
          {userCred.newPass && (
            <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
              <div
                className={`flex flex-col justify-center overflow-hidden ${
                  passwordStrength < 25
                    ? "bg-red-500"
                    : passwordStrength < 50
                    ? "bg-yellow-500"
                    : passwordStrength < 75
                    ? "bg-amber-500"
                    : passwordStrength < 100
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
                role="progressbar"
                style={{ width: `${passwordStrength}%` }}
                aria-valuenow={passwordStrength}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          )}
          {passwordStrengthSuccess && (
            <div
              className="bg-green-50 border border-green-200 text-sm text-green-600 rounded-md p-4 mt-2"
              role="alert"
            >
              <span className="font-bold">Sucess:</span> Password is already
              strong
            </div>
          )}
          {passwordStrengthError && passwordStrength < 100 && (
            <div
              className="bg-orange-50 border border-orange-200 text-sm text-orange-600 rounded-md p-4 mt-2"
              role="alert"
            >
              <span className="font-bold">Warning:</span> Password must contain
              at least 8 characters, one uppercase letter, one lowercase letter,
              one number, and one special character
            </div>
          )}
        </div>
      </div>
      {/* <div className={editButton ? "hidden" : "mx-auto"}>
        <button
          className={
            changePass
              ? "bg-custom-green-button text-white mx-auto w-[200px] font-medium px-[20px] py-[5px] rounded-md"
              : "hidden"
          }
          onClick={() => setChangePass(!changePass)}
        >
          Change Username
        </button>
        <button
          className={
            changePass
              ? "hidden"
              : "bg-custom-green-button text-white mx-auto w-[200px] font-medium px-[20px] py-[5px] rounded-md"
          }
          onClick={() => setChangePass(!changePass)}
        >
          Change Password
        </button>
      </div> */}
    </div>
  );
};

export default Credentials;
