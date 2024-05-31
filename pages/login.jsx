import { useState, useContext, useEffect } from "react";
import LoginComp from "../components/login/Login";
import Checking from "../components/login/Checking";
import Verify from "../components/login/Verify";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { setCookie } from "nookies";

import { AppContext } from "./_app";
import Head from "next/head";
import Cookies from "js-cookie";
import React from "react";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../lib/firebase";

function Login() {
  const setUpRecaptha = (number) => {
    const captchaVerifier = new RecaptchaVerifier(
      "captcha-container",
      {
        size:'invisible'
      },
      auth
    );
    captchaVerifier.render();
    return signInWithPhoneNumber(auth, number, captchaVerifier);
  };
  // @ts-ignore
  const { user, setUser, setToken } = useContext(AppContext);
  const ApiServer = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [phone, setPhone] = useState("88");
  const [OTP, setOTP] = useState("");
  const [tab, setTab] = useState("phone");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (phone.split(" ").join().length !== 13)
      return alert("Please enter a valid phone number!");
    const number = "+" + phone.split(" ").join();
    try {
      const response = await setUpRecaptha(number);
      // @ts-ignore
      setResult(response);
      setTab("verify");
      setLoading(false)
    } catch (err) {
      setLoading(false)
      Swal.fire({
        icon: "error",
        title: "Oops... ",
        text: 'Something went wrong...',
      })
    }
  };
  function redirect(response) {
    if (response.data.authType == "registration") {
      Swal.fire({
        icon: "question",
        title: "You need to edit your details",
        text: response.data.msg,
      }).then((res) => {
        if (res.isConfirmed) {
          router.push("/settings/profile/edit");
        } else {
          router.push("/settings/profile/edit");
        }
      });
    } else if (response.data.authType == "login") {
      router.push("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: response.data.msg,
      });
    }
  }
  const handleVerify = async (e) => {
    e.preventDefault();
    setTab("checking");
    if (OTP === "" || OTP === null) return;
    try {
      // @ts-ignore
      await result
        .confirm(OTP)
        .then(async (res) => {
          await axios
            .post(`${ApiServer}/login`, {
              idToken: res.user.accessToken,
            })
            .then(function (response) {
              // @ts-ignore
              setUser(response.data.user);
              // @ts-ignore
              setToken(response.data.token);
              localStorage.setItem("user", JSON.stringify(response.data.user));
              setCookie(null, "authToken", response.data.token, {
                maxAge: 30 * 24 * 60 * 60 * 6,
                path: "/",
              });
              redirect(response);
            })
            .catch(function (error) {
              Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Something went wrong",
              });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };

  useEffect(() => {
    // @ts-ignore
    setUser(null);
    // @ts-ignore
    setToken(null);
    return () => {};
  }, []);

  const back = () => {
    setTab("phone");
  };

  const stepPage = () => {
    if (tab == "phone") {
      return (
        <LoginComp
          phone={phone}
          setPhone={setPhone}
          handleSendOTP={handleSendOTP}
          loading={loading}
        />
      );
    } else if (tab == "verify") {
      return (
        <Verify
          OTP={OTP}
          setOTP={setOTP}
          back={back}
          handleVerify={handleVerify}
        />
      );
    } else if (tab == "checking") {
      return <Checking />;
    }
  };

  return (
    <div className="">
      <Head>
        <title>TuitionApp - Login</title>
      </Head>
      <div className="flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col ">
        <div className=" basis-full h-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
          <div className="h-[85vh] w-full flex justify-center items-center px-4  md:px-8 mx-auto">
            {stepPage()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
