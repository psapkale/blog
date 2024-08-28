import { toast } from "react-hot-toast";
import { userDetails } from "../utils/userDetails";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { Editor } from "./EditorSpace";
import { shuffleNumbers } from "../utils/shuffleNumbers";

export const CreateBlog = () => {
   const { theme } = useContext(ThemeContext);
   const user = userDetails();
   const navigate = useNavigate();
   const shuffledIndex = useMemo(() => shuffleNumbers(), []);
   const index = useMemo(
      () => shuffledIndex[Math.floor(Math.random() * 6)],
      []
   );
   const colors = [
      "#b4c8e1",
      "#ffafa5",
      "#c8aff0",
      "#fad24b",
      "#14c8eb",
      "#ff8c19",
   ];
   const [blog, setBlog] = useState({
      title: "Bye Bye Bye...: Evolution of repeated token attacks on ChatGPT models",
      categories: ["MachineLearning"],
      content: [{}],
   });

   // { categories, title, content }

   function onChange(content) {
      setBlog((prevBlog) => ({ ...prevBlog, content }));
   }

   useEffect(() => {
      if (!user) {
         toast.error("Please login first");
         return navigate("/");
      }
   }, []);

   return (
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
            <div className="absolute -top-12">
               <h1
                  className="p-2 text-[50px] font-[800]"
                  style={{
                     backgroundColor:
                        theme === "light" ? "black" : colors[index] || "white",
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
                  {/* <b className="text-[15px] font-[600]">/ /</b>
                  <h1 className="">{blog?.author?.name}</h1>
                  <>•</>
                  <h1>{createdAt}</h1> */}
                  <h1>Category</h1>
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
                     editable={true}
                  />
               </div>
            </div>
         </div>
         <div className="h-[160vh] w-full" />
      </div>
   );
};
