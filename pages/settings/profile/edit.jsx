import { BiEdit, BiTrash } from "react-icons/bi";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import Alert from "sweetalert2";
import Link from "next/link";
import LocationSelector from "../../../components/utils/LocationSelector";
import { parseCookies } from "nookies";
import axios from "axios";
import FormData from "form-data";
import { AppContext } from "../../_app";
import Head from "next/head";
import React from "react";
import Resizer from "react-image-file-resizer";
import AreaSelector from "../../../components/utils/AreaSelector";
function Edit({ userData, token }) {
  const { setUser } = useContext(AppContext);
  // const ApiServer = process.env.NEXT_PUBLIC_API_URL
  // const ServerRoot = process.env.NEXT_PUBLIC_ROOT_URL

  const avatarRef = useRef(null);
  const coverRef = useRef(null);
  const router = useRouter();
  const [education, setEducation] = useState([
    { exam: "", dep: "", result: "", year: "", institute: "" },
  ]);
  const [social, setSocial] = useState([{ icon: "fb", link: "" }]);

  const [becomeTutor, setBecomeTutor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarLocal, setAvatarLocal] = useState(null);
  const [coverLocal, setCoverLocal] = useState(null);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userClass, setUserClass] = useState("");
  const [userSubjects, setUserSubjects] = useState("");
  const [userInstitute, setUserInstitute] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [userAvatarNew, setUserAvatarNew] = useState();
  const [userCover, setUserCover] = useState(null);
  const [userCoverNew, setUserCoverNew] = useState();

  const [sending, setSending] = useState(false);

  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [areas, setAreas] = useState([]);
  const [start, setStart] = useState(false);

  //-----------auth-check
  useEffect(() => {
    if (!token || token == null) {
      router.push("/login");
    } else {
      if (userData) {
        setStart(!start);
        console.log(userData.user);
        setUserId(userData.user._id);
        setUserName(userData.user.name);
        setEmail(userData.user.email);
        setUserBio(userData.user.bio);
        setUserClass(userData.user.class);
        setUserSubjects(userData.user.subjects);
        setUserAge(userData.user.age);
        setUserInstitute(userData.user.institute);
        setUserDepartment(userData.user.department);
        setUserGender(userData.user.gender || "Male");
        setUserRole(userData.user.role);
        setUserAvatar(userData.user.avatarImg);
        setUserCover(userData.user.coverImg);
        setDivision(userData.user.division);
        setDistrict(userData.user.district);
        setArea(userData.user.area);
        setAreas(userData.user.areas);
        setStart(!start);
        setEducation(userData.user.education);
        setSocial(userData.user.social);
        setLoading(false);
      } else {
        router.push("/login");
      }
    }
  }, []);

  const handleChangeSocialField = (index, event) => {
    const values = [...social];
    values[index][event.target.name] = event.target.value;
    setSocial(values);
  };

  const handlAddSocialField = () => {
    setSocial([...social, { icon: "fb", link: "" }]);
  };
  const handlRemoveSocialField = (index) => {
    const values = [...social];
    values.splice(index, 1);
    setSocial(values);
  };

  const handleChangeEducationField = (index, event) => {
    const values = [...education];
    values[index][event.target.name] = event.target.value;
    setEducation(values);
  };
  const handlAddEducationField = () => {
    setEducation([
      ...education,
      { exam: "", dep: "", result: "", year: "", institute: "" },
    ]);
  };
  const handlRemoveEducationField = (index) => {
    const values = [...education];
    values.splice(index, 1);
    setEducation(values);
  };


  const resizeAvatar = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        "jpeg",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  const resizeCover = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1600,
        800,
        "jpeg",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const upload = async (e, t) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        if (t == "avatar") {
          await resizeAvatar(file).then((data) => {
            console.log(data);
            setUserAvatarNew(data);
            let fileReader = new FileReader();
            fileReader.readAsDataURL(data);
            fileReader.onload = (event) => {
              // @ts-ignore
              setAvatarLocal(event.target.result);
            };
          });
        } else if (t == "cover") {
          await resizeCover(file).then((data) => {
            setUserCoverNew(data);
            let fileReader = new FileReader();
            fileReader.readAsDataURL(data);
            fileReader.onload = (event) => {
              // @ts-ignore
              setCoverLocal(event.target.result);
            };
          });
        }
      } else {
        Alert.fire({
          title: "Oops",
          text: "Only PNG and JPEG format is supported.",
          icon: "error",
          confirmButtonColor: "#6366f1",
          confirmButtonText: "Ok",
          timer: 1500,
        });
      }
    }
  };

  //---------Save handler

  let formData = new FormData();
  formData.append("name", userName);
  formData.append("email", email);
  formData.append("age", userAge);
  formData.append("gender", userGender);
  formData.append("bio", userBio);
  formData.append("division", division);
  formData.append("district", district);
  formData.append("area", area);
  formData.append("subjects", userSubjects);
  formData.append("class", userClass);
  formData.append("institute", userInstitute);
  formData.append("department", userDepartment);
  formData.append("social", JSON.stringify(social));
  formData.append("education", JSON.stringify(education));
  formData.append("areas", JSON.stringify(areas));

  if (userAvatarNew) {
    formData.append("avatar", userAvatarNew);
  }
  if (userCoverNew) {
    formData.append("cover", userCoverNew);
  }

  const saveAndGoToUpgrade = (e) => {
    setSending(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/edit/${userId}`,
        formData,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        // @ts-ignore
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setSending(false);
        router.push("/settings/profile/upgrade");
      })
      .catch((res) => {
        Alert.fire({
          title: "OOps",
          text: res || "Something went wrong",
          icon: "error",
          confirmButtonColor: "#6366f1",
          confirmButtonText: "Ok",
          timer: 1500,
        });
      });
  };
  const handleSave = (e) => {
    setSending(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/edit/${userId}`,
        formData,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        // @ts-ignore
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setSending(false);
        Alert.fire({
          title: "Saved",
          text: "Successfully saved",
          icon: "success",
          confirmButtonColor: "#6366f1",
          confirmButtonText: "Ok",
          timer: 1500,
        });
      })
      .catch((res) => {
        Alert.fire({
          title: "OOps",
          text: res || "Something went wrong",
          icon: "error",
          confirmButtonColor: "#6366f1",
          confirmButtonText: "Ok",
          timer: 1500,
        });
      });
  };

  if (loading) {
    return <div></div>;
  }

  //-----------
  let profileImg;
  if (userAvatarNew) {
    profileImg = avatarLocal;
  } else {
    if (!userAvatar || userAvatar === "") {
      if (userGender == "male") {
        profileImg = `/boy.svg`;
      } else if (userGender == "female") {
        profileImg = `/girl.svg`;
      } else {
        profileImg = `/boy.svg`;
      }
    } else {
      profileImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userAvatar}`;
    }
  }
  let coverImg;
  if (userCoverNew) {
    coverImg = coverLocal;
  } else {
    if (!userCover || userCover === "") {
      coverImg = `/cover.svg`;
    } else {
      coverImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userCover}`;
    }
  }
  //-------------
  console.log(areas)
  return (
    <div className="flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col ">
      <Head>
        <title>TuitionApp - Edit account</title>
      </Head>
      <div className=" h-full w-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
        <div className=" w-full px-4  md:px-8 mx-auto">
          <div className=" w-full flex items-center justify-center px-8 py-4 mx-auto  bg-white dark:bg-neutral-800 shadow-lg rounded-t-lg">
            {userRole == "media" ||
              userRole == "admin" ||
              userRole == "super" ? (
              <div className="w-full md:w-6/12">
                <input
                  type="file"
                  ref={avatarRef}
                  onChange={(e) => upload(e, "avatar")}
                  className="hidden"
                />
                <input
                  type="file"
                  ref={coverRef}
                  onChange={(e) => upload(e, "cover")}
                  className="hidden"
                />

                <div className="flex flex-col justify-center items-center mb-5 ">
                  <div className="relative w-full h-64 overflow-hidden rounded-2xl -mb-20 bg-neutral-200 dark:bg-neutral-900 ">
                    <img src={coverImg || ""} alt="Cover Img" />
                    <button
                      onClick={() => {
                        // @ts-ignore
                        coverRef.current.click();
                      }}
                      className="h-10 w-10 rounded-full  bg-rose-600/50 absolute bottom-2 right-2 flex justify-center items-center"
                    >
                      <BiEdit
                        className={`text-gray-300 transition-colors duration-200 hover:text-white w-5 h-5`}
                      />
                    </button>
                  </div>
                  <div className="relative z-10 w-40 h-40 overflow-hidden border-4 bg-neutral-900 rounded-full border-rose-600">
                    <button
                      onClick={() => {
                        // @ts-ignore
                        avatarRef.current.click();
                      }}
                      className={`absolute bottom-0 w-full flex justify-center items-center px-2 py-2  rounded-md bg-rose-600/50`}
                    >
                      <BiEdit
                        className={`text-gray-300 transition-colors duration-200 hover:text-white w-5 h-5`}
                      />
                    </button>
                    <img src={profileImg || ""} alt="Profile image" />
                  </div>
                </div>

                <div className="flex justify-center items-center w-full">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                      className="block text-center text-2xl w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <textarea
                    placeholder="Bio"
                    onChange={(e) => setUserBio(e.target.value)}
                    value={userBio}
                    className="block w-full resize-none h-52 px-4 text-center py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  ></textarea>
                </div>
              </div>
            ) : (
              <div className="w-full md:w-4/12">
                <input
                  type="file"
                  ref={avatarRef}
                  onChange={(e) => upload(e, "avatar")}
                  className="hidden"
                />

                <div className="flex flex-col justify-center items-center mb-5 ">
                  <div className="relative z-10 w-40 h-40 overflow-hidden border-4 bg-neutral-900 rounded-full border-rose-600">
                    <button
                      onClick={() => {
                        // @ts-ignore
                        avatarRef.current.click();
                      }}
                      className={`absolute bottom-0 w-full flex justify-center items-center px-2 py-2  rounded-md bg-rose-600/50`}
                    >
                      <BiEdit
                        className={`text-gray-300 transition-colors duration-200 hover:text-white w-5 h-5`}
                      />
                    </button>
                    <img src={profileImg || ''} alt="Profile image" />
                  </div>
                  <div className=" w-full h-28 rounded-2xl -mt-20 bg-neutral-200 dark:bg-neutral-900 "></div>
                </div>

                <div className="flex justify-center items-center w-full">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                      className="block text-center text-2xl w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                </div>
                {userRole == "tutor" && (
                  <div className="w-full">
                    <textarea
                      placeholder="Bio"
                      onChange={(e) => setUserBio(e.target.value)}
                      value={userBio}
                      className="block w-full resize-none h52 px-4 text-center py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    ></textarea>
                  </div>
                )}
              </div>
            )}
          </div>

          <section className="w-full p-6 mx-auto bg-white rounded-b-md shadow-md dark:bg-neutral-800">
            {(
              <>
                <div className="w-full mt-4">
                  <div>
                    <label className="text-gray-700 dark:text-gray-200">
                      Email (this email address is only used for your payment)
                    </label>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                </div>


              </>
            )}
            {userRole == "tutor" ||
              userRole == "admin" ||
              userRole == "media" ||
              userRole == "super" ? (
              <>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div className="w-full mt-4">
                    <label className="text-gray-700 dark:text-gray-200">
                      Location
                    </label>

                    <AreaSelector
                      setDivision={setDivision}
                      setDistrict={setDistrict}
                      division={division}
                      district={district}
                      areas={areas}
                      setAreas={setAreas}
                    />
                  </div>
                  {
                    userRole == "tutor" &&
                    <>

                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Preferable Class
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setUserClass(e.target.value)}
                          value={userClass}
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Teaching Subjects
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setUserSubjects(e.target.value)}
                          value={userSubjects}
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          My Age
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setUserAge(e.target.value)}
                          value={userAge}
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Gender
                        </label>
                        <div className="relative mt-2">
                          <select
                            value={userGender}
                            onChange={(e) => setUserGender(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring appearance-none pr-8 rounded leading-tight "
                            id="grid-state"
                          >
                            <option value={"male"}>Male</option>
                            <option value={"female"}>Female</option>
                            <option value={"custom"}>Custom</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-700 dark:text-gray-200">
                          Institute{" "}
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setUserInstitute(e.target.value)}
                          placeholder="Dhaka University"
                          value={userInstitute}
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>

                    </>
                  }
                  <div>
                    <label className="text-gray-700 dark:text-gray-200">
                      {userRole == 'tutor' ? 'Department' : 'Office Location'}
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setUserDepartment(e.target.value)}
                      placeholder={userRole == 'tutor' ? "English (1st semi)" : '#1,ave2...'}
                      value={userDepartment}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                </div>
                {
                  userRole == 'tutor' &&
                  <div className="p-4 mt-5 border rounded-lg border-rose-600 ">
                    <h2 className="text-lg font-semibold text-left text-gray-700 capitalize dark:text-white">
                      Education Details
                    </h2>
                    {education.map((row, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 border p-4 rounded gap-6 mt-1 md:grid-cols-6"
                      >
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Exam [Ex: SSC, HSC/Eq]{" "}
                          </label>
                          <input
                            placeholder="Exam"
                            onChange={(event) =>
                              handleChangeEducationField(index, event)
                            }
                            value={row.exam}
                            name="exam"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>

                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Section/Dep
                          </label>
                          <input
                            placeholder="Sec/Dep"
                            onChange={(event) =>
                              handleChangeEducationField(index, event)
                            }
                            value={row.dep}
                            name="dep"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>

                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Result
                          </label>
                          <input
                            placeholder="Result"
                            onChange={(event) =>
                              handleChangeEducationField(index, event)
                            }
                            value={row.result}
                            name="result"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Year
                          </label>
                          <input
                            placeholder="Year"
                            onChange={(event) =>
                              handleChangeEducationField(index, event)
                            }
                            value={row.year}
                            name="year"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-gray-700 dark:text-gray-200">
                            Inst/Board
                          </label>
                          <input
                            placeholder="Institution"
                            onChange={(event) =>
                              handleChangeEducationField(index, event)
                            }
                            value={row.institute}
                            name="institute"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handlRemoveEducationField(index)}
                            className="w-10  h-10 mt-2 flex justify-center items-center shrink-0 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg shadow-lg transition duration-100"
                          >
                            <BiTrash className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={handlAddEducationField}
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-neutral-700 rounded-md hover:bg-neutral-600 focus:outline-none focus:bg-neutral-600"
                      >
                        Add new row
                      </button>
                    </div>
                  </div>
                }
                <div className="p-4 mt-5 border rounded-lg border-rose-600 ">
                  <h2 className="text-lg font-semibold text-left text-gray-700 capitalize dark:text-white">
                    Social Links (must include https://)
                  </h2>
                  {social.map((row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 border p-4 rounded gap-4 mt-1 md:grid-cols-7"
                    >
                      <div className="col-span-3">
                        <label className="text-gray-700 dark:text-gray-200">
                          Name
                        </label>
                        <select
                          value={row.icon}
                          onChange={(event) =>
                            handleChangeSocialField(index, event)
                          }
                          name="icon"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring appearance-none pr-8 rounded leading-tight "
                          id="grid-state"
                        >
                          <option value={"fb"}>Facebook</option>
                          <option value={"ig"}>Instagram</option>
                          <option value={"tt"}>Twitter</option>
                          <option value={"in"}>Linkedin</option>
                          <option value={"yt"}>Youtube</option>
                        </select>
                      </div>
                      <div className="col-span-3">
                        <label className="text-gray-700 dark:text-gray-200">
                          Link
                        </label>
                        <input
                          placeholder="https://facebook.com/username"
                          onChange={(event) =>
                            handleChangeSocialField(index, event)
                          }
                          value={row.link}
                          name="link"
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="flex items-center justify-center col-span-1">
                        <button
                          onClick={() => handlRemoveSocialField(index)}
                          className="w-10  h-10 mt-2 flex justify-center items-center shrink-0 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg shadow-lg transition duration-100"
                        >
                          <BiTrash className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handlAddSocialField}
                      className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-rose-600 rounded-md hover:bg-rose-700 focus:outline-none focus:bg-rose-700"
                    >
                      Add new row
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="flex justify-center mt-6">
              <button
                onClick={(event) => handleSave(event)}
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-rose-600 rounded-md hover:bg-rose-700 focus:outline-none focus:bg-rose-700"
              >
                {sending ? "Saving..." : "Save"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  let token = parseCookies(ctx).authToken || null;
  if (token) {
    let res;
    try {
      res = await fetch(`${process.env.API_URL}/my-profile`, {
        headers: {
          token: token,
        },
      });
    } catch (error) {
      res = await fetch(`${process.env.API_URL}/my-profile`, {
        headers: {
          token: token,
        },
      });
    }
    const user = await res.json();
    return {
      props: {
        userData: user.user ? user : null,
        token: token,
      },
    };
  } else {
    return {
      props: {
        userData: null,
        token: null,
      },
    };
  }
}

export default Edit;
