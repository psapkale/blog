import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { FeaturedBlogModal } from "./FeaturedBlogModal";

export const FeaturedBlogs = () => {
   const { theme } = useContext(ThemeContext);
   const [blogs, setBlogs] = useState([]);

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
               blogs?.map((blog, i) => (
                  <FeaturedBlogModal key={blog.id} blog={blog} i={i} />
               ))
            )}
         </div>
      </div>
   );
};
