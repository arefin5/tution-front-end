import '../styles/globals.css'
import Header from '../components/page/Header'
import Footer from '../components/page/Footer'
import SideNav from '../components/page/SideNav'
import { useEffect, useState, createContext } from 'react';
import Router from "next/router";
import NProgress from "nprogress";
import Cookies from 'js-cookie'
import React from 'react';
import { io } from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.min.css';
import { DefaultSeo } from 'next-seo';
import Script from 'next/script';


const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER || '');
export const AppContext = createContext({ user: null, token: null, setUser: null, setToken: null, socket: socket, });



function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(Cookies.get('authToken'))


  useEffect(() => {
    // @ts-ignore
    const localUser = JSON.parse(localStorage.getItem('user'))
    if (user == null) {
      setUser(localUser)
      socket.emit("addUser", localUser?._id.toString());
    }
    if (token == null) {
      setToken(Cookies.get('authToken'))
    }
    return () => {
      socket.disconnect();
    }

  }, []);

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);
    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  const [mobileMenuShow, setMobileMenuShow] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    let themeDark;
    if (localStorage.getItem('theme') == 'dark') {
      themeDark = true
    } else {
      themeDark = false
    }
    setDarkMode(themeDark)
  }, []);

  const darkModeHandler = (darkModeState) => {
    setDarkMode(darkModeState)
  }
  const updateMobileMenuState = (menuState) => {
    setMobileMenuShow(menuState)
  }
  console.clear()
  return (
    // @ts-ignore
    <AppContext.Provider value={{ user, setUser, token, setToken, socket, }}>

      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6147403694159931"
        strategy="beforeInteractive"
       
      />
   
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XYGCW75NJ3"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-XYGCW75NJ3');
        `}
      </Script>


      <DefaultSeo
        title="TuitionApp - Find tutor, Learn anything"
        description="Finding tutor and tuition made easy"
        openGraph={{
          type: 'website',
          title: "TuitionApp - Find tutor, Learn anything",
          description: "Finding tutor and tuition made easy",
          site_name: 'TuitionApp',
          images: [
            {
              url: `https://tuitionappbd.com/seo.jpg`,
              width: 929,
              height: 525,
              alt: 'TuitionApp',
            },
          ],
        }}
      />
      <div className={`${darkMode ? 'dark' : ''}`}>
        <div className=' bg-neutral-100 dark:bg-neutral-900'>
          {/* <Header updateMobileMenuState={updateMobileMenuState} darkMode={darkMode} mobileMenuShow={mobileMenuShow} /> */}
          <div className='flex flex-row'>
          
            {/* <SideNav darkMode={darkMode} 
            darkModeHandler={darkModeHandler} 
            updateMobileMenuState={updateMobileMenuState} 
            mobileMenuShow={mobileMenuShow}
             /> */}
            <div className='w-full'>
            <head>
            <link href="https://fonts.cdnfonts.com/css/li-ador-noirrit?styles=87152" rel="stylesheet" 
            />

            </head>
              <Component {...pageProps} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default MyApp

