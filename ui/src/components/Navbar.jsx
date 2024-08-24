import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/themeProvider";
import { userDetails } from "../utils/userDetails";
import { Popover } from "./Popover";

export const Navbar = () => {
   const { theme, setTheme } = useContext(ThemeContext);
   const [show, setShow] = useState(false);
   const [lastScrollY, setLastScrollY] = useState(0);
   // ! nav not updating on signup
   const isUserPresent = userDetails() ? true : false;

   function toggleTheme() {
      if (theme === "light") {
         document.body.classList.add("dark-theme");
         setTheme("dark");
      } else {
         document.body.classList.remove("dark-theme");
         setTheme("light");
      }
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
            <div className="cursor-pointer">Topic</div>
            {isUserPresent ? (
               <a href="/create" className="cursor-pointer hover:underline">
                  Write Blog
               </a>
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
