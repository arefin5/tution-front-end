import StarRatings from "react-star-ratings";
import Link from "next/link";
import React from "react";
import { MdVerified } from "react-icons/md";
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
    if (gender == "male") {
      profileImg = `/boy.svg`;
    } else if (gender == "female") {
      profileImg = `/girl.svg`;
    } else {
      profileImg = `/boy.svg`;
    }
  } else {
    profileImg = `${ServerRoot}/${avatarImg}`;
  }


  return (
    <div className="flex flex-col items-center xs:w-48 md:w-56 lg:w-64 relative text-rose-600 bg-white dark:bg-neutral-800 rounded-xl p-4 lg:p-8">
      <Link href={`/tutors/${id}`}>
        <a>
          <div className="w-28 md:w-32 h-28 md:h-32 mt-5 md:mt-1  bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mb-2 md:mb-4 cursor-pointer">
            <img
              src={profileImg}
              loading="lazy"
              alt="Photo by Radu Florin"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </a>
      </Link>
      <Link href={`/tutors/${id}`}>
        <a className="w-full bottom-0 left-0 right-0  break-words  cursor-pointer ">
          {verified === true ? (
            <div className="flex flex-row items-center justify-center ">
              <div className="text-rose-600 md:text-xl font-bold truncate text-center">
                {name}
              </div>
              <div className=" ml-2">
                <MdVerified className="w-5 h-5" />
              </div>
            </div>
          ) : (
            <div className="text-rose-600 flex-grow md:text-xl font-bold truncate text-center">
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
                starRatedColor="#e11d48"
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
  );
}

export default TutorCard;
