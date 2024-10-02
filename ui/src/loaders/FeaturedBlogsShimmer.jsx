import { useContext } from "react";
import { ThemeContext } from "../providers/themeProvider";

export const FeaturedBlogsShimmer = () => {
   const { theme } = useContext(ThemeContext);

   return Array(3)
      .fill("")
      .map((_, i) => (
         <div
            className="text-[10px] w-[90%] sm:w-[33%] h-fit flex flex-col items-start"
            key={i}
         >
            <div
               className={`w-[96%] h-[100px] sm:h-[196px] ${
                  theme === "light"
                     ? "shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                     : "shadow-[0_3px_10px_rgb(255,255,255,0.2)]"
               }`}
            ></div>
         </div>
      ));
};
