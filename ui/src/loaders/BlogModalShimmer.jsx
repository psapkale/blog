import { useContext } from "react";
import { ThemeContext } from "../providers/themeProvider";

export const BlogModalShimmer = () => {
   const { theme } = useContext(ThemeContext);

   return (
      <div
         style={{
            color: theme === "light" ? "black" : "white",
         }}
         className="w-full h-screen grid place-content-center"
      >
         Fetching the Blog..
      </div>
   );
};
