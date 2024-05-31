import Header from './Header'
import Footer from './Footer'
import SideNav from './SideNav'
import { useEffect, useState } from 'react';
import React from 'react';


function Layout({ children }) {
    const [mobileMenuShow, setMobileMenuShow] = useState(false);
    const [darkmode, setDarkmode] = useState(false);
    useEffect(() => {
        let themeDark;
        if (localStorage.getItem('theme') == 'dark') {
            themeDark = true
        } else {
            themeDark = false
        }
        setDarkmode(themeDark)
    }, []);

    const darkModeHandler = (darkModeState) => {
        setDarkmode(darkModeState)
    }
    const updateMobileMenuState = (menuState) => {
        setMobileMenuShow(menuState)
    }
    return (
        <div className={`${darkmode ? 'dark' : ''}`}>
            <div className=' bg-neutral-200 dark:bg-neutral-900'>
                <Header updateMobileMenuState={updateMobileMenuState} darkMode={darkmode} mobileMenuShow={mobileMenuShow} />
                <div className='flex flex-row pt-5'>

                    <SideNav darkMode={darkmode} darkModeHandler={darkModeHandler} updateMobileMenuState={updateMobileMenuState} mobileMenuShow={mobileMenuShow}/>

                    <div className='container'>
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}



export default Layout;