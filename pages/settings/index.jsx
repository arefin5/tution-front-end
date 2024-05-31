import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./../_app";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import head from "next/head";
import React from "react";

function Settings({ user, token, tutorVerificationFees, mediaVerificationFees }) {
  const ApiServer = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { setToken, setUser } = useContext(AppContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!token || token == null || !user || user == null) {
      router.push("/login");
    } else {
      setUserData(user);
    }
    return () => { };
  }, [token, user]);

  //---------delet post handler
  const deleteUser = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to undo it",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${ApiServer}/user/${userData?._id}`, {
            headers: {
              token: token,
            },
          })
          .then((res) => {
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            Cookies.remove("authToken", { path: "/" });
            router.push("/login");
          })
          .then((res) => {
            Swal.fire({
              title: "Success",
              text: "Your account has been deleted",
              icon: "success",
              confirmButtonColor: "#6366f1",
              confirmButtonText: "Ok",
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Error...",
              text: error,
            });
          });
      }
    });
  };
  const copyRef = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(
      `${window.location.origin}/login?ref=${userData?._id}`
    );
    Swal.fire({
      title: "Link copied",
      text: "Referral link has been copied",
    });
  };
  // console.clear();

  return (
    <>
      {
        (token && user) &&
        <div className="flex flex-row ">
          <head>
            <title>TuitionApp - Settings</title>
          </head>
          <div className="w-full h-full">
            <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
              <div className="max-w-screen-2xl px-4 mb-8 md:px-8 mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-neutral-800 rounded-lg gap-4 p-4 md:p-8 shadow-lg">
                  <div>
                    <h2 className="text-rose-600 text-xl md:text-2xl text-center md:text-left font-bold">
                      Create Post
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200">
                      Create post and ask for a tutor
                    </p>
                  </div>
                  <Link passHref href="/posts/new">
                    <a className="inline-block bg-rose-600 hover:bg-rose-600 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                      Go
                    </a>
                  </Link>
                </div>
              </div>
              <div className="max-w-screen-2xl px-4 mb-8 md:px-8 mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-neutral-800 rounded-lg gap-4 p-4 md:p-8 shadow-lg">
                  <div>
                    <h2 className="text-rose-600 text-xl md:text-2xl text-center md:text-left font-bold">
                      Edit Profile
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200">
                      Edit your profile information
                    </p>
                  </div>
                  <Link passHref href="/settings/profile/edit">
                    <a className="inline-block bg-rose-600 hover:bg-rose-600 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                      Go
                    </a>
                  </Link>
                </div>
              </div>
              <div className="max-w-screen-2xl px-4 mb-8 md:px-8 mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-neutral-800 rounded-lg gap-4 p-4 md:p-8 shadow-lg">
                  <div>
                    <h2 className="text-rose-600 text-xl md:text-2xl font-bold">
                      Upgrade Account
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200">
                      Become a tutor or upgrade subscription
                    </p>
                  </div>
                  <Link
                    passHref
                    href={"/settings/profile/upgrade"}
                  >
                    <a className="inline-block bg-rose-600 hover:bg-rose-600 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                      Go
                    </a>
                  </Link>
                </div>
              </div>
              <div className="max-w-screen-2xl px-4 mb-8 md:px-8 mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-neutral-800 rounded-lg gap-4 p-4 md:p-8 shadow-lg">
                  <div>
                    <h2 className="text-rose-600 text-xl md:text-2xl font-bold">
                      Notifications
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200">
                      Check out all the notifications
                    </p>
                  </div>
                  <Link passHref href="/notifications">
                    <a className="inline-block bg-rose-600 hover:bg-rose-600 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                      Go
                    </a>
                  </Link>
                </div>
              </div>
              <div className="flex basis-1 md:basis-2">
                <div className="w-full px-4 mb-8 md:px-8 mx-auto">
                  <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-neutral-800 rounded-lg gap-4 p-4 md:p-8 shadow-lg">
                    <div>
                      <h2 className="text-rose-600 text-xl md:text-2xl font-bold">
                        Delete Account
                      </h2>
                      <p className="text-gray-600 dark:text-gray-200">
                        All of your details and subscriptions will be deleted. You
                        would not get any refund
                      </p>
                    </div>
                    <button onClick={(event) => deleteUser(event)}>
                      <p className="inline-block bg-red-500 hover:bg-red-600 active:bg-red-700 focus-visible:ring ring-red-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                        Delete
                      </p>
                    </button>
                  </div>
                </div>
                {
                  (user?.role == 'tutor' || user?.role == 'media') &&
                  <div className="w-full px-4 mb-8 md:px-8 mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-neutral-800 rounded-lg gap-4 p-4 md:p-8 shadow-lg">
                      <div>
                        <h2 className="text-rose-600 text-xl md:text-2xl font-bold">
                          Verify account
                        </h2>
                        <p className="text-gray-600 dark:text-gray-200">
                          Verification process will charge {user?.role == 'tutor' ? tutorVerificationFees : user?.role == 'media' ? mediaVerificationFees : verificationFees} /- bdt
                        </p>
                      </div>
                      <Link href="/settings/profile/verify" passHref>
                        <a className="inline-block bg-rose-600 hover:bg-rose-600 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                        >
                          Go
                        </a>
                      </Link>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export async function getServerSideProps(ctx) {

  const token = (await parseCookies(ctx).authToken) || null;
  if (token) {
    const res = await fetch(`${process.env.API_URL}/my-profile`, {
      headers: {
        token: token,
      },
    });
    const data = await res.json();

    return {
      props: {
        user: data.user ? data.user : null,
        verificationFees: data.verificationFees ? data.verificationFees : null,
        tutorVerificationFees: data.tutorVerificationFees ? data.tutorVerificationFees : null,
        mediaVerificationFees: data.mediaVerificationFees ? data.mediaVerificationFees : null,
        token: token,
      },
    };
  } else {
    return {
      props: {
        user: null,
        token: null,
      },
    };
  }
}
export default Settings;
