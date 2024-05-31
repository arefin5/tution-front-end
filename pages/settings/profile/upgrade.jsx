import axios from "axios";
import head from "next/head";
import { Router, useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PricingCard from "../../../components/plan/PricingCard";


function Upgrade({ userData, token, plans }) {
    const router = useRouter();
    const [userRefs, setUserRefs] = useState(0)
    useEffect(() => {
        if (!token || token == null) {
            router.push('/login')
        } else {
            if (userData) {
                setUserRefs(userData.user.refs)
            } else {
                router.push('/login')
            }
        }
        return () => {
        };

    }, []);


    const [loading, setLoading] = useState(false);
    const handleUpgrade = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/upgrade-by-refs`, {}, {
            headers: {
                token: token
            }
        }).then(res => {
            setLoading(false)
            if (res.data.status == 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.msg
                })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'OOps',
                    text: res.data.msg
                })
            }
        }).catch(res => {
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'OOps',
                text: "Something went wrong"
            })
        })

    }
    return (

        <div className=" py-6 sm:py-8 lg:py-12">
            <head>
                <title>TuitionApp - Upgrade to pro</title>
            </head>

            <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
                <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8 xl:mb-12">Our pricing plans for you</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 md:mb-8">
                    {plans.map((plan, i) => (
                        <>
                            <PricingCard key={i} plan={plan} token={token} />
                        </>
                    ))}


                </div>
            </div>
        </div>

    );
}
export async function getServerSideProps(ctx) {
    let token = parseCookies(ctx).authToken || null;
    if (token) {
        const plansRes = await fetch(`${process.env.API_URL}/plans`,)
        const plans = await plansRes.json()
        const userRes = await fetch(`${process.env.API_URL}/my-profile`, {
            headers: {
                token: token
            }
        })
        const user = await userRes.json()
        return {
            props: {
                userData: user.user ? user : null,
                token: token,
                plans: plans.plans
            },
        };
    } else {
        return {
            props: {
                userData: null,
                token: null,
                plans: []
            },
        };
    }
}
export default Upgrade;