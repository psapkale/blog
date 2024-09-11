import { X } from "lucide-react";
import { useState } from "react";

export const SearchHeroModal = ({ setSearchModalOpen }) => {
   const [q, setQ] = useState("");

   function handleInputChange(e) {
      setQ(e.target.value);
   }

   return (
      <div className="fixed top-0 left-0 w-screen h-[55vh] bg-black">
         <div className="flex items-center justify-between py-6 px-10">
            <a href="/" className="text-[16px] font-[1000] cursor-pointer">
               Blog.dev
            </a>
            <button
               onClick={() => setSearchModalOpen(false)}
               className="cursor-pointer"
            >
               <X width={26} height={26} />
            </button>
         </div>
         <div className="w-full h-[80%] bg-black flex items-center justify-center">
            <input
               type="text"
               value={q}
               onChange={handleInputChange}
               placeholder="Search"
               className="w-[66%] h-[20%] text-[50px] bg-black py-6 px-1 border-b-2 placeholder:text-[#757575] focus:outline-none"
            />
         </div>
      </div>
   );
};
