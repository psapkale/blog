import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ThemeContext } from "./providers/themeProvider";
import { Hero } from "./pages/Hero";
import { BlogModal } from "./pages/BlogModal";
import { Toaster } from "react-hot-toast";

function App() {
   const [theme, setTheme] = useState("light");
   if (theme === "dark") {
      document.body.classList.add("dark-theme");
   } else {
      document.body.classList.remove("dark-theme");
   }

   return (
      <Router>
         <Toaster />
         <ThemeContext.Provider
            value={{
               theme,
               setTheme,
            }}
         >
            <Navbar />
            <Routes>
               <Route path="/" element={<Hero />} />
               <Route path="/:category/:title" element={<BlogModal />} />
            </Routes>
         </ThemeContext.Provider>
      </Router>
   );
}

export default App;
