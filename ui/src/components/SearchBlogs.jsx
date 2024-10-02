import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SearchBlogModal } from "./SearchBlogModal";
import { ThemeContext } from "../providers/themeProvider";

export const SearchBlogs = () => {
   const { theme } = useContext(ThemeContext);
   const [searchParams, setSearchParams] = useSearchParams();
   const [inputSearch, setInputSearch] = useState("");
   const [blogs, setBlogs] = useState([]);
   const [loading, setLoading] = useState(false);

   function handleInputChange(e) {
      setInputSearch(e.target.value);
   }

   function handleSearch(e) {
      e.preventDefault();
      if (inputSearch !== "") {
         const value = inputSearch.trim();
         // ? look for url with white spaces
         setSearchParams({ q: encodeURI(value) });
      }
   }

   async function fetchBlogs() {
      setLoading(true);
      try {
         const res = await axios.get(
            `${import.meta.env.VITE_BLOG_SERVER_URL}/search`,
            {
               params: {
                  q: decodeURI(searchParams.get("q")),
               },
            }
         );
         setBlogs(res?.data?.blogs);
         setLoading(false);
      } catch (err) {
         console.error(err.response.data.error);
         toast.error("Failed to get blogs");
      }
   }

   useEffect(() => {
      fetchBlogs();
   }, [searchParams]);

   useEffect(() => {
      setInputSearch(inputSearch || decodeURI(searchParams.get("q")));
   }, []);

   return (
      <div>
         <div className="w-full h-[45vh] bg-black flex items-center justify-center">
            <form onSubmit={handleSearch}>
               <input
                  type="text"
                  value={inputSearch}
                  onChange={handleInputChange}
                  placeholder="Search"
                  className="w-[80vw] sm:w-[66vw] h-[20%] text-[40px] sm:text-[50px] bg-black text-white py-6 px-1 border-b-2 placeholder:text-[#757575] focus:outline-none"
               />
            </form>
         </div>
         {loading ? (
            <div className="w-[80%] sm:w-[66%] mx-auto my-10 h-[20vh]">
               <h1>Loading..</h1>
            </div>
         ) : blogs.length === 0 ? (
            <div className="w-[80%] sm:w-[66%] mx-auto my-10 h-[20vh] flex items-center justify-center">
               <h1 className="tracking-[3px] text-[16px]">
                  // We couldn't find any articles. Try searching for something
                  else, or choose from one of our{" "}
                  <Link to={"/"} className="underline hover:no-underline">
                     featured articles
                  </Link>
                  .
               </h1>
            </div>
         ) : (
            <div className="w-full sm:w-[66%] mx-auto my-10 h-fit px-6 sm:px-10 mt-20 flex flex-col gap-20">
               <div>
                  <div
                     style={{
                        color: theme === "light" ? "black" : "white",
                     }}
                  >
                     <b className="text-[15px] font-[600]">/ /</b>
                     <span className="ml-2 tracking-[1px]">Filter posts</span>
                  </div>
                  {/* map category */}
                  <button
                     style={{
                        color: theme === "light" ? "black" : "white",
                        borderColor: theme === "light" ? "black" : "white",
                     }}
                     className="border border-black px-3 py-0 hover:bg-[#d0d0d0] mt-4"
                  >
                     Category
                  </button>
               </div>
               <div className="flex flex-col gap-8">
                  {blogs.map((blog) => (
                     <div key={blog?.id} className="flex">
                        <SearchBlogModal
                           blog={blog}
                           spotlightText={inputSearch}
                        />
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};
