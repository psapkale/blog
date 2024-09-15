import { useContext } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { Link } from "react-router-dom";
import { monthString } from "../utils/monthString";

export const SearchBlogModal = ({ blog, spotlightText }) => {
   const { theme } = useContext(ThemeContext);
   const s = blog.createdAt;
   const month = monthString(s.slice(5, 7));
   const date = s.slice(8, 10);
   const year = s.slice(0, 4);
   const createdAt = month + " " + date + ", " + year;

   return (
      <div className="flex flex-col items-start">
         <Link
            to={`/${blog?.categories[0]?.category?.name}/${blog?.title}`}
            style={{
               color: theme === "light" ? "black" : "white",
            }}
            className="text-[20px] font-[600] duration-200 py-1 hover:underline cursor-pointer"
         >
            {blog.title}
         </Link>
         <div
            style={{
               color: theme === "light" ? "black" : "white",
            }}
            className="mt-1 text-[12px] tracking-[2px] flex gap-2 items-center justify-start text-nowrap flex-wrap"
         >
            <b className="text-[12px] tracking-normal">/ /</b>
            <h1 className="">{createdAt}</h1>
            <>
               <>•</>
            </>
         </div>
      </div>
   );
};
