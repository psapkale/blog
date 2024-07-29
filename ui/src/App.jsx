import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ThemeContext } from "./providers/themeProvider";

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
         </ThemeContext.Provider>
      </div>
   );
}

export default App;
