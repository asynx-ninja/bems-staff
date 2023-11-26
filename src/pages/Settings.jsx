import React, { useEffect, useState, useRef } from "react";
import defaultPFP from "../assets/sample-image/default-pfp.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  FaCamera,
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_LINK from "../config/API";
import banner from "../assets/image/1.png";
import OccupationList from "../components/occupations/OccupationList";

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const fileInputRef = useRef();
  const handleAdd = (e) => {
    e.preventDefault();

    fileInputRef.current.click();
  };
  const [activeButton, setActiveButton] = useState({
    personal: true,
    credential: false,
  });
  const [editButton, setEditButton] = useState(true);
  const [pfp, setPfp] = useState();
  const [userAddress, setUserAddress] = useState({
    street: "",
    brgy: "",
    city: "",
  });
  const [userData, setUserData] = useState({});
  const [userCred, setUserCred] = useState({
    username: "",
    oldPass: "",
    newPass: "",
  });
  const [message, setMessage] = useState({
    display: false,
    success: false,
    error: false,
    message: "",
  });
  const [newpasswordShown, setNewPasswordShown] = useState(false);
  const [oldpasswordShown, setOldPasswordShown] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const toggleOldPassword = (e) => {
    setOldPasswordShown(!oldpasswordShown);
  };
  const toggleNewPassword = (e) => {
    setNewPasswordShown(!newpasswordShown);
  };
  const [passwordStrengthError, setPasswordStrengthError] = useState(false);
  const [passwordStrengthSuccess, setPasswordStrengthSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [userSocials, setUserSocials] = useState({
    facebook: {
      name: "",
      link: "",
    },
    instagram: {
      name: "",
      link: "",
    },
    twitter: {
      name: "",
      link: "",
    },
  });

  const handleFileChange = (e) => {
    e.preventDefault();

    setPfp(e.target.files[0]);

    var output = document.getElementById("pfp");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        if (res.status === 200) {
          setUserData(res.data[0]);
          setUserAddress({
            street: res.data[0].address.street,
            brgy: res.data[0].address.brgy,
            city: res.data[0].address.city,
          });
          setUserCred({
            username: res.data[0].username,
            oldPass: "",
            newPass: "",
          });
          setUserSocials({
            facebook: {
              name: res.data[0].socials.facebook.name,
              link: res.data[0].socials.facebook.link,
            },
            instagram: {
              name: res.data[0].socials.instagram.name,
              link: res.data[0].socials.instagram.link,
            },
            twitter: {
              name: res.data[0].socials.twitter.name,
              link: res.data[0].socials.twitter.link,
            },
          });
          var pfpSrc = document.getElementById("pfp");
          pfpSrc.src =
            res.data[0].profile.link !== ""
              ? res.data[0].profile.link
              : defaultPFP;
        } else {
          setError("Invalid username or password");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    document.title = "Settings | Barangay E-Services Management";
  }, []);

  const handleUserDataChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleUserChangeAdd = (field, value) => {
    setUserAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUserChangeCred = (field, value) => {
    setUserCred((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "newPass") {
      const password = value;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
      const symbolRegex = /[@$!%*?&]/;

      if (!passwordRegex.test(password) || !symbolRegex.test(password)) {
        setPasswordStrengthError(true);
        setPasswordStrengthSuccess(false);
      } else {
        setPasswordStrengthError(false);
        setPasswordStrengthSuccess(true);
      }
      // Check if passwords match

      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      setPasswordStrength(strength * 25);
    }
  };

  const handleUserSocials = (social, subsocial, value) => {
    setUserSocials({
      ...userSocials,
      [social]: {
        ...userSocials[social],
        [subsocial]: value,
      },
    });
  };

  // console.log(userSocials)

  const saveChanges = async (e) => {
    const obj = {
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      suffix: userData.suffix,
      religion: userData.religion,
      email: userData.email,
      birthday: userData.birthday,
      age: userData.age,
      contact: userData.contact,
      sex: userData.sex,
      address: {
        street: userAddress.street,
        brgy: userAddress.brgy,
        city: userAddress.city,
      },
      occupation: userData.occupation,
      civil_status: userData.civil_status,
      type: userData.type,
      isVoter: userData.isVoter,
      isHead: userData.isHead,
      username: userData.username,
      profile: userData.profile,
      socials: {
        facebook: userSocials.facebook,
        instagram: userSocials.instagram,
        twitter: userSocials.twitter,
      },
    };

    try {
      console.log(pfp);
      var formData = new FormData();
      formData.append("users", JSON.stringify(obj));
      formData.append("file", pfp);
      const response = await axios.patch(`${API_LINK}/users/${id}`, formData);

      // CHANGE USER CREDENTIALS

      // CHANGE USERNAME
      if (userCred.username !== userData.username) {
        changeCredentials(
          userData.username,
          userCred.username,
          userCred.oldPass,
          userCred.newPass
        );
      }

      // CHANGE PASSWORD
      if (userCred.newPass !== "") {
        changeCredentials(
          userData.username,
          userCred.username,
          userCred.oldPass,
          userCred.newPass
        );
      }

      if (response.status === 200) {
        console.log("Update successful:", response);
        setUserData(response.data);
        setUserAddress({
          street: response.data.address.street,
          brgy: response.data.address.brgy,
          city: response.data.address.city,
        });
        setUserSocials({
          facebook: response.data.socials.facebook,
          instagram: response.data.socials.instagram,
          twitter: response.data.socials.twitter,
        });
        setEditButton(true);
      } else {
        console.error("Update failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const changeCredentials = async (
    oldUsername,
    newUsername,
    oldPassword,
    newPassword
  ) => {
    const user = {
      username: newUsername !== oldUsername ? newUsername : oldUsername,
      password: newPassword !== "" ? newPassword : oldPassword,
    };

    console.log(user);

    try {
      const response = await axios.get(
        `${API_LINK}/auth/${oldUsername}/${oldPassword}/${userData.type}`
      );

      console.log(response);

      if (response.status === 200) {
        await axios.patch(`${API_LINK}/auth/${id}`, user);
        setMessage({
          display: true,
          success: true,
          error: false,
          message: "Success!",
        });
      }
    } catch (err) {
      setMessage({
        display: true,
        success: false,
        error: true,
        message: "The password you entered is incorrect",
      });
    }
  };

  const birthdayFormat = (date) => {
    const birthdate = date === undefined ? "" : date.substr(0, 10);
    return birthdate;
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleOnActive = (e) => {
    if (e.target.name === "personal") {
      setActiveButton({
        personal: true,
        credential: false,
      });
    } else {
      setActiveButton({
        personal: false,
        credential: true,
      });
    }
  };

  const handleOnEdit = (e) => {
    if (e.target.name === "edit") {
      setEditButton(false);
    } else {
      setEditButton(true);
    }
  };

  return (
    <div className="mx-4 overflow-y-auto lg:h-[calc(100vh_-_80px)]">
      <div className="flex flex-col w-full justify-center items-center">
        <div className="w-full relative">
          <img
            className="h-[200px] w-full obj object-cover bg-black opacity-[80%]"
            src={banner}
            alt=""
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-300 opacity-[50%]"></div>
        </div>
        <div className="flex flex-col-reverse sm:px-[5px] px-[20px] justify-center items-center mb-[20px] sm:w-[95%] lg:w-full">
          <div className="flex flex-col sm:w-full md:w-[95%] mx-auto">
            <div className="flex gap-[10px] my-5 pb-[10px] border-b-[2px] border-b-gray-200 px-[10px]">
              <button
                name="personal"
                onClick={handleOnActive}
                className={
                  activeButton.personal
                    ? "sm:text-[14px] md:text-[18px] h-[50px] px-[20px] rounded-md bg-[#2f4da5] text-white font-medium"
                    : "sm:text-[14px] md:text-[18px] h-[50px] px-[20px] rounded-md bg-white text-black font-medium transition-all ease-in-out hover:bg-[#2f4da5] hover:text-white"
                }
              >
                Personal Info
              </button>
              <button
                name="credential"
                onClick={handleOnActive}
                className={
                  activeButton.credential
                    ? "sm:text-[14px] md:text-[18px] h-[50px] px-[20px] rounded-md bg-[#2f4da5] text-white font-medium"
                    : "sm:text-[14px] md:text-[18px] h-[50px] px-[20px] rounded-md bg-white text-black font-medium transition-all ease-in-out hover:bg-[#2f4da5] hover:text-white"
                }
              >
                Account Info
              </button>
            </div>

            <div className={activeButton.personal ? "block" : "hidden"}>
              <div className="h-full w-full shadow-lg px-[30px] pb-[30px]">
                {/* PERSONAL DATA */}

                <div>
                  <div className="w-full border-b-[2px] border-black mb-5">
                    <h6 className="font-bold">PERSONAL DATA</h6>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                    <div>
                      <label
                        htmlFor="fistName"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        First name
                      </label>
                      <input
                        disabled={editButton}
                        type="text"
                        id="fistName"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="First name"
                        value={userData.firstName || ""}
                        // onChange={(e) =>
                        //   handleUserDataChange('firstName', e.target.value)
                        // }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="middleName"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Middle name
                      </label>
                      <input
                        disabled={editButton}
                        type="text"
                        id="middleName"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="First name"
                        value={userData.middleName || ""}
                        onChange={(e) =>
                          handleUserDataChange("middleName", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Last name
                      </label>
                      <input
                        disabled={editButton}
                        id="lastName"
                        type="text"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Last name"
                        aria-describedby="hs-input-helper-text"
                        value={userData.lastName || ""}
                        onChange={(e) =>
                          handleUserDataChange("lastName", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="suffix"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Suffix
                      </label>
                      <input
                        disabled={editButton}
                        id="suffix"
                        type="text"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Suffix"
                        aria-describedby="hs-input-helper-text"
                        value={userData.suffix || ""}
                        onChange={(e) =>
                          handleUserDataChange("suffix", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="gender"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Gender
                      </label>
                      <select
                        disabled={editButton}
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Suffix"
                        aria-describedby="hs-input-helper-text"
                        id="gender"
                        name="gender"
                        value={userData.sex || ""}
                        onChange={(e) =>
                          handleUserDataChange("sex", e.target.value)
                        }
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="birthday"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Birthday
                      </label>
                      <input
                        type="date"
                        disabled={editButton}
                        id="birthday"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Birthday"
                        aria-describedby="hs-input-helper-text"
                        value={birthdayFormat(userData.birthday) || ""}
                        onChange={(e) =>
                          handleUserDataChange("birthday", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="age"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Age
                      </label>
                      <input
                        type="number"
                        disabled={editButton}
                        readOnly
                        id="age"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Suffix"
                        aria-describedby="hs-input-helper-text"
                        value={calculateAge(userData.birthday) || ""}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Phone number
                      </label>
                      <input
                        type="text"
                        disabled={editButton}
                        id="phone"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="#"
                        aria-describedby="hs-input-helper-text"
                        value={userData.contact || ""}
                        onChange={(e) =>
                          handleUserDataChange("contact", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <input
                        disabled={editButton}
                        type="email"
                        id="email"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="you@example.com"
                        aria-describedby="hs-input-helper-text"
                        value={userData.email || ""}
                        onChange={(e) =>
                          handleUserDataChange("email", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* ADDRESS DETAILS */}

                <div>
                  <div className="w-full border-b-[2px] border-black my-5">
                    <h6 className="font-bold">ADDRESS DETAILS</h6>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                    <div>
                      <label
                        htmlFor="street"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Street
                      </label>
                      <input
                        type="text"
                        disabled={editButton}
                        id="street"
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Street"
                        aria-describedby="hs-input-helper-text"
                        value={userAddress.street || ""}
                        onChange={(e) =>
                          handleUserChangeAdd("street", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="brgy"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Barangay
                      </label>
                      <select
                        disabled={editButton}
                        id="brgy"
                        name="brgy"
                        value={userAddress.brgy || ""}
                        onChange={(e) =>
                          handleUserChangeAdd("brgy", e.target.value)
                        }
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                      >
                        <option selected>{userAddress.brgy}</option>
                        <option>Balite</option>
                        <option>Burgos</option>
                        <option>Geronimo</option>
                        <option>Macabud</option>
                        <option>Manggahan</option>
                        <option>Mascap</option>
                        <option>Puray</option>
                        <option>Rosario</option>
                        <option>San Isidro</option>
                        <option>San Jose</option>
                        <option>San Rafael</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        City
                      </label>
                      <select
                        id="city"
                        name="city"
                        disabled={editButton}
                        readOnly
                        value={userAddress.city || ""}
                        onChange={(e) =>
                          handleUserChangeAdd("city", e.target.value)
                        }
                        className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                      >
                        <option selected>Montalban</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* OTHER PERSONAL DATA */}

                <div>
                  <div className="w-full border-b-[2px] border-black my-5">
                    <h6 className="font-bold">OTHER PERSONAL DATA</h6>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                    <div>
                      <label
                        htmlFor="occupation"
                        className="block sm:text-xs lg:text-sm font-medium mb-2"
                      >
                        Occupation
                      </label>
                      <div className="relative z-0 w-full mb-3 group">
                        <OccupationList
                          handleUserDataChange={handleUserDataChange}
                          occupation={userData.occ}
                          editButton={editButton}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block sm:text-xs lg:text-sm font-medium mb-2">
                        * Head of the Family?
                      </label>
                      <div className="flex items-center">
                        <input
                          className="shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 focus:ring-green-500"
                          disabled={editButton}
                          id="isHeadYes"
                          name="isHead"
                          type="radio"
                          value={1}
                          checked={userData.isHead}
                          onChange={(e) => handleUserDataChange("isHead", true)}
                        />
                        <label htmlFor="male" className="ml-2">
                          Yes
                        </label>
                        <input
                          className="ml-4 shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 focus:ring-green-500"
                          disabled={editButton}
                          id="isHeadNo"
                          name="isHead"
                          type="radio"
                          value={0}
                          checked={!userData.isHead}
                          onChange={(e) =>
                            handleUserDataChange("isHead", false)
                          }
                        />
                        <label className="ml-2">No</label>
                      </div>
                    </div>
                    <div>
                      <label className="block sm:text-xs lg:text-sm font-medium mb-2">
                        * Registered Voter
                      </label>
                      <div className="flex items-center">
                        <input
                          className="shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 focus:ring-green-500"
                          disabled={editButton}
                          id="isVoterYes"
                          name="isVoter"
                          type="radio"
                          value={1}
                          checked={userData.isVoter}
                          onChange={(e) =>
                            handleUserDataChange("isVoter", true)
                          }
                        />
                        <label htmlFor="male" className="ml-2">
                          Yes
                        </label>
                        <input
                          disabled={editButton}
                          className="ml-4 shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 focus:ring-green-500"
                          id="isVoterNo"
                          name="isVoter"
                          type="radio"
                          value={0}
                          checked={!userData.isVoter}
                          onChange={(e) =>
                            handleUserDataChange("isVoter", false)
                          }
                        />
                        <label className="ml-2">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SOCIALS */}

                <div className={editButton ? "hidden" : "block"}>
                  <div className="w-full border-b-[2px] border-black my-5">
                    <h6 className="font-bold">SOCIALS</h6>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-3 p-2">
                      <div>
                        <label
                          htmlFor="facebookName"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Facebook Name
                        </label>
                        <input
                          id="facebookName"
                          type="text"
                          value={userSocials.facebook.name || ""}
                          disabled={editButton}
                          onChange={(e) => {
                            handleUserSocials(
                              "facebook",
                              "name",
                              e.target.value
                            );
                          }}
                          className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                          aria-describedby="hs-input-helper-text"
                          placeholder="Enter your Facebook Link"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="facebookLink"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Facebook Link
                        </label>
                        <input
                          type="text"
                          id="facebookLink"
                          value={userSocials.facebook.link || ""}
                          disabled={editButton}
                          onChange={(e) => {
                            handleUserSocials(
                              "facebook",
                              "link",
                              e.target.value
                            );
                          }}
                          className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                          aria-describedby="hs-input-helper-text"
                          placeholder="Enter your Facebook Link"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 p-2 sm:border-[0px] sm:border-t-[1px] sm:border-b-[1px] md:border-t-[0px] md:border-b-[0px] md:border-l-[1px] md:border-r-[1px] border-green-300">
                      <div>
                        <label
                          htmlFor="instagramName"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Instagram Name
                        </label>
                        <input
                          id="instagramName"
                          type="text"
                          value={userSocials.instagram.name || ""}
                          disabled={editButton}
                          onChange={(e) => {
                            handleUserSocials(
                              "instagram",
                              "name",
                              e.target.value
                            );
                          }}
                          className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                          aria-describedby="hs-input-helper-text"
                          placeholder="Enter your Facebook Link"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="instagramLink"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Instagram Link
                        </label>
                        <input
                          id="instagramLink"
                          type="text"
                          value={userSocials.instagram.link || ""}
                          disabled={editButton}
                          onChange={(e) => {
                            handleUserSocials(
                              "instagram",
                              "link",
                              e.target.value
                            );
                          }}
                          className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                          aria-describedby="hs-input-helper-text"
                          placeholder="Enter your Facebook Link"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 p-2">
                      <div>
                        <label
                          htmlFor="twitterName"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Twitter Name
                        </label>
                        <input
                          id="twitterName"
                          type="text"
                          value={userSocials.twitter.name || ""}
                          disabled={editButton}
                          onChange={(e) => {
                            handleUserSocials(
                              "twitter",
                              "name",
                              e.target.value
                            );
                          }}
                          className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                          aria-describedby="hs-input-helper-text"
                          placeholder="Enter your Facebook Link"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="twitterLink"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Twitter Link
                        </label>
                        <input
                          id="twitterLink"
                          type="text"
                          value={userSocials.twitter.link || ""}
                          disabled={editButton}
                          onChange={(e) => {
                            handleUserSocials(
                              "twitter",
                              "link",
                              e.target.value
                            );
                          }}
                          className="py-3 px-4 block w-full border-gray-200 text-black rounded-md text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                          aria-describedby="hs-input-helper-text"
                          placeholder="Enter your Facebook Link"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                activeButton.credential
                  ? "shadow-lg px-[30px] pb-[30px]"
                  : "hidden"
              }
            >
              <div className="flex flex-col w-[80%] justify-center mx-auto gap-4">
                <div className={message.display ? "block" : "hidden"}>
                  <div
                    className={
                      message.success
                        ? "w-[100%] bg-green-400 rounded-md flex"
                        : "hidden"
                    }
                  >
                    <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
                      {message.message}
                    </p>
                  </div>
                  <div
                    className={
                      message.error
                        ? "w-[100%] bg-red-500 rounded-md flex"
                        : "hidden"
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
                    placeholder="username"
                    aria-describedby="hs-input-helper-text"
                    value={userCred.username || ""}
                    onChange={(e) =>
                      handleUserChangeCred("username", e.target.value)
                    }
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
                    placeholder="password"
                    aria-describedby="hs-input-helper-text"
                    onChange={(e) =>
                      handleUserChangeCred("oldPass", e.target.value)
                    }
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
                      <AiOutlineEyeInvisible
                        style={{ color: "green" }}
                        size={20}
                      />
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
                      placeholder="password"
                      aria-describedby="hs-input-helper-text"
                      onChange={(e) =>
                        handleUserChangeCred("newPass", e.target.value)
                      }
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
                        <AiOutlineEyeInvisible
                          style={{ color: "green" }}
                          size={20}
                        />
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
                        <span className="font-bold">Sucess:</span> Password is
                        already strong
                      </div>
                    )}
                    {passwordStrengthError && passwordStrength < 100 && (
                      <div
                        className="bg-orange-50 border border-orange-200 text-sm text-orange-600 rounded-md p-4 mt-2"
                        role="alert"
                      >
                        <span className="font-bold">Warning:</span> Password
                        must contain at least 8 characters, one uppercase
                        letter, one lowercase letter, one number, and one
                        special character
                      </div>
                    )}
                  </div>
                </div>
                <div className={editButton ? "hidden" : "mx-auto"}>
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
                        : "bg-[#2f4da5] text-white mx-auto w-[200px] font-medium px-[20px] py-[5px] rounded-md"
                    }
                    onClick={() => setChangePass(!changePass)}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:w-full lg:w-[95%] relative mt-[-150px] mb-[20px]">
            <div className="flex flex-col justify-center items-center">
              <div>
                <div className="relative lg:w-full flex flex-col m-auto justify-center items-center">
                  <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <label
                      htmlFor="file_input"
                      onClick={handleAdd}
                      className={
                        editButton
                          ? "hidden"
                          : "block text-transparent p-[70px] font-medium rounded-full text-sm text-center opacity-0 hover:opacity-100 transition-opacity hover:bg-[#295141] hover:bg-opacity-60 cursor-pointer"
                      }
                    >
                      <FaCamera
                        size={50}
                        style={{ color: "#ffffff" }}
                        className="cursor-none"
                      />
                    </label>
                    <input
                      disabled={editButton}
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      accept="image/*"
                      multiple="multiple"
                      className="hidden"
                    />
                  </div>
                  <img
                    id="pfp"
                    className="w-[200px] h-[200px] rounded-full sm:mb-3 lg:mb-0 border-[5px] border-[#295141] object-cover"
                  />
                  {/* <button className="relative bottom-[25px] w-[40px] h-[40px] flex justify-center items-center rounded-full bg-[#295141] text-white px-3 py-2">
                                    <FaCamera size={20} className="cursor-none" />
                                </button> */}
                </div>
                <div className="flex flex-col justify-center items-center mt-1">
                  <h6 className="font-bold">
                    {userData.firstName} {userData.lastName}
                  </h6>
                  <p className="text-[12px] leading-[10px]">
                    {userData.username}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center sm:w-[80%] md:w-[95%] lg:w-full items-center mx-auto mt-5 rounded-md p-[10px]">
                <div className="flex justify-center items-center border-b-[1px] border-gray-300 w-full pb-[10px]">
                  <h6 className="font-bold text-black">SOCIALS</h6>
                </div>
                <div className="p-[10px] flex sm:flex-col md:flex-row gap-5">
                  <button className="flex gap-2 justify-left items-center transition-all ease-in-out hover:bg-custom-green-header hover:rounded-full hover:text-white text-black hover:p-2">
                    <FaFacebook />
                    <p className="text-left truncate text-[14px]">
                      {userSocials.facebook.name}
                    </p>
                  </button>
                  <button className="flex gap-2 justify-left items-center transition-all ease-in-out hover:bg-custom-green-header hover:rounded-full hover:text-white text-black hover:p-2">
                    <FaInstagram />
                    <p className="text-left truncate text-[14px]">
                      {userSocials.instagram.name}
                    </p>
                  </button>
                  <button className="flex gap-2 justify-left items-center transition-all ease-in-out hover:bg-custom-green-header hover:rounded-full hover:text-white text-black hover:p-2">
                    <FaTwitter />
                    <p className="text-left truncate text-[14px]">
                      {userSocials.twitter.name}
                    </p>
                  </button>
                  <button className="flex gap-2 justify-left items-center transition-all ease-in-out hover:bg-custom-green-header hover:rounded-full hover:text-white text-black hover:p-2">
                    <FaPhone />
                    <p className="text-left truncate text-[14px]">
                      {userData.contact}
                    </p>
                  </button>
                  <button className=" flex gap-2 justify-left items-center transition-all ease-in-out hover:bg-custom-green-header hover:rounded-full hover:text-white text-black hover:p-2">
                    <FaEnvelope />
                    <p className="text-left truncate text-[14px]">
                      {userData.email}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[20px] flex justify-center items-center gap-5">
        {editButton ? (
          <button
            name="edit"
            onClick={handleOnEdit}
            className="bg-[#2f4da5] text-white font-medium px-[20px] py-[5px] rounded-md"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-5">
            <button
              type="submit"
              name="save"
              onClick={saveChanges}
              className="bg-custom-green-button text-white font-medium px-[20px] py-[5px] rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleOnEdit}
              name="cancel"
              className="bg-custom-red-button text-white font-medium px-[20px] py-[5px] rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
