import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { FeaturedBlogModal } from "./FeaturedBlogModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FeaturedBlogsShimmer } from "../loaders/FeaturedBlogsShimmer";

export const FeaturedBlogs = ({ category = "All" }) => {
   const { theme } = useContext(ThemeContext);
   const [blogs, setBlogs] = useState([]);
   const [loading, setLoading] = useState(false);

   async function fetchData() {
      try {
         setLoading(true);
         const res = await axios.get(
            category === "All"
               ? `${import.meta.env.VITE_BLOG_SERVER_URL}/featured`
               : `${import.meta.env.VITE_BLOG_SERVER_URL}/all/${category}`
         );

         setBlogs(
            category === "All" ? res?.data?.featuredBlogs : res?.data?.blogs
         );
         setLoading(false);
      } catch (err) {
         toast.error(err.response.data.error);
      }
   }

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className="w-full sm:w-[66%] mx-auto mt-12 sm:mt-20 h-fit px-6 sm:px-10">
         <h1
            style={{
               color: theme === "light" ? "black" : "white",
            }}
            className="text-[16px] sm:text-[12px] font-[600]"
         >
            Featured
         </h1>
         <div className="mt-10 flex gap-2 sm:gap-10 flex-col sm:flex-row items-center sm:items-start justify-evenly">
            {loading ? (
               <FeaturedBlogsShimmer />
            ) : (
               blogs
                  .slice(0, 3)
                  ?.map((blog, i) => (
                     <FeaturedBlogModal
                        key={blog.id}
                        category={category}
                        blog={blog}
                        i={i}
                     />
                  ))
            )}
         </div>
      </div>
   );
};
