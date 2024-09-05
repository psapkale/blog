import { useContext } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { monthString } from "../utils/monthString";
import { Link } from "react-router-dom";

export const CategoryBlogModal = ({ blog, type }) => {
   const { theme } = useContext(ThemeContext);
   const s = blog.createdAt;
   const month = monthString(s.slice(5, 7));
   const date = s.slice(8, 10);
   const year = s.slice(0, 4);
   const createdAt = month + " " + date + ", " + year;

   return (
      <Link to={`/${blog.categories[0].category.name}/${blog.title}`}>
         <h1
            style={{
               color: theme === "light" ? "black" : "white",
            }}
            className="text-[22px] font-[600] hover:underline duration-100 cursor-pointer"
         >
            {blog.title}
         </h1>
         <div
            style={{
               color: theme === "light" ? "black" : "white",
            }}
            className="mt-1 text-[14px] flex gap-2 items-center justify-start text-nowrap flex-wrap"
         >
            <b className="text-[12px]">/ /</b>
            <h1 className="">{createdAt}</h1>
            {type === "Latest" && (
               <>
                  <>•</>
                  <h1 className="underline hover:no-underline duration-100 cursor-pointer">
                     {blog.categories[0].category.name}
                  </h1>
               </>
            )}
         </div>
      </Link>
   );
};
