import { useState } from "react";
import { PopoverModal } from "./PopoverModal";

export const Popover = ({ type = "signin" }) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div>
         <button
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:underline"
         >
            {type === "signin" ? "Signin" : "Login"}
         </button>
         {isOpen && <PopoverModal type={type} setIsOpen={setIsOpen} />}
      </div>
   );
};
