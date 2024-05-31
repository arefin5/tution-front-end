import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { AppContext } from "../../pages/_app";
import moment from "moment/moment";


function UserChatCard({ chat, currentUser }) {
  const { socket } = useContext(AppContext);


  const [friendData, setFriendData] = useState({
    avatarImg: '',
    status: false,
    verified: false,
    name: '',
    _id: ''
  })
  const [chatData, setChatData] = useState({
    _id: '',
    lastMessage: {},
    members: [
      {
        _id: ''
      }
    ],
  })


  useEffect(() => {
    setFriendData(chatData?.members.find((m) => m._id !== currentUser))
  }, [chatData, currentUser]);
  useEffect(() => {
    setChatData(chat)
  }, [chat]);
console.log(chatData?.lastMessage?.createdAt)

  useEffect(() => {
    socket.on("active", (data) => {
      if (data?.userId == friendData?._id) {
        setFriendData({ ...friendData, status: true })
      }
    });
    socket.on("deActive", (data) => {
      if (data.userId == friendData._id) {
        setFriendData({ ...friendData, status: false })
      }
    });

  }, [friendData, currentUser]);

  let profileImg;
  if (!friendData?.avatarImg || friendData?.avatarImg === "") {
    profileImg = `/boy.svg`;
  } else {
    profileImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${friendData?.avatarImg}`;
  }
  return (
    <Link href={`/inbox/chat/${chat?._id}`}>
      <a className="flex flex-row h-24 items-center bg-white dark:bg-neutral-800 rounded-lg p-4 cursor-pointer">
        <div
          className={`w-16 relative ${friendData?.status ? " ring-4 ring-green-500" : ""
            } bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mr-4`}
        >
          <img
            src={profileImg}
            loading="lazy"
            alt=""
            className={`w-full h-full object-cover rounded-full ${friendData?.status ? " border-4 border-white dark:border-neutral-800" : ""} object-center`}
          />
        </div>
        <div className="flex flex-col h-full items-start  overflow-hidden truncate w-[90%]">
          <div className="text-gray-800 flex flex-row items-center dark:text-gray-300 md:text-lg font-bold text-center">
            {friendData?.name}
            {
              friendData?.verified &&
              <div className=" w-5 h-5 ml-2">
                <MdVerified className="w-full h-full text-rose-600" />
              </div>
            }
          </div>
          <div className={`${(chatData?.lastMessage?.seen || chatData?.lastMessage?.sender == currentUser) ? 'text-gray-700 dark:text-gray-400 ' : 'text-gray-900 font-bold dark:text-gray-100'} break-words  md:text-sm text-center`}>
            {chatData?.lastMessage?.sender == currentUser ? 'You: ' : ''}{chatData?.lastMessage?.image ? "Sent a photo" : chatData?.lastMessage?.text?.length > 0 ? chatData?.lastMessage?.text : 'Sent an empty message'}
          </div>
          <div className={`${(chatData?.lastMessage?.seen || chatData?.lastMessage?.sender == currentUser) ? 'text-gray-700 dark:text-gray-400 ' : 'text-gray-900 font-bold dark:text-gray-100'} text-xs text-center`}>
            {moment(chatData?.lastMessage?.createdAt).fromNow()}
          </div>
        </div>
      </a>
    </Link>
  );
}

export default UserChatCard;
