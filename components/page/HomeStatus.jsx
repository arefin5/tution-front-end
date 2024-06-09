// // // // import React from "react";
// // // // import { useEffect, useState } from "react";

// // // // function HomeStatus({ data }) {
// // // //   const ApiServer = process.env.NEXT_PUBLIC_API_URL;
// // // //   const [books, setBooks] = useState();
// // // //   const [tutors, setTutors] = useState();
// // // //   const [students, setStudents] = useState();
// // // //   const [posts, setPosts] = useState();
// // // //   useEffect(() => {
// // // //     setBooks(data.books);
// // // //     setTutors(data.tutors);
// // // //     setStudents(data.students);
// // // //     setPosts(data.posts);
// // // //     return () => {};
// // // //   }, []);

// // // //   return (
// // // //     <div className="bg-white dark:bg-neutral-800 rounded-lg  py-6 sm:py-8 lg:py-12">
// // // //       <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
// // // //         <div className="mb-8 md:mb-12">
// // // //           <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
// // // //             Overview
// // // //           </h2>
// // // //           <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
// // // //             Get a short idea about us.
// // // //           </p>
// // // //         </div>
// // // //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
// // // //           <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
// // // //             <div className="text-rose-600 text-xl sm:text-2xl md:text-3xl font-bold">
// // // //               {students}
// // // //             </div>
// // // //             <div className="text-sm text-gray-800 dark:text-gray-200 dark sm:text-base font-semibold">
// // // //               Users
// // // //             </div>
// // // //           </div>
// // // //           <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 md:p-8">
// // // //             <div className="text-rose-600 text-xl sm:text-2xl md:text-3xl font-bold">
// // // //               {tutors}
// // // //             </div>
// // // //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// // // //               Tutors
// // // //             </div>
// // // //           </div>
// // // //           <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 md:p-8">
// // // //             <div className="text-rose-600 text-xl sm:text-2xl md:text-3xl font-bold">
// // // //               {books}
// // // //             </div>
// // // //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// // // //               Total Books
// // // //             </div>
// // // //           </div>
// // // //           <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 md:p-8">
// // // //             <div className="text-rose-600 text-xl sm:text-2xl md:text-3xl font-bold">
// // // //               {posts}
// // // //             </div>
// // // //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// // // //               Active Tuition posts
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default HomeStatus;
// // // import React, { useEffect, useState } from "react";

// // // function HomeStatus({ data }) {
// // //   const [books, setBooks] = useState();
// // //   const [tutors, setTutors] = useState();
// // //   const [students, setStudents] = useState();
// // //   const [posts, setPosts] = useState();

// // //   useEffect(() => {
// // //     setBooks(data.books);
// // //     setTutors(data.tutors);
// // //     setStudents(data.students);
// // //     setPosts(data.posts);
// // //   }, [data]);

// // //   return (
// // //     <div className="bg-white dark:bg-neutral-800 rounded-lg py-6 sm:py-8 lg:py-12">
// // //       <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
// // //         <div className="mb-8 md:mb-12">
// // //           <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
// // //             Overview
// // //           </h2>
// // //           <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
// // //             Get a short idea about us.
// // //           </p>
// // //         </div>
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
// // //           <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
// // //             <div className="text-green-600 text-xl sm:text-2xl md:text-3xl font-bold">
// // //               {students}
// // //             </div>
// // //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// // //               মোটকা গ্রাহক সংখ্যা
// // //             </div>
// // //           </div>
// // //           <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 md:p-8">
// // //             <div className="text-red-600 text-xl sm:text-2xl md:text-3xl font-bold">
// // //               {tutors}
// // //             </div>
// // //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// // //               মোটকা শিক্ষকের সংখ্যা
// // //             </div>
// // //           </div>
// // //           <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 md:p-8">
// // //             <div className="text-purple-600 text-xl sm:text-2xl md:text-3xl font-bold">
// // //               {books}
// // //             </div>
// // //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// // //               মোটকা বই সংখ্যা
// // //             </div>
// // //           </div>
// // //           <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 md:p-8">
// // //             <div className="text-indigo-600 text-xl sm:text-2xl md:text-3xl font-bold">
// // //               {posts}
// // //             </div>
// // //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// // //               লাইভ টিউশন সংখ্যা
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default HomeStatus;
// // import React, { useEffect, useState } from "react";

// // function HomeStatus({ data }) {
// //   const [books, setBooks] = useState();
// //   const [tutors, setTutors] = useState();
// //   const [students, setStudents] = useState();
// //   const [posts, setPosts] = useState();

// //   useEffect(() => {
// //     setBooks(data.books);
// //     setTutors(data.tutors);
// //     setStudents(data.students);
// //     setPosts(data.posts);
// //   }, [data]);

