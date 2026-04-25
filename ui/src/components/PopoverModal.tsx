import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { LoginContext } from "../providers/LoginProvider";

interface PopoverModalProps {
   type: "signin" | "login";
   setIsOpen: (isOpen: boolean) => void;
}

export const PopoverModal = ({ type, setIsOpen }: PopoverModalProps) => {
   const [userName, setuserName] = useState<string>();
   // ? validation for email and password
   const [email, setEmail] = useState<string>();
   const [password, setPassword] = useState<string>();
   const [loading, setLoading] = useState(false);
   const { setIsLogin } = useContext(LoginContext);
   const emailReg = /^[^@]+@[^@]+.[^@]+$/;

   async function handleSignin() {
      if (!emailReg.test(email)) {
         toast.error("Invalid email");
         return;
      }
      try {
         setLoading(true);
         const res = await axios.post(
            `${import.meta.env.VITE_BLOG_SERVER_URL}/signin`,
            {
               name: userName,
               email: email,
               password: password,
            }
         );
         const userData = {
            token: res?.data?.token,
            email: res?.data?.email,
         };
         sessionStorage.setItem("userDetails", JSON.stringify(userData));
         setIsLogin(true);
         toast.success("Signin Successful");
         setIsOpen(false);
      } catch (err) {
         toast.error(err.response.data.error);
      } finally {
         setLoading(false);
      }
   }

   async function handleLogin() {
      if (!emailReg.test(email)) {
         toast.error("Invalid email");
         return;
      }
      try {
         setLoading(true);
         const res = await axios.post(
            `${import.meta.env.VITE_BLOG_SERVER_URL}/login`,
            {
               email: email,
               password: password,
            }
         );
         const userData = {
            token: res?.data?.token,
            email: res?.data?.email,
         };
         sessionStorage.removeItem("userDetails");
         sessionStorage.setItem("userDetails", JSON.stringify(userData));
         setIsLogin(true);
         toast.success("Signin Successful");
         setIsOpen(false);
      } catch (err) {
         toast.error(err.response.data.error);
      }
      finally {
         setLoading(false);
      }
   }

   return createPortal(
      <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-25 overflow-hidden flex items-center justify-center">
         <div className="relative w-[90%] sm:w-1/2 h-3/4 bg-white flex flex-col items-center justify-center rounded-lg border-2 border-black">
            <button
               className="absolute top-2 right-2 p-1 rounded-lg"
               onClick={() => setIsOpen(false)}
            >
               <X />
            </button>
            <h1 className="w-full h-[10%] text-3xl flex items-center justify-center">
               {type === "signin" ? "Signin" : "Login"}
            </h1>
            <div className="w-full h-[80%] flex flex-col gap-2 items-center justify-center">
               {type === "signin" && (
                  <>
                     <label htmlFor="userName" className="w-[80%] sm:w-1/2">
                        Name
                     </label>
                     <input
                        id="userName"
                        type="text"
                        value={userName}
                        disabled={loading}
                        onChange={(e) => setuserName(e.target.value)}
                        className="mb-2 border border-black rounded-lg w-[80%] sm:w-1/2 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                     />
                  </>
               )}
               <label htmlFor="email" className="w-[80%] sm:w-1/2">
                  Email
               </label>
               <input
                  id="email"
                  type="email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => {
                     setEmail(e.target.value);
                  }}
                  className="mb-2 border border-black rounded-lg w-[80%] sm:w-1/2 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
               />
               <label htmlFor="password" className="w-[80%] sm:w-1/2">
                  Password
               </label>
               <input
                  id="password"
                  type="password"
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-4 border border-black rounded-lg w-[80%] sm:w-1/2 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
               />
               <button
                  onClick={type === "signin" ? handleSignin : handleLogin}
                  disabled={loading}
                  className={`bg-black text-white w-[80%] sm:w-1/2 p-2 py-3 sm:py-2 rounded-lg ${
                     loading && "cursor-wait disabled:opacity-50"
                  }`}
               >
                  {type === "signin" ? "Signin" : "Login"}
               </button>
            </div>
         </div>
      </div>,
      document.querySelector("#popover-content")
   );
};
