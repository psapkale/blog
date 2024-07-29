import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ThemeContext } from "./providers/themeProvider";
import { FeaturedBlogs } from "./components/FeaturedBlogs";
import { LatestBlogs } from "./components/LatestBlogs";

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
            <LatestBlogs offset={6} />
         </ThemeContext.Provider>
      </div>
   );
}

export default App;
