import Head from 'next/head'
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import UserChatCard from "../../components/chat/UserChatCard";
import React from 'react';
import { AppContext } from '../_app';
function Inbox({ chats, current, token }) {
    const { socket } = useContext(AppContext);
    const [arrivalMessage, setArrivalMessage] = useState({});
    const [newMessage, setNewMessage] = useState({});
    const router = useRouter();
    const [chatsArray, setChatsArray] = useState([]);
    const [currentUserId, setCurrentUserId] = useState();
    const [dummy, setDummy] = useState(true);

    useEffect(() => {
        if (!token || token == null) {
            router.push('/login')
        } else {
            if (current && chats) {
                setChatsArray(chats)
                setCurrentUserId(current)
            } else {
                router.push('/login')
            }
        }
        return () => {
        };

    }, []);
    useEffect(() => {
        socket.on("getMessage", (data) => {
            if (router.pathname == '/inbox') {
                setArrivalMessage({
                    sender: data.sender,
                    text: data.text,
                    chatId: data.chatId,
                    image: data.image,
                    seen: false,
                    createdAt: Date.now(),
                    _id: data._id,
                });
                setNewMessage({
                    sender: data.sender,
                    text: data.text,
                    chatId: data.chatId,
                    image: data.image,
                    seen: false,
                    createdAt: Date.now(),
                    _id: data._id,
                });

                setDummy(!dummy)
            }
        });
        socket.on("connect_error", (data) => {
            socket.disconnect();
            socket.emit("addUser", current.toString());
        });
        return () => {
        }
    }, []);
    useEffect(() => {
        let array = chatsArray;
        for (let i = 0; i < array.length; i++) {
            if (array[i]._id == arrivalMessage?.chatId) {
                array[i].lastMessage = arrivalMessage;
                array[i].updatedAt = Date.now();
            }
        }

        if (arrivalMessage?.chatId) {
            setChatsArray(array?.sort((a, b) => { return (new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime()) ? -1 : 1 }))
        }

    }, [dummy, arrivalMessage, newMessage]);
    return (
        <div className='flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col '>
            <Head>
                <title>TuitionApp - Inbox</title>
            </Head>
            <div className="basis-full min-h-screen h-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
                <div className="max-w-screen-xl px-4  md:px-8 mx-auto">
                    <div className="flex justify-between items-center gap-4 mb-6">
                        <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold">Inbox</h2>
                    </div>
                    {dummy ? "" : ""}
                    <div className="flex flex-col gap-5">
                        {chatsArray?.map((item) => (
                            <UserChatCard key={item?.updatedAt} chat={item} currentUser={currentUserId} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export async function getServerSideProps(ctx) {
    let token = parseCookies(ctx).authToken || null;
    if (token) {
        const res = await fetch(`${process.env.API_URL}/chats/`, {
            headers: {
                token: token
            }
        })
        const data = await res.json()
        return {
            props: {
                chats: data.chats,
                current: data.currentUser,
                token: token
            },
        };
    } else {
        return {
            props: {
                chats: null,
                current: null,
                token: null
            },
        };
    }
}

export default Inbox;