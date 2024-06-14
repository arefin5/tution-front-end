// import StarRatings from "react-star-ratings";
// import Link from "next/link";
// import React from "react";
// import { MdVerified } from "react-icons/md";

// function TutorCard({
//   avatarImg,
//   name,
//   institute,
//   department,
//   id,
//   gender,
//   starsCount,
//   ratingsCount,
//   verified,
// }) {
//   const ServerRoot = process.env.NEXT_PUBLIC_BACKEND_URL;
//   let profileImg;
//   if (!avatarImg || avatarImg === "") {
//     profileImg = gender === "female" ? `/girl.svg` : `/boy.svg`;
//   } else {
//     profileImg = `${ServerRoot}/${avatarImg}`;
//   }

//   return (
//     <div className="flex flex-col items-center w-4/5 relative text-rose-600 bg-white dark:bg-neutral-800 rounded-xl p-4 lg:p-8 mx-auto border hover:border-green-500 transition duration-300">
//       <Link href={`/tutors/${id}`}>
//         <a>
//           <div className="w-28 md:w-32 h-28 md:h-32 mt-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mb-2 md:mb-4 cursor-pointer">
//             <img
//               src={profileImg}
//               loading="lazy"
//               alt="Profile"
//               className="w-full h-full object-cover object-center"
//             />
//           </div>
//         </a>
//       </Link>
//       <Link href={`/tutors/${id}`}>
//         <a className="w-full bottom-0 left-0 right-0 break-words cursor-pointer">
//           {verified && (
//             <div className="flex flex-row items-center justify-center">
//               <div className="md:text-xl font-bold truncate text-center text-gray-800">
//                 {name}
//               </div>
//               <div className="ml-2">
//                 <MdVerified className="w-5 h-5" />
//               </div>
//             </div>
//           )}
//           {!verified && (
//             <div className="flex-grow md:text-xl font-bold truncate text-center text-gray-800">
//               {name}
//             </div>
//           )}
//           <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base text-center truncate">
//             {department || "..."}
//           </p>
//           <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base text-center truncate">
//             {institute || "..."}
//           </p>
//           <div className="flex justify-center">
//             <div className="flex gap-4">
//               <StarRatings
//                 rating={Number(starsCount) / Number(ratingsCount) || 0}
//                 starRatedColor="#86efac"
//                 starDimension="18px"
//                 starSpacing="1px"
//                 numberOfStars={5}
//                 name="rating"
//               />
//             </div>
//           </div>
//         </a>
//       </Link>
//     </div>
//   );
// }

// export default TutorCard;
import StarRatings from "react-star-ratings";
import Link from "next/link";
import React from "react";
import { MdVerified } from "react-icons/md";
import { Squircle } from "corner-smoothing";
function TutorCard({
  avatarImg,
  name,
  institute,
  department,
  id,
  gender,
  starsCount,
  ratingsCount,
  verified,
}) {
  const ServerRoot = process.env.NEXT_PUBLIC_BACKEND_URL;
  let profileImg;
  if (!avatarImg || avatarImg === "") {
    profileImg = gender === "female" ? `/girl.svg` : `/boy.svg`;
  } else {
    profileImg = `${ServerRoot}/${avatarImg}`;
  }
  console.log(verified)

  return (
    <Squircle>

    
    <div className="flex flex-col 
    items-center relative text-rose-600
     bg-white 
     dark:bg-neutral-800 rounded-xl
     tutor-cards
      p-4 lg:p-8 border hover:border-green-500 transition duration-300">
      <Link href={`/tutors/${id}`}>
        <a>
          <div className="w-28 md:w-32 h-28 md:h-32 mt-1 bg-neutral-200 dark:bg-neutral-800 
          rounded-full overflow-hidden mb-2 md:mb-4 cursor-pointer">
            <img
              src={profileImg}
              loading="lazy"
              alt="Profile"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </a>
      </Link>
      <Link href={`/tutors/${id}`}>
        <a className="w-full bottom-0 left-0 right-0 break-words cursor-pointer">
          {verified && (
            <div className="flex flex-row items-center justify-center">
              <div className="md:text-xl font-bold truncate text-center text-gray-800">
                {name}
              </div>
              <div className="ml-2">
                <MdVerified className="w-5 h-5" />
              </div>
            </div>
          )}
          {!verified && (
            <div className="flex-grow md:text-xl font-bold truncate text-center text-gray-800">
              {name}
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base text-center truncate">
            {department || "..."}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base text-center truncate">
            {institute || "..."}
          </p>
          <div className="flex justify-center">
            <div className="flex gap-4">
              <StarRatings
                rating={Number(starsCount) / Number(ratingsCount) || 0}
                starRatedColor="#86efac"
                starDimension="18px"
                starSpacing="1px"
                numberOfStars={5}
                name="rating"
              />
            </div>
          </div>
        </a>
      </Link>
    </div>
    </Squircle>
  );
}

export default TutorCard;
