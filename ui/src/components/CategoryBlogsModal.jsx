import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { monthString } from "../utils/monthString";

export const CategoryBlogModal = ({
   type = "Latest",
   color = "white",
   offset,
}) => {
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
            data = await fetch(
               `${import.meta.env.VITE_BLOG_SERVER_URL}/${type}/${offset}`
            );
         }
         const res = await data.json();
         setBlogs(res.latestBlogs);
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      fetchLatest();
   }, []);
   console.log(blogs);

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
               <h1 className="underline hover:no-underline duration-100 cursor-pointer">
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
                  blogs.map((blog) => {
                     const s = blog.createdAt;
                     const month = monthString(s.slice(5, 7));
                     const date = s.slice(8, 10);
                     const year = s.slice(0, 4);
                     const createdAt = month + " " + date + ", " + year;

                     return (
                        <div key={blog.id}>
                           <h1
                              style={{
                                 color: theme === "light" ? "black" : "white",
                              }}
                              className="text-[18px] font-[600] hover:underline duration-100 cursor-pointer"
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
                              <>•</>
                              <h1 className="underline hover:no-underline duration-100 cursor-pointer">
                                 {blog.categories[0].category.name}
                              </h1>
                           </div>
                        </div>
                     );
                  })
                  // )
               }
            </div>
            <div className="border-b border-black w-full"></div>
         </div>
      )
   );
};
