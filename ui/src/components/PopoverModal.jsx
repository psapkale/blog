import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { LoginContext } from "../providers/loginProvider";

export const PopoverModal = ({ type, setIsOpen }) => {
   const [userName, setuserName] = useState();
   // ? validation for email and password
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
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
         setLoading(false);
         setIsOpen(false);
      } catch (err) {
         toast.error(err.response.data.error);
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
         setLoading(false);
         setIsOpen(false);
      } catch (err) {
         toast.error(err.response.data.error);
      }
   }

   return createPortal(
      <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-25 overflow-hidden flex items-center justify-center">
         <div className="relative w-1/2 h-3/4 bg-white flex flex-col items-center justify-center rounded-lg border-2 border-black">
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
                     <label htmlFor="userName" className="w-1/2">
                        Name
                     </label>
                     <input
                        id="userName"
                        type="text"
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                        className="mb-2 border border-black rounded-lg w-1/2 p-2"
                     />
                  </>
               )}
               <label htmlFor="email" className="w-1/2">
                  Email
               </label>
               <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                     setEmail(e.target.value);
                  }}
                  className="mb-2 border border-black rounded-lg w-1/2 p-2"
               />
               <label htmlFor="password" className="w-1/2">
                  Password
               </label>
               <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-4 border border-black rounded-lg w-1/2 p-2"
               />
               <button
                  onClick={type === "signin" ? handleSignin : handleLogin}
                  disabled={loading}
                  className={`bg-black text-white w-1/2 p-2 rounded-lg ${
                     loading && "cursor-wait"
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
