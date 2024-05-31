import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiSend } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import Alert from "sweetalert2";
import MessageComp from "../../../components/chat/MessageComp";
import Resizer from "react-image-file-resizer";

import Head from "next/head";
import Link from "next/link";
import React from "react";
import { MdVerified } from "react-icons/md";
import { AppContext } from "../../_app";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";

function ChatInbox({ messagesRes, currentUser, token, friendData, chatRes }) {
  const { socket } = useContext(AppContext);
  const router = useRouter();
  const { chatId } = router.query;
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const imageRef = useRef(null);
  const sendRef = useRef(null);
  const scrollRef = useRef(null);
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [newMessage, setNewMessage] = useState({});
  const [messages, setMessages] = useState([]);
  const [current, setCurrent] = useState([]);
  const [newSeenMessage, setNewSeenMessage] = useState({});
  const [dummy, setDummy] = useState(true);
  const [friend, setFriend] = useState({
    avatarImg: '',
    status: false,
    verified: false,
    name: '',
    _id: '',
    lastActive: ''
  });


  useEffect(() => {

    socket.on("getMessage", (data) => {
      if (data.chatId == router.query.chatId) {
        setNewMessage({
          sender: data.sender,
          text: data.text,
          chatId: data.chatId,
          image: data.image,
          seen: true,
          createdAt: Date.now(),
          _id: data._id,
        })
        setArrivalMessage({
          sender: data.sender,
          text: data.text,
          chatId: data.chatId,
          image: data.image,
          seen: true,
          createdAt: Date.now(),
          _id: data._id,
        });
      }
    });
    socket.on("seen", (data) => {
      console.clear()
      if (data.chatId == chatId) {
        setNewSeenMessage(data)
      }
    });

    socket.on("connect_error", (data) => {
      socket.disconnect();
      socket.emit("addUser", currentUser.toString());
    });

    return () => {

    }
  }, []);
  useEffect(() => {
    if (arrivalMessage._id) {
      socket.emit("seen", {
        senderId: arrivalMessage?.sender,
        messageId: arrivalMessage?._id,
        chatId: arrivalMessage?.chatId
      });
    }
    setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage]);



  useEffect(() => {
    let array = messages;
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id == newSeenMessage?.messageId) {
        array[i].seen = true;
      }
    }
    setMessages(array)
    setDummy(!dummy)
  }, [newSeenMessage]);

  useEffect(() => {
    const array = messages
    if (router.pathname == '/inbox/chat/[chatId]') {
      const unseenArray = array.filter(item => item.sender !== current && item.seen == false)
      unseenArray.map(item => {
        if (item._id) {
          socket.emit("seen", {
            senderId: item.sender,
            messageId: item._id,
            chatId: item.chatId
          });
        }
      })
    }

  }, [messages, router]);
  useEffect(() => {
    socket.on("active", (data) => {
      if (data.userId == friend._id) {
        setFriend({ ...friend, status: true, lastActive: Date.now() })
      }
    });
    socket.on("deActive", (data) => {
      if (data.userId == friend._id) {
        setFriend({ ...friend, status: false, lastActive: Date.now() })
      }
    });
  }, [friend]);

  useEffect(() => {
    if (friendData == null) {
      router.push("/404");
    } else {
      if (!token || token == null) {
        router.push("/login");
      } else {
        if (messagesRes && currentUser && friendData) {
          setCurrent(currentUser);
          setFriend(friendData);
          setMessages(messagesRes);
        } else {
          router.push("/login");
        }
      }
    }

  }, []);
  useEffect(() => {
    scrollToBottom();
    return () => {


    }
  });

  function scrollToBottom() {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
  const handleSend = async (e) => {
    e.preventDefault();
    setText("");
    setImage(null);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/message/`,
        {
          chatId: router.query.chatId,
          text: text,
          image: image,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        socket.emit("sendMessage", {
          sender: current.toString(),
          receiverId: friend?._id.toString(),
          chatId: router.query.chatId,
          text: text,
          image: image,
          _id: res.data.id,
        });
        setNewMessage({
          sender: current,
          chatId: router.query.chatId,
          text: text,
          image: image,
          _id: res.data.id,
        })
        setMessages([
          ...messages,
          {
            sender: current,
            chatId: router.query.chatId,
            text: text,
            image: image,
            _id: res.data.id,
          },
        ]);
      })
      .catch(() => {
        Alert.fire({
          icon: "error",
          title: "Oops",
          text: "This conversation was deleted by the opponent ",
          confirmButtonColor: "#6366f1",
          confirmButtonText: "Ok",
        })
        router.push('/inbox')
      });
  };
  const resizeAvatar = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        "jpeg",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  const upload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        await resizeAvatar(file).then((data) => {
          let fileReader = new FileReader();
          fileReader.readAsDataURL(data);
          fileReader.onload = (event) => {
            setImage(event.target.result);
          };
        });
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
  const deleteConversation = (e) => {
    e.preventDefault();
    Alert.fire({
      title: "Warning",
      text: "Do you really want to delete?",
      icon: "warning",
      confirmButtonColor: "#6366f1",
      confirmButtonText: "Ok",
      timer: 1500,
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios
          .delete(
            `${process.env.NEXT_PUBLIC_API_URL}/chat/${chatId}`,
            {
              headers: {
                token: token,
              },
            }
          ).then((res) => {
            if (res.data.msg == 'success') {
              router.push('/inbox')
            }
          })
      }
    });
  }
  console.log(friend)
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
  const lastActive = moment(friend?.lastActive)
  console.log(lastActive.isValid())
  let profileImg;
  if (!friendData?.avatarImg || friendData?.avatarImg === "") {
    profileImg = `/boy.svg`;
  } else {
    profileImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${friendData?.avatarImg}`;
  }
  console.log(Number(friend?.lastActive))
  return (
    <div className="flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col ">
      <Head>
        <title>TuitionApp - Inbox</title>
      </Head>
      <div className=" basis-full h-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
        <div className="max-w-screen-xl px-4  md:px-8 mx-auto">
          <div className="flex flex-col items-center rounded-lg justify-center min-h-[85vh] bg-white dark:bg-neutral-800 text-gray-800 bg:text-gray-200">
            <div className="h-16  w-full bg-gray-200 flex items-center justify-start dark:bg-neutral-700 shadow-xl rounded-lg">
              <Link passHref href="/inbox">
                <a
                  className={`text-gray-700 justify-center items-center flex w-16 transition-colors duration-200 transform rounded-md dark:text-gray-400  dark:hover:text-gray-100 hover:text-gray-500`}
                >
                  <BiChevronLeft className={`w-10 h-10`} />
                </a>
              </Link>
              <div className="flex flex-grow flex-row h-16 items-center">
                <div
                  className={`w-10 relative ${friend?.status ? " ring-2 ring-green-500" : ""
                    } bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mr-4`}
                >
                  <img
                    src={profileImg}
                    loading="lazy"
                    alt=""
                    className={`w-full h-full object-cover object-center rounded-full ${friend?.status ? " border-2 border-white dark:border-neutral-800" : ""}`}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-gray-700 flex flex-row items-center dark:text-gray-300 md:text-xl font-bold text-left">
                    {(friend?.name).split(' ')[0]}
                    {
                      friend?.verified &&
                      <div className=" w-5 h-5 ml-2">
                        <MdVerified className="w-full h-full text-rose-600" />
                      </div>
                    }
                  </div>
                  <div className="text-gray-700 flex flex-row dark:text-gray-300 text-xs text-left">
                    {friend.status ? 'Active' : (moment(Number(friend?.lastActive)).isValid() ? moment(Number(friend?.lastActive)).fromNow() : 'Inactive')}
                  </div>
                  {dummy ? '' : ''}
                </div>
              </div>
              <button
                onClick={(e) => deleteConversation(e)}
                className='mx-4 justify-self-end h-10 aspect-square flex items-center justify-center rounded-full text-white bg-rose-600/50'>
                <AiOutlineDelete className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col flex-grow w-full bg-white dark:bg-neutral-800 shadow-xl rounded-b-lg overflow-hidden">
              <div
                ref={scrollRef}
                className={`${JSON.stringify(newMessage).length > 5 ? 'scroll-smooth' : ''} flex flex-col flex-grow h-0 p-4 overflow-y-scroll
                scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-rose-600 dark:scrollbar-track-neutral-700
                `}
              >
                {messages.map((item, i) => (
                  <MessageComp
                    key={i}
                    own={item.sender == current}
                    img={item.image}
                    text={item.text}
                    time={item.createdAt}
                    data={item}
                  />
                ))}
              </div>
              <div className="bg-gray-200 flex flex-col rounded-t-lg dark:bg-neutral-700 p-4">
                {image ? (
                  <img
                    src={image}
                    className="m-1 rounded mb-4 h-16 w-16 object-cover"
                    alt="image"
                  />
                ) : (
                  ""
                )}
                <div className="flex w-full">
                  <input
                    ref={imageRef}
                    onChange={(event) => upload(event)}
                    type="file"
                    hidden
                  />
                  <button
                    onClick={() => {
                      // @ts-ignore
                      imageRef.current.click();
                    }}
                    className="w-10 ml-1 focus:border-0 md:w-12 h-10 flex justify-center items-center shrink-0 bg-rose-600 hover:bg-rose-700 active:bg-rose-700 text-white rounded-l-lg shadow-lg transition duration-100"
                  >
                    <BsImage className="w-6 h-6" />
                  </button>
                  <input
                    value={text}
                    autoFocus

                    onChange={(e) => setText(e.target.value)}
                    className=" focus:outline-none bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-200 items-center h-10 w-full px-3 text-sm"
                    type="text"
                    placeholder="Type your message…"
                  />
                  <button
                    ref={sendRef}
                    // disabled={text.split(' ').join('').length == 0}
                    onClick={(event) => {

                      handleSend(event);

                    }}
                    className="w-10 mr-1 focus:border-0 md:w-12 h-10 flex justify-center items-center shrink-0 bg-rose-600 hover:bg-rose-700 active:bg-rose-700 text-white rounded-r-lg shadow-lg transition duration-100"
                  >
                    <BiSend className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const token = parseCookies(ctx).authToken || null;

  if (token) {
    const res = await fetch(
      `${process.env.API_URL}/messages/${ctx.query.chatId}`,
      {
        headers: {
          token: token,
        },
      }
    );
    const data = await res.json();
    return {
      props: {
        messagesRes: data.messages,
        chatRes: data.chat,
        currentUser: data.currentUser,
        friendData: data.friend,
        token: token,
      },
    };
  } else {
    return {
      props: {
        messagesRes: null,
        currentUser: null,
        chatRes: null,
        friendData: null,
        token: null,
      },
    };
  }
}
export default ChatInbox;
