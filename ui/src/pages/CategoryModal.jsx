import { useParams } from "react-router-dom";
import { FeaturedBlogs } from "../components/FeaturedBlogs";
import { CategoryBlogs } from "../components/CategoryBlogs";
import { HeroHeader } from "../components/HeroHeader";
import { useColors } from "../utils/useColors";

const HeroContent = ({ text, color = "#fff" }) => {
   return (
      <div className="w-[94%] sm:w-[66%] h-fit mx-auto font-bold text-[2rem] sm:text-[3.6rem] text-white">
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
   const { colors, index } = useColors();

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
