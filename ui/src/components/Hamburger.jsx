import { Tally2, X } from "lucide-react";
import { useContext, useState } from "react";
import { Popover } from "./Popover";
import { LoginContext } from "../providers/loginProvider";

export const Hamburger = () => {
   const [showSidebar, setShowSidebar] = useState(false);
   const { isLogin, setIsLogin } = useContext(LoginContext);

   function handleLogout() {
      sessionStorage.removeItem("userDetails");
      setIsLogin(false);
   }

   return (
      <div className="sm:hidden">
         <div
            className="cursor-pointer -rotate-90 -translate-y-1"
            onClick={() => setShowSidebar(true)}
         >
            <Tally2 />
         </div>

         {/* ! signin and login remaining */}
         <div
            className={`bg-black ${
               showSidebar ? "-translate-y-0" : "-translate-y-full"
            } absolute top-0 left-0 w-screen h-screen px-8 py-32 text-[20px] font-bold text-nowrap flex flex-col gap-2 items-center justify-between transiton-all duration-300`}
         >
            <div
               className="absolute top-10 right-10 cursor-pointer"
               onClick={() => setShowSidebar(false)}
            >
               <X width={26} height={26} />
            </div>
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
         </div>
      </div>
   );
};
