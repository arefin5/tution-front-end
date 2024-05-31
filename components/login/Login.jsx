import React, { useEffect, useRef } from "react";


function LoginComp({ handleSendOTP, setPhone, phone, loading }) {
  const sendRef = useRef();
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        // @ts-ignore
        sendRef.current.click();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
  return (
    <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md dark:bg-neutral-800">
      <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
        Login
      </h1>
      <form className="mt-6">
        <div>
          <label className="block text-sm text-gray-800 dark:text-gray-200">
            Your Phone Number
          </label>
          <input
            type="text"
            value={phone}
            autoFocus
            onChange={(event) => setPhone(event.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-neutral-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div id="captcha-container" className="my-6"></div>
        <div className="">
          <button
            // @ts-ignore
            ref={sendRef}
            onClick={(e) => handleSendOTP(e)}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-neutral-700 rounded-md hover:bg-neutral-600 focus:outline-none focus:bg-neutral-600"
          >
            {
              loading ? 'Wait...' : 'Login'
            }
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginComp;
