import React from "react";
import { BiBookBookmark } from "react-icons/bi";
import { BsGenderMale } from "react-icons/bs";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaGraduationCap,
  FaRegClock,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import {
  MdMarkEmailUnread,
  MdOutlineDoNotDisturb,
  MdOutlineLocationOn,
} from "react-icons/md";

const Tabs = ({ data, rating }) => {
  const userInfo = data.data;

  console.log({ userInfo });

  console.log({
    ratings: userInfo.ratings,
    postedBy: userInfo.ratings[0]?.postedBy,
  });
  const [openTab, setOpenTab] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const [currentRating, setCurrentRating] = React.useState(0);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="flex-auto text-center">
              <a
                className={
                  "text-md font-semibold  px-5 block leading-normal " +
                  (openTab === 1 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#"
                role="tablist"
              >
                Details
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md font-semibold  px-5 block leading-normal " +
                  (openTab === 2 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Education
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md font-semibold  px-5 block leading-normal " +
                  (openTab === 3 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Experience
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md font-semibold  px-5 block leading-normal " +
                  (openTab === 4 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Reviews
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border-t-2 border-black">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <div className="flex flex-row">
                    {userInfo.gender && (
                      <p className="mx-2 flex items-center capitalize">
                        <BsGenderMale className="mr-1" />
                        {userInfo.gender}
                      </p>
                    )}
                    {userInfo.age && (
                      <p className="mx-2 flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        Joined on {userInfo.age}
                      </p>
                    )}
                  </div>
                  <p className="text-lg mt-3">{userInfo.bio}</p>
                  <div className="mt-3">
                    {userInfo?.subjects && (
                      <div className="my-3">
                        <h5 className="flex items-center font-semibold">
                          <BiBookBookmark className="mr-1" />
                          Tuition Subjects:
                        </h5>
                        <p>{userInfo?.subjects}</p>
                      </div>
                    )}
                    {userInfo?.class && (
                      <div className="my-3">
                        <h5 className="flex items-center font-semibold">
                          <FaRegClock className="mr-1" />
                          Preferable Class:
                        </h5>
                        <p>{userInfo?.class}</p>
                      </div>
                    )}
                    {userInfo?.area && (
                      <div className="my-3">
                        <h5 className="flex items-center font-semibold">
                          <MdOutlineLocationOn className="mr-1 text-2xl" />
                          Preferable Area:
                        </h5>
                        <p>{userInfo?.area}</p>
                      </div>
                    )}
                    {userInfo?.email && (
                      <div className="my-3">
                        <h5 className="flex items-center font-semibold">
                          <MdMarkEmailUnread className="mr-1 text-2xl" />
                          Email:
                        </h5>
                        <p>{userInfo?.email}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"}>
                  {userInfo?.edu?.map((item, index) => {
                    return (
                      <div
                        key={index + 1}
                        className={
                          "border-inherit" + (index = 0 ? "" : "border-t-2 ")
                        }
                      >
                        <h5 className="flex items-center font-semibold">
                          <FaGraduationCap className="mr-1 text-2xl" />
                          {item?.institute}
                        </h5>
                        <p>{item?.department}</p>
                        <p>{item?.year}</p>
                      </div>
                    );
                  })}
                </div>
                <div className={openTab === 3 ? "block" : "hidden"}>
                  {userInfo?.experience?.map((item, index) => {
                    return (
                      <div key={index + 1}>
                        <h2>{item?.title}</h2>
                        <p>{item?.desc}</p>
                        <p>{item?.year}</p>
                      </div>
                    );
                  })}
                </div>
                <div className={openTab === 4 ? "block" : "hidden"}>
                  <div className="grid flex-wrap">
                    <div>
                      <h4 className="flex items-center justify-center">
                        <MdOutlineDoNotDisturb className="mr-1" />
                        অভিযোগ করুন
                      </h4>
                      <h4>রিটিংস দিন</h4>
                      <p>Tell others what you think</p>
                      <div className="grid justify-center">
                        <div
                          className="inline-block  mx-auto my-5 hover:drop-shadow-md"
                          onClick={() => setShowModal(true)}
                        >
                          <div className="flex items-center justify-center cursor-pointer">
                            <span className="mx-2">
                              <FaRegStar className="text-2xl" />
                            </span>
                            <span className="mx-2">
                              <FaRegStar className="text-2xl" />
                            </span>
                            <span className="mx-2">
                              <FaRegStar className="text-2xl" />
                            </span>
                            <span className="mx-2">
                              <FaRegStar className="text-2xl" />
                            </span>
                            <span className="mx-2">
                              <FaRegStar className="text-2xl" />
                            </span>
                          </div>
                        </div>

                        {/* Modal Start */}

                        {showModal ? (
                          <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                              <div className="relative w-auto my-6 mx-auto max-w-6xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                  {/*header*/}
                                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                      Modal Title
                                    </h3>
                                    <button
                                      className="p-1 ml-auto border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold text-green-500"
                                      onClick={() => setShowModal(false)}
                                    >
                                      <span className="text-green-500 opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        <FaArrowLeft />
                                      </span>
                                    </button>
                                  </div>
                                  {/*body*/}
                                  <div className="relative p-6 flex justify-center">
                                    {Array.from({ length: 5 }).map(
                                      (_, index) => (
                                        <span
                                          className="text-xl mx-2"
                                          key={index}
                                          onClick={() =>
                                            setCurrentRating(index + 1)
                                          }
                                        >
                                          <FaRegStar />
                                        </span>
                                      )
                                    )}
                                  </div>
                                  {/*footer*/}
                                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                      className="bg-blue-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                      type="button"
                                      onClick={() => setShowModal(false)}
                                    >
                                      Save Changes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                          </>
                        ) : null}
                        {/* Modal End */}
                      </div>
                    </div>

                    <div className="flex items-center justify-between my-4">
                      <div>
                        <h4 className="text-green-500 my-1">
                          একটি রিভিও লিখুন
                        </h4>
                        <h4 className="text-black flex items-center my-1">
                          রিটিংস এবং রিভিউস <GrCircleInformation />
                        </h4>
                      </div>
                      <div className="grid text-center">
                        <h4>{rating || 0}</h4>

                        <div className="flex flex-row text-green-500">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index}>
                              {rating > index ? (
                                <FaStar color="green" /> // Adjust color as desired
                              ) : (
                                <FaRegStar color="green" /> // Adjust color as desired
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      {userInfo?.ratings?.map((item, index) => {
                        return (
                          <div key={index + 1}>
                            <div>
                              <div>
                                <img
                                  src={item?.postedBy?.avatarImg}
                                  alt="Profile image"
                                  className="rounded-full"
                                />
                              </div>
                            </div>
                            <h2>{item?.title}</h2>
                            <p>{item?.desc}</p>
                            <p>{item?.year}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DetailsTabs(data) {
  return (
    <>
      <Tabs data={data} />
    </>
  );
}
