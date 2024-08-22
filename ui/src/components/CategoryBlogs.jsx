import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { CategoryBlogModal } from "./CategoryBlogModal";
import { toast } from "react-hot-toast";

export const CategoryBlogs = ({ type = "Latest", color = "white", offset }) => {
   const { theme } = useContext(ThemeContext);
   const [blogs, setBlogs] = useState([]);

   async function fetchLatest() {
      try {
         let data;
         if (type === "Latest") {
            data = await fetch(
               `${import.meta.env.VITE_BLOG_SERVER_URL}/latest/${offset}`
            );
         } else {
            const strictType = type.replace(" ", "");
            data = await fetch(
               `${import.meta.env.VITE_BLOG_SERVER_URL}/${strictType}/${offset}`
            );
         }
         const res = await data.json();
         setBlogs(res.latestBlogs);
      } catch (err) {
         toast.error(err.message);
      }
   }

   useEffect(() => {
      fetchLatest();
   }, []);

   return (
      blogs.length > 0 && (
         <div className="w-[66%] mx-auto my-10 h-fit px-10">
            <div
               style={{
                  color: theme === "light" ? "black" : "white",
               }}
               className="text-[14px] font-[800] flex items-center justify-between"
            >
               <h1
                  style={{
                     backgroundColor: color,
                  }}
                  className={
                     type == "Latest"
                        ? ""
                        : "py-2 px-3 hover:underline cursor-pointer"
                  }
               >
                  {type}
               </h1>
               <h1 className="text-[12px] underline hover:no-underline duration-100 cursor-pointer">
                  {type === "Latest" ? "See more" : "See all"}
               </h1>
            </div>
            <div className="my-10 flex flex-col gap-6 items-start justify-evenly">
               {
                  // !blogs[0] ? (
                  //    <div className="w-full text-[10px] text-center">
                  //       loading..
                  //    </div>
                  // ) : (
                  blogs.map((blog) => (
                     <CategoryBlogModal key={blog.id} type={type} blog={blog} />
                  ))
                  // )
               }
            </div>
            <div className="border-b border-black w-full"></div>
         </div>
      )
   );
};
