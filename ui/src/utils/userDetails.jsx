import { useEffect } from "react";

export const userDetails = () => {
   let user = null;

   useEffect(() => {
      user = sessionStorage.getItem("userDetails")
         ? JSON.parse(sessionStorage.getItem("userDetails"))
         : null;
   }, [sessionStorage.getItem("userDetails")]);

   return user;
};
