
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from "react";
import HomeHero from '../components/page/HomeHero';
import HomeSlider from '../components/page/HomeSlider';
import HomeStatus from '../components/page/HomeStatus';
import Sidebar from '../components/page/Sidebar';
import HomePostSection from '../components/post/HomePostSection';
import HomeTutorSection from '../components/user/HomeTutorSection';
import HomeTop from "../components/HomeTop"
import Navbar from "../components/Navbar"
import HomeButom from '../components/HomeButom';


export default function Home({ token, posts, tutors, slides, media, stats }) {
  const [start, setStart] = useState(true)

  useEffect(() => {
    setStart(!start)
    return () => {
    };
  }, []);
  return (
    <>

    
      <div className='flex  flex-col lg:flex-row '>
        <div className="w-full">
          <div className="">
          <Navbar />
          <HomeTop />
          </div>
          {
            tutors?.data.length >= 4 &&
            <div className="max-w-screen-xl mt-12 px-4 md:px-8 mx-auto home-c">
              <HomeTutorSection tutors={tutors} token={token} />
            </div>
          }
         
          <div className="max-w-screen-xl mt-12 px-4 md:px-8 mx-auto home-c">
            <HomePostSection posts={posts} token={token} />
          </div>
        </div>
       
      </div>
      <div className="w-full my-8 px-4 md:px-8 mx-auto  lg:mb-8 md:mb-6 sm:mb-4 mb-2">
        < HomeHero />
      </div>
      <div className="w-full home-status-h">
        <div className="home-c">
        < HomeStatus data={stats} />
        </div>
      </div>
      <div className="download-app">
      <div className='w-full  mx-auto overview-m'>
<HomeButom />
</div>
      </div>

    </>
  )
}
export async function getServerSideProps(ctx) {
  let token = parseCookies(ctx).authToken || null;
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/?page&div&dis&upo&gender&search`)
  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/?page&div&dis&upo&gender&search`)
  const res3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slides`)
  const res4 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`)
  const res5 = await fetch(
    `${process.env.API_URL}/medias/?page=${ctx.query.page || 1}&div=${ctx.query.div || ""
    }&dis=${ctx.query.dis || ""}&upo=${ctx.query.upo || ""}&search=${ctx.query.search || ""}`
  );
  const tutors = await res1.json()
  const posts = await res2.json()
  const slides = await res3.json()
  const stats = await res4.json()
  const media = await res5.json();



  return {
    props: {
      token: token,
      tutors: tutors,
      posts: posts,
      slides: slides,
      stats: stats,
      media: media,
    },
  };
}
