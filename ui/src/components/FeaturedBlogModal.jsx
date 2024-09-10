import { useContext, useMemo } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { monthString } from "../utils/monthString";
import { Link } from "react-router-dom";
import { shuffleNumbers } from "../utils/shuffleNumbers";

export const FeaturedBlogModal = ({ category = "All", blog, i }) => {
   const { theme } = useContext(ThemeContext);
   const shuffledIndex = useMemo(() => shuffleNumbers(), []);
   const index = shuffledIndex[i];
   const s = blog.createdAt;
   const month = monthString(s.slice(5, 7));
   const date = s.slice(8, 10);
   const year = s.slice(0, 4);
   const createdAt = month + " " + date + ", " + year;
   const colors = [
      "#b4c8e1",
      "#ffafa5",
      "#c8aff0",
      "#fad24b",
      "#14c8eb",
      "#ff8c19",
   ];

   return (
      <Link
         to={`/${blog.categories[0].category.name}/${blog.title}`}
         className="w-[33%] h-fit flex flex-col items-start"
      >
         <img
            src={`/img${index}.jpg`}
            alt={index}
            style={{
               backgroundColor:
                  theme === "light" ? colors[index] || "white" : "#cccccc",
            }}
            className={`w-[96%] h-[196px] object-cover cursor-pointer`}
         />
         <div className="-translate-y-10 -translate-x-4">
            <h1
               style={{
                  backgroundColor:
                     theme === "light" ? "black" : colors[index] || "white",
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
               {category === "All" && (
                  <>
                     <>•</>
                     <Link
                        to={`/${blog.categories[0].category.name}`}
                        className="underline hover:no-underline duration-100 cursor-pointer"
                     >
                        {blog.categories[0].category.name}
                     </Link>
                  </>
               )}
            </div>
         </div>
      </Link>
   );
};