// //   return (
// //     <div className="bg-white dark:bg-neutral-800 rounded-lg py-6 sm:py-8 lg:py-12">
// //       <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
// //         <div className="mb-8 md:mb-12">
// //           <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
// //             Overview
// //           </h2>
// //           <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
// //             Get a short idea about us.
// //           </p>
// //         </div>
// //         <div className="grid grid-cols-12 gap-4 lg:gap-8">
// //           <div className="col-span-6 flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
// //             <div className="text-green-600 text-xl sm:text-2xl md:text-3xl font-bold">
// //               {students}
// //             </div>
// //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// //               মোটকা গ্রাহক সংখ্যা
// //             </div>
// //           </div>
// //           <div className="col-span-6 flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
// //             <div className="text-red-600 text-xl sm:text-2xl md:text-3xl font-bold">
// //               {tutors}
// //             </div>
// //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// //               মোটকা শিক্ষকের সংখ্যা
// //             </div>
// //           </div>
// //           <div className="col-span-6 flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
// //             <div className="text-purple-600 text-xl sm:text-2xl md:text-3xl font-bold">
// //               {books}
// //             </div>
// //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// //               মোটকা বই সংখ্যা
// //             </div>
// //           </div>
// //           <div className="col-span-6 flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
// //             <div className="text-indigo-600 text-xl sm:text-2xl md:text-3xl font-bold">
// //               {posts}
// //             </div>
// //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// //               লাইভ টিউশন সংখ্যা
// //             </div>
// //           </div>
// //           <div className="col-span-6 flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
// //             <div className="text-orange-600 text-xl sm:text-2xl md:text-3xl font-bold">
// //               New Box
// //             </div>
// //             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
// //               নতুন বক্স
// //             </div>
// //           </div>
         
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default HomeStatus;
// import React, { useEffect, useState } from "react";

// function HomeStatus({ data }) {
//   const [books, setBooks] = useState();
//   const [tutors, setTutors] = useState();
//   const [students, setStudents] = useState();
//   const [posts, setPosts] = useState();

//   useEffect(() => {
//     setBooks(data.books);
//     setTutors(data.tutors);
//     setStudents(data.students);
//     setPosts(data.posts);
//   }, [data]);

//   return (
//     <div className="bg-white dark:bg-neutral-800 rounded-lg py-6 sm:py-8 lg:py-12">
//       <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
//         <div className="mb-8 md:mb-12">
//           <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
//             Overview
//           </h2>
//           <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
//             Get a short idea about us.
//           </p>
//         </div>
//         <div className="grid grid-cols-12 gap-4 lg:gap-8">
//           <div className="col-span-6">
//             <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8 mb-4">
//               <div className="text-green-600 text-xl sm:text-2xl md:text-3xl font-bold">
//                 {students}
//               </div>
//               <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
//                 মোটকা গ্রাহক সংখ্যা
//               </div>
//             </div>
//             <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8 mb-4">
//               <div className="text-red-600 text-xl sm:text-2xl md:text-3xl font-bold">
//                 {tutors}
//               </div>
//               <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
//                 মোটকা শিক্ষকের সংখ্যা
//               </div>
//             </div>
//             <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8 mb-4">
//               <div className="text-purple-600 text-xl sm:text-2xl md:text-3xl font-bold">
//                 {books}
//               </div>
//               <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
//                 মোটকা বই সংখ্যা
//               </div>
//             </div>
//             <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
//               <div className="text-indigo-600 text-xl sm:text-2xl md:text-3xl font-bold">
//                 {posts}
//               </div>
//               <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
//                 লাইভ টিউশন সংখ্যা
//               </div>
//             </div>
//           </div>
//           <div className="col-span-6 flex flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
//             <div className="text-orange-600 text-xl sm:text-2xl md:text-3xl font-bold">
//               New Box
//             </div>
//             <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
//               নতুন বক্স
//             </div>
//             <p className="text-gray-800 dark:text-gray-200 sm:text-base font-semibold mt-4">
//               test ..
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomeStatus;
import React, { useEffect, useState } from "react";
import Image from "next/image";

function HomeStatus({ data }) {
  const [books, setBooks] = useState();
  const [tutors, setTutors] = useState();
  const [students, setStudents] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    setBooks(data.books);
    setTutors(data.tutors);
    setStudents(data.students);
    setPosts(data.posts);
  }, [data]);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
        <div className="mb-8 md:mb-12">
          <h2 className="text-gray-800 tutor-title dark:text-gray-200 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            এক নজরে আমাদের অর্জন
          </h2>
          <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
          এক নজরে আমাদের কোম্পানির গ্রাহক , অর্জন এবং সেবা সম্পর্কে সংক্ষিপ্ত ধারনা
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 lg:gap-8">
          <div className="col-span-8 grid grid-cols-2 gap-4 test-s">
            <div className="flex total-s flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
              <div className="text-green-600 text-xl sm:text-2xl md:text-3xl font-bold">
                {students}
              </div>
              <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
                মোট গ্রাহক সংখ্যা
              </div>
            </div>
            <div className="flex total-s flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
              <div className="text-red-600 text-xl sm:text-2xl md:text-3xl font-bold">
                {tutors}
              </div>
              <div className="text-sm  text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
                মোট শিক্ষকের সংখ্যা
              </div>
            </div>
            <div className="flex total-s flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
              <div className="text-purple-600 text-xl sm:text-2xl md:text-3xl font-bold">
                {books}
              </div>
              <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
                মোট বই সংখ্যা
              </div>
            </div>
            <div className="flex total-s flex-col justify-center items-center bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 lg:p-8">
              <div className="text-indigo-600 text-xl sm:text-2xl md:text-3xl font-bold">
                {posts}
              </div>
              <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold">
                লাইভ টিউশন সংখ্যা
              </div>
            </div>
          </div>
          <div className="col-span-4 flex flex-col justify-center items-center   rounded-lg p-4 lg:p-8">
            <Image 
            src="/overview.png"
            width={300}
           height={160}
            />
            
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeStatus;
