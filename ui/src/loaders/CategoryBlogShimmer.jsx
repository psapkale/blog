import { useContext } from "react";
import { ThemeContext } from "../providers/themeProvider";
export const CategoryBlogShimmer = () => {
   const { theme } = useContext(ThemeContext);

   return (
      <div
         style={{
            color: theme === "light" ? "black" : "white",
         }}
         className="w-full h-[40px] text-[10px] flex items-center justify-center"
      >
         loading..
      </div>
   );
};
