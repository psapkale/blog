import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { Popover } from "./Popover";
import { LoginContext } from "../providers/loginProvider";

export const Navbar = () => {
   const { theme, setTheme } = useContext(ThemeContext);
   const [show, setShow] = useState(false);
   const [lastScrollY, setLastScrollY] = useState(0);
   const { isLogin, setIsLogin } = useContext(LoginContext);
   const [showTopics, setShowTopics] = useState(false);

   function toggleTheme() {
      if (theme === "light") {
         document.body.classList.add("dark-theme");
         setTheme("dark");
      } else {
         document.body.classList.remove("dark-theme");
         setTheme("light");
      }
   }

   function handleLogout() {
      sessionStorage.removeItem("userDetails");
      setIsLogin(false);
   }

   useEffect(() => {
      const handleScroll = () => {
         const currentScrollY = window.scrollY;

         if (currentScrollY < lastScrollY) {
            setShow(false);
         } else {
            setShow(true);
         }

         setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [lastScrollY]);

   return (
      <div
         className={`bg-black duration-300 delay-200 ${
            show ? "-translate-y-full" : "translate-y-0"
         } w-full text-white flex items-center justify-between py-4 px-10 sticky top-0 z-20`}
      >
         <a href="/" className="text-[16px] font-[1000] cursor-pointer">
            Blog.dev
         </a>
         <div className="text-[12px] font-[100] flex gap-10 items-center justify-between">
            <div onMouseEnter={() => setShowTopics(true)} className="relative">
               <div className="cursor-pointer p-2 peer">Topic</div>
               {showTopics && (
                  <div
                     onMouseLeave={() => setShowTopics(false)}
                     className="bg-black absolute top-[38px] -left-[80px] px-8 py-4 text-[16px] text-nowrap flex flex-col gap-2 transition-opacity duration-500"
                  >
                     <a
                        href="/Application"
                        className="text-[#b4dc11] hover:underline cursor-pointer"
                     >
                        Application
                     </a>
                     <a
                        href="/FrontEnd"
                        className="text-[#14c8eb] hover:underline cursor-pointer"
                     >
                        Front End
                     </a>
                     <a
                        href="/Infrastructure"
                        className="text-[#c8aff0] hover:underline cursor-pointer"
                     >
                        Infrastructure
                     </a>
                     <a
                        href="/MachineLearning"
                        className="text-[#ffaf95] hover:underline cursor-pointer"
                     >
                        Machine Learning
                     </a>
                     <a
                        href="/Mobile"
                        className="text-[#ff8c19] hover:underline cursor-pointer"
                     >
                        Mobile
                     </a>
                     <a
                        href="/Security"
                        className="text-[#b4c8e1] hover:underline cursor-pointer"
                     >
                        Security
                     </a>
                     <a
                        href="/Culture"
                        className="text-[#fa551e] hover:underline cursor-pointer"
                     >
                        Culture
                     </a>
                  </div>
               )}
            </div>
            {isLogin ? (
               <>
                  <a href="/create" className="cursor-pointer hover:underline">
                     Write Blog
                  </a>
                  <button
                     onClick={handleLogout}
                     className="cursor-pointer hover:underline"
                  >
                     Logout
                  </button>
               </>
            ) : (
               <>
                  <Popover type="signin" />
                  <Popover type="login" />
               </>
            )}
            <button className="cursor-pointer" onClick={toggleTheme}>
               <img
                  src="/button_dark-mode-new.svg"
                  alt=""
                  height="26"
                  width="26"
               />
            </button>
            <div className="cursor-pointer">
               <img alt="" height="16" src="/search.svg" width="16" />
            </div>
         </div>
      </div>
   );
};
