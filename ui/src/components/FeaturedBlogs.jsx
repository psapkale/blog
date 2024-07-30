import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { monthString } from "../utils/monthString";

export const FeaturedBlogs = () => {
   const { theme } = useContext(ThemeContext);
   const [blogs, setBlogs] = useState([]);
   const shuffledIndex = useMemo(() => shuffleNumbers(), []);
   const colors = [
      "#b4c8e1",
      "#ffafa5",
      "#c8aff0",
      "#fad24b",
      "#14c8eb",
      "#ff8c19",
   ];

   async function fetchData() {
      try {
         const data = await fetch(
            `${import.meta.env.VITE_BLOG_SERVER_URL}/featured`
         );
         const res = await data.json();

         setBlogs(res?.featuredBlogs);
      } catch (err) {
         console.log(err);
      }
   }

   function shuffleNumbers() {
      const nums = [];
      const availableNumbers = [1, 2, 3, 4, 5, 6];

      for (let i = 0; i < 6; i++) {
         const randomIndex = Math.floor(
            Math.random() * availableNumbers.length
         );
         nums.push(availableNumbers[randomIndex]);
         availableNumbers.splice(randomIndex, 1);
      }

      return nums;
   }

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className="w-[66%] mx-auto mt-20 h-fit px-10">
         <h1
            style={{
               color: theme === "light" ? "black" : "white",
            }}
            className="text-[12px] font-[600]"
         >
            Featured
         </h1>
         <div className="mt-10 flex gap-10 items-start justify-evenly">
            {!blogs[0] ? (
               <div className="text-[10px]">loading..</div>
            ) : (
               blogs?.map((blog, i) => {
                  const s = blog.createdAt;
                  const month = monthString(s.slice(5, 7));
                  const date = s.slice(8, 10);
                  const year = s.slice(0, 4);
                  const createdAt = month + " " + date + ", " + year;
                  const index = shuffledIndex[i];

                  return (
                     <div
                        key={blog.id}
                        className="w-[33%] h-fit flex flex-col items-start"
                     >
                        <img
                           src={`/img${index}.jpg`}
                           alt={index}
                           style={{
                              backgroundColor:
                                 theme === "light"
                                    ? colors[index] || "white"
                                    : "#cccccc",
                           }}
                           className={`w-[96%] h-[196px] object-cover cursor-pointer`}
                        />
                        <div className="-translate-y-10 -translate-x-4">
                           <h1
                              style={{
                                 backgroundColor:
                                    theme === "light"
                                       ? "black"
                                       : colors[index] || "white",
                                 color: theme === "light" ? "white" : "black",
                              }}
                              className="duration-200 px-2 py-1 hover:underline cursor-pointer"
                           >
                              {blog.title}
                           </h1>
                           <div
                              style={{
                                 color: theme === "light" ? "black" : "white",
                              }}
                              className="mt-1 text-[11px] flex gap-2 items-center justify-start text-nowrap flex-wrap"
                           >
                              <b className="text-[12px]">/ /</b>
                              <h1 className="">{createdAt}</h1>
                              <>•</>
                              <h1 className="underline hover:no-underline duration-100 cursor-pointer">
                                 {blog.categories[0].category.name}
                              </h1>
                           </div>
                        </div>
                     </div>
                  );
               })
            )}
         </div>
      </div>
   );
};
