import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { CategoryBlogModal } from "./CategoryBlogModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { CategoryBlogShimmer } from "../loaders/CategoryBlogShimmer";
import { Link, useParams } from "react-router-dom";

export const CategoryBlogs = ({
   type = "Latest",
   color = "white",
   offset,
   allPostsByCategory,
}) => {
   const data = useParams();
   console.log(data);
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
         } else if (type !== "Latest" && allPostsByCategory) {
            res = await axios.get(
               `${import.meta.env.VITE_BLOG_SERVER_URL}/all/${type}`
            );
         } else {
            const strictType = type.replace(" ", "");
            res = await axios.get(
               `${import.meta.env.VITE_BLOG_SERVER_URL}/${strictType}/${offset}`
            );
         }
         setBlogs(
            allPostsByCategory ? res?.data?.blogs : res?.data?.latestBlogs
         );
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
            {type !== "Latest" && !allPostsByCategory ? (
               <Link
                  to={`/${type}`}
                  style={{
                     backgroundColor: type !== "Latest" && color,
                  }}
                  className={`
                  ${
                     type === "Latest"
                        ? theme === "dark" && "text-white"
                        : "py-2 px-3 hover:underline cursor-pointer"
                  }
                     `}
               >
                  {type}
               </Link>
            ) : (
               <h1 className={`${theme === "dark" && "text-white"}`}>
                  {allPostsByCategory ? "All Posts" : "Latest"}
               </h1>
            )}
            {!allPostsByCategory && (
               <Link
                  to={type === "Latest" ? `/all-stories` : `/${type}`}
                  className="text-[14px] underline hover:no-underline duration-100 cursor-pointer"
               >
                  {type === "Latest" ? "See more" : "See all"}
               </Link>
            )}
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
         {!allPostsByCategory && (
            <div className="border-b border-black w-full"></div>
         )}
      </div>
   );
};
