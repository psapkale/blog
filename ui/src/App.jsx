import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ThemeContext } from "./providers/themeProvider";
import { Hero } from "./pages/Hero";
import { BlogModal } from "./pages/BlogModal";
import { Toaster } from "react-hot-toast";
import { CreateBlog } from "./components/CreateBlog";
import { LoginContext } from "./providers/loginProvider";

function App() {
   const [theme, setTheme] = useState("light");
   const [isLogin, setIsLogin] = useState(
      !!sessionStorage.getItem("userDetails")
   );
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
            <LoginContext.Provider
               value={{
                  isLogin,
                  setIsLogin,
               }}
            >
               <Navbar />
               <Routes>
                  <Route path="/" element={<Hero />} />
                  <Route path="/create" element={<CreateBlog />} />
                  <Route path="/:category/:title" element={<BlogModal />} />
               </Routes>
            </LoginContext.Provider>
         </ThemeContext.Provider>
      </Router>
   );
}

export default App;
