import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { CategoryBlogModal } from "./CategoryBlogModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { CategoryBlogShimmer } from "../loaders/CategoryBlogShimmer";

export const CategoryBlogs = ({ type = "Latest", color = "white", offset }) => {
   const { theme } = useContext(ThemeContext);
   const [blogs, setBlogs] = useState([]);
   const [loading, setLoading] = useState(false);

   async function fetchLatest() {
      try {
         setLoading(true);
         let res;
         if (type === "Latest") {
            res = await axios.get(
               `${import.meta.env.VITE_BLOG_SERVER_URL}/latest/${offset}`
            );
         } else {
            const strictType = type.replace(" ", "");
            res = await axios.get(
               `${import.meta.env.VITE_BLOG_SERVER_URL}/${strictType}/${offset}`
            );
         }
         setBlogs(res?.data?.latestBlogs);
         setLoading(false);
      } catch (err) {
         toast.error(err.response.data.error);
      }
   }

   useEffect(() => {
      fetchLatest();
   }, []);

   return (
      <div className="w-[66%] mx-auto my-10 h-fit px-10">
         <div
            style={{
               color: theme === "light" ? "black" : "white",
            }}
            className="text-[14px] font-[800] flex items-center justify-between"
         >
            <h1
               style={{
                  backgroundColor: type !== "Latest" && color,
               }}
               className={`
                  ${
                     type == "Latest"
                        ? theme === "dark" && "text-white"
                        : "py-2 px-3 hover:underline cursor-pointer"
                  }
               `}
            >
               {type}
            </h1>
            <h1 className="text-[12px] underline hover:no-underline duration-100 cursor-pointer">
               {type === "Latest" ? "See more" : "See all"}
            </h1>
         </div>
         <div className="my-10 flex flex-col gap-6 items-start justify-evenly">
            {loading ? (
               <CategoryBlogShimmer />
            ) : blogs.length > 0 ? (
               blogs.map((blog) => (
                  <CategoryBlogModal key={blog.id} type={type} blog={blog} />
               ))
            ) : (
               <div
                  className="text-[10px]"
                  style={{
                     color: theme === "dark" && "white",
                  }}
               >
                  more blogs coming soon..
               </div>
            )}
         </div>
         <div className="border-b border-black w-full"></div>
      </div>
   );
};
