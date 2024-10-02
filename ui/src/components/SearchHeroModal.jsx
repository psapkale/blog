import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchHeroModal = ({ setSearchModalOpen }) => {
   const [q, setQ] = useState("");
   const navigate = useNavigate();

   function handleInputChange(e) {
      setQ(e.target.value);
   }

   function handleSubmit(e) {
      e.preventDefault();
      if (q !== "") {
         navigate(`/search-results?q=${q}`);
         setSearchModalOpen(false);
      }
   }

   return (
      <div className="fixed top-0 left-0 w-screen h-[55vh] bg-black z-50">
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
            <form onSubmit={handleSubmit}>
               <input
                  type="text"
                  value={q}
                  onChange={handleInputChange}
                  placeholder="Search"
                  className="w-[80vw] sm:w-[66vw] h-[20%] text-[40px] sm:text-[50px] bg-black py-6 px-1 border-b-2 placeholder:text-[#757575] focus:outline-none"
               />
            </form>
         </div>
      </div>
   );
};
