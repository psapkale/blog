import { toast } from "react-hot-toast";
import { userDetails } from "../utils/userDetails";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const CreateBlog = () => {
   const user = userDetails();
   const navigate = useNavigate();

   useEffect(() => {
      if (!user) {
         toast.error("Please login first");
         return navigate("/");
      }
   }, []);

   return <div>Create</div>;
};
