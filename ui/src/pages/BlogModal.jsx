import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { shuffleNumbers } from "../utils/shuffleNumbers";
import { ThemeContext } from "../providers/themeProvider";
import { monthString } from "../utils/monthString";
import { Editor } from "../components/EditorSpace";
import { toast } from "react-hot-toast";
import axios from "axios";

export const BlogModal = () => {
   const [editable, setEditable] = useState(false);
   const { theme } = useContext(ThemeContext);
   const [blog, setBlog] = useState();
   const { category, title } = useParams();
   const shuffledIndex = useMemo(() => shuffleNumbers(), []);
   const index = useMemo(
      () => shuffledIndex[Math.floor(Math.random() * 6)],
      []
   );
   const s = blog ? blog.createdAt : "";
   const month = monthString(s.slice(5, 7));
   const date = s.slice(8, 10);
   const year = s.slice(0, 4);
   const createdAt = month + " " + date + ", " + year;
   const colors = [
      "#b4c8e1",
      "#ffafa5",
      "#c8aff0",
      "#fad24b",
      "#14c8eb",
      "#ff8c19",
   ];
   const token = JSON.parse(sessionStorage.getItem("userDetails"))?.token;

   async function isAuthor() {
      if (
         sessionStorage.getItem("userDetails")?.email === blog?.author?.email
      ) {
         setEditable(true);
      }
   }

   async function fetchBlog() {
      try {
         const res = await axios(
            `${import.meta.env.VITE_BLOG_SERVER_URL}/blog/${title}`
         );
         setBlog(res?.data?.blog);
      } catch (err) {
         toast.error(err.response.data.error);
      }
      isAuthor();
   }

   async function onChange(content) {
      const newContent = JSON.stringify(content);

      try {
         const res = await axios.put(
            `${import.meta.env.VITE_BLOG_SERVER_URL}/update/${title}`,
            {
               content: newContent,
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
               },
            }
         );
      } catch (err) {
         toast.error(err.response.data.error);
      }
   }

   useEffect(() => {
      fetchBlog();
   }, []);

   return !blog ? (
      <div className="text-center mt-2 text-[16px]">loading..</div>
   ) : (
      <div>
         <>
            <img
               src={`/img${index}.jpg`}
               alt={index}
               style={{
                  backgroundColor:
                     theme === "light" ? colors[index] || "white" : "#cccccc",
               }}
               className="w-full h-[40vh]"
            />
         </>
         <div className="relative w-[70vw] mx-auto">
            {blog && (
               <div className="absolute -top-12">
                  <h1
                     className="p-2 text-[50px] font-[800]"
                     style={{
                        backgroundColor:
                           theme === "light"
                              ? "black"
                              : colors[index] || "white",
                        color: theme === "light" ? "white" : "black",
                     }}
                  >
                     {blog?.title}
                  </h1>
                  <div
                     style={{
                        color: theme === "light" ? "black" : "white",
                     }}
                     className="mt-2 px-1 flex gap-2 text-[14px] font-extralight"
                  >
                     <b className="text-[15px] font-[600]">/ /</b>
                     <h1 className="">{blog?.author?.name}</h1>
                     <>•</>
                     <h1>{createdAt}</h1>
                  </div>
                  <div
                     style={{
                        color: theme === "light" ? "black" : "white",
                     }}
                     className="mt-20 w-[70%] mx-auto"
                  >
                     <Editor
                        content={blog?.content}
                        onChange={onChange}
                        editable={editable}
                     />
                  </div>
               </div>
            )}
         </div>
         <div className="h-[160vh] w-full" />
      </div>
   );
};
