import { toast } from "react-hot-toast";
import { userDetails } from "../utils/userDetails";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { Editor } from "./EditorSpace";
import axios from "axios";
import { Delete, Trash, Trash2, Trash2Icon } from "lucide-react";
import { useColors } from "../utils/useColors";

export const CreateBlog = () => {
   const { theme } = useContext(ThemeContext);
   const user = userDetails();
   const navigate = useNavigate();
   const { colors, index } = useColors();
   const [blog, setBlog] = useState({
      title: "",
      categories: [],
      content: [
         {
            id: "173055b0-a560-46f5-a167-a14fe0704a13",
            type: "paragraph",
            props: {
               textColor: "default",
               backgroundColor: "default",
               textAlignment: "left",
            },
            content: [],
            children: [],
         },
      ],
   });
   const [loading, setLoading] = useState(false);

   function isContentEmpty(content) {
      content.map((c) => {
         if (c.content.length === 0) {
            return true;
         }
      });
      return false;
   }

   function handleTitleChange(e) {
      setBlog((blog) => ({ ...blog, title: e.target.value }));
   }

   function handleCategoryChange(e) {
      setBlog((blog) => ({
         ...blog,
         categories: [...new Set([...blog.categories, e.target.value])],
      }));
   }

   function handleCategoryDelete(category) {
      setBlog({
         ...blog,
         categories: blog.categories.filter((c) => c !== category),
      });
   }

   function handleContentChange(content) {
      setBlog((prevBlog) => ({ ...prevBlog, content }));
   }

   async function handleCreateBlog() {
      try {
         if (blog.title.length === 0) {
            return toast.error("Please fill the title");
         }
         if (blog.categories.length === 0) {
            return toast("Are you sure with the category of the blog?");
         }
         if (blog.content[0].content.length === 0) {
            return toast.error(
               "You can share your thought..\nTry writing from the start"
            );
         }
         setLoading(true);
         const res = await axios.post(
            `${import.meta.env.VITE_BLOG_SERVER_URL}/create-blog`,
            {
               categories: blog.categories,
               title: blog.title,
               content: blog.content,
            },
            {
               headers: {
                  Authorization: `Bearer ${user?.token}`,
                  "Content-Type": "application/json",
               },
            }
         );
         toast.success("Blog created successfully");
         setLoading(false);
         return navigate(`/${blog.categories[0]}/${blog.title}`);
      } catch (err) {
         toast.error(err.response.data.error);
      }
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
               className="w-full h-[30vh] sm:h-[40vh]"
            />
         </>
         <div className="relative w-[90vw] sm:w-[70vw] mx-auto">
            <div className="absolute -top-12 max-w-[90vw]">
               <textarea
                  required
                  placeholder={
                     "Bye Bye Bye...: Evolution of repeated token attacks on ChatGPT models"
                  }
                  onChange={handleTitleChange}
                  className="w-[90vw] sm:w-[70vw] p-2 text-[20px] sm:text-[50px] font-[800]"
                  style={{
                     backgroundColor: theme === "light" ? "black" : "white",
                     color: theme === "light" ? "white" : "black",
                  }}
               />
               <div className="mt-2 px-1 flex gap-2 text-[10px] sm:text-[14px] font-extralight flex-wrap">
                  <select
                     style={{
                        borderColor: theme === "light" ? "black" : "white",
                     }}
                     required
                     // multiple
                     value={blog.categories[blog.categories.length - 1]}
                     onChange={handleCategoryChange}
                     className="border-2 rounded-sm px-2 py-1"
                  >
                     <option disabled selected value="">
                        Category
                     </option>
                     <option value="Application">Application</option>
                     <option value="FrontEnd"> FrontEnd</option>
                     <option value="Infrastructure"> Infrastructure</option>
                     <option value="MachineLearning"> Machine Learning</option>
                     <option value="Mobile"> Mobile</option>
                     <option value="Security"> Security</option>
                     <option value="Culture"> Culture</option>
                  </select>
                  <div className="flex flex-wrap gap-2">
                     {blog.categories.map((category) => (
                        <div
                           key={category}
                           className="px-2 py-1 border rounded-sm flex gap-1 items-center justify-center"
                        >
                           <span>{category}</span>
                           <button
                              onClick={() => handleCategoryDelete(category)}
                           >
                              <Trash2Icon className="w-4 h-4 hover:text-red-500" />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
               <div
                  style={{
                     color: theme === "light" ? "black" : "white",
                  }}
                  className="mt-20 w-full overflow-x-hidden sm:w-[70%] mx-auto"
               >
                  <Editor
                     content={blog?.content}
                     onChange={handleContentChange}
                     editable={true}
                  />
               </div>
               <div className="mt-10 w-full flex items-center justify-end">
                  <button
                     style={{
                        backgroundColor: theme === "light" ? "black" : "white",
                        color: theme === "light" ? "white" : "black",
                     }}
                     onClick={handleCreateBlog}
                     className={`px-4 py-2 rounded-lg ${
                        loading && "cursor-wait"
                     }`}
                  >
                     Create
                  </button>
               </div>
            </div>
         </div>
         <div className="h-[160vh] w-full" />
      </div>
   );
};
