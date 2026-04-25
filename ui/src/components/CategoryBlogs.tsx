import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { CategoryBlogModal } from "./CategoryBlogModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { CategoryBlogShimmer } from "../loaders/CategoryBlogShimmer";
import { Link } from "react-router-dom";

export enum CategoryType {
   Latest = "Latest",
   Application = "Application",
   FrontEnd = "FrontEnd",
   Infrastructure = "Infrastructure",
   MachineLearning = "MachineLearning",
   Mobile = "Mobile",
   Security = "Security",
   Culture = "Culture",
}

interface CategoryBlogsProps {
   type?: CategoryType;
   color?: string;
   offset?: number;
   allPostsByCategory?: boolean;
}

export const CategoryBlogs = ({
   type = CategoryType.Latest,
   color = "white",
   offset,
   allPostsByCategory,
}: CategoryBlogsProps) => {
   const { theme } = useContext(ThemeContext);
   const [blogs, setBlogs] = useState([]);
   const [loading, setLoading] = useState(false);

   async function fetchLatest() {
      try {
         setLoading(true);
         let res;
         if (type === CategoryType.Latest) {
            res = await axios.get(
               `${import.meta.env.VITE_BLOG_SERVER_URL}/latest/${offset}`
            );
         } else if (allPostsByCategory) {
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
      <div className="w-full sm:w-[66%] mx-auto my-10 h-fit px-6 sm:px-10">
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
                     backgroundColor: color,
                  }}
                  className={`
                  ${
                     "py-2 px-3 hover:underline cursor-pointer"
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
                  to={type === CategoryType.Latest ? `/all-stories` : `/${type}`}
                  className="hidden sm:block text-[14px] underline hover:no-underline duration-100 cursor-pointer"
               >
                  {type === CategoryType.Latest ? "See more" : "See all"}
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
