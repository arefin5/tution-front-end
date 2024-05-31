import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

function PricingCard({ plan, token }) {
  const [loading, setLoading] = useState(false);
  const handleUpgrade = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .request({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/pay`,
        data: { planId: plan._id },
        headers: {
          token: token,
        },
        timeout: 200000, // Set the timeout option here
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.status == "failed") {
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: res.data.msg,
          });
          setLoading(false);
          if (res.data.type == "details") {
            Router.push("/settings/profile/edit");
          }
        } else {
          setLoading(false);
          if (res.data.url) {
            Router.push(res.data.url);
          }
        }
      })
      .catch((res) => {
        console.log(res)
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Something went wrong",
        });
      });
  };
  return (
    <div className="flex flex-col border-2 border-rose-600 bg-white dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-neutral-900 rounded-lg relative p-4 pt-6">
      <div className="my-10">
        <div className="flex justify-center absolute -top-3 inset-x-0">
          <span className="h-6 flex justify-center items-center bg-rose-600 text-white text-xs font-semibold tracking-widest uppercase rounded-full px-3 py-1">
            {plan.title}
          </span>
        </div>
        <div className="text-gray-800 dark:text-gray-200 text-2xl font-bold text-center mb-2">
          {plan?.days >= 2000 ? 'Lifetime' : `${plan?.days} ${typeof plan.days == "number" ? " days" : ""}`}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-center mx-auto px-8 mb-8">
          {plan.desc}
        </p>
      </div>

      <div className="flex flex-col gap-8 mt-auto">
        <div className="flex justify-center items-end gap-1">
          {Number(plan.amount) == 0 ? <></> :
            <span className="self-start text-gray-700 dark:text-gray-200">৳</span>}
          <span className={`text-4xl ${Number(plan.amount) == 0 ? 'text-green-500' : 'text-rose-600'}  font-bold`}>
            {Number(plan.amount) == 0 ? "Free" : plan.amount}
          </span>
        </div>
        <button
          onClick={(e) => handleUpgrade(e)}
          className="block bg-rose-600 hover:bg-rose-700 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
        >
          {loading ? "Please Wait" : `Upgrade to ${plan.type}`}
        </button>
      </div>
    </div>
  );
}

export default PricingCard;
