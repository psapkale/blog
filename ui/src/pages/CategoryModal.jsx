import { useParams } from "react-router-dom";
import { FeaturedBlogs } from "../components/FeaturedBlogs";
import { CategoryBlogs } from "../components/CategoryBlogs";
import { HeroHeader } from "../components/HeroHeader";
import { useMemo } from "react";
import { shuffleNumbers } from "../utils/shuffleNumbers";

const HeroContent = ({ text, color = "#fff" }) => {
   return (
      <div className="w-[66%] h-fit mx-auto font-bold text-[3.6rem] text-white">
         (
         <span
            style={{
               color: color,
            }}
         >
            {text}
         </span>
         )
      </div>
   );
};

export const CategoryModal = () => {
   const { category } = useParams();
   const shuffledIndex = useMemo(() => shuffleNumbers(), []);
   const index = shuffledIndex[0];
   const colors = [
      "#b4c8e1",
      "#ffafa5",
      "#c8aff0",
      "#fad24b",
      "#14c8eb",
      "#ff8c19",
   ];

   return (
      <>
         <HeroHeader
            content={<HeroContent text={category} color={colors[index]} />}
         />
         <FeaturedBlogs category={category} />
         <CategoryBlogs type={category} allPostsByCategory />
      </>
   );
};
