import { useContext, useEffect, useState } from "react";
import { CategoryBlogModal } from "../components/CategoryBlogModal";
import { CategoryBlogShimmer } from "../loaders/CategoryBlogShimmer";
import { ThemeContext } from "../providers/themeProvider";
import axios from "axios";

export const AllBlogs = () => {
   const { theme } = useContext(ThemeContext);
   const [blogs, setBlogs] = useState();
   const [loading, setLoading] = useState(true);

   async function fetchBlogs() {
      setLoading(true);
      try {
         const res = await axios.get(
            `${import.meta.env.VITE_BLOG_SERVER_URL}/latest`
         );
         setBlogs(res?.data?.latestBlogs);
         setLoading(false);
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      fetchBlogs();
   }, []);

   return (
      <div className="w-[66%] mx-auto my-10 h-fit px-10">
         <div
            style={{
               color: theme === "light" ? "black" : "white",
            }}
            className="text-[14px] font-[800] flex items-center justify-between"
         >
            All Stories
         </div>
         <div className="my-10 flex flex-col gap-6 items-start justify-evenly">
            {loading ? (
               <CategoryBlogShimmer />
            ) : blogs.length > 0 ? (
               blogs.map((blog) => (
                  <CategoryBlogModal key={blog.id} blog={blog} />
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
