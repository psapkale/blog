import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ThemeContext } from "./providers/themeProvider";
import { FeaturedBlogs } from "./components/FeaturedBlogs";
import { CategoryBlogModal } from "./components/CategoryBlogsModal";

function App() {
   const [theme, setTheme] = useState("light");
   if (theme === "dark") {
      document.body.classList.add("dark-theme");
   } else {
      document.body.classList.remove("dark-theme");
   }

   return (
      <div>
         <ThemeContext.Provider
            value={{
               theme,
               setTheme,
            }}
         >
            <Navbar />
            <FeaturedBlogs />
            <CategoryBlogModal offset={6} />
            <CategoryBlogModal
               type={"Application"}
               color="#b4dc19"
               offset={3}
            />
            <CategoryBlogModal type={"FrontEnd"} color="#14c8eb" offset={3} />
            <CategoryBlogModal
               type={"Infrastructure"}
               color="#c8aff0"
               offset={3}
            />
            <CategoryBlogModal
               type={"MachineLearning"}
               color="#ffb9b0"
               offset={3}
            />
            <CategoryBlogModal type={"Mobile"} color="#ff8c19" offset={3} />
            <CategoryBlogModal type={"Security"} color="#b4c8e1" offset={3} />
            <CategoryBlogModal type={"Culture"} color="#fa551e" offset={3} />
         </ThemeContext.Provider>
      </div>
   );
}

export default App;
