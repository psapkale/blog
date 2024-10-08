import { CategoryBlogs } from "../components/CategoryBlogs";
import { FeaturedBlogs } from "../components/FeaturedBlogs";
import { HeroHeader } from "../components/HeroHeader";
import { TypingWords } from "../components/TypingWords";

function HeroContent() {
   return (
      <div className="hidden sm:block w-[66%] text-[#fff] h-fit mx-auto text-[3.6rem]">
         Blog.Dev(
         <TypingWords />)
      </div>
   );
}

export const Hero = () => {
   return (
      <>
         <HeroHeader content={<HeroContent />} isHeroHeader />
         <FeaturedBlogs />
         <CategoryBlogs offset={6} />
         <CategoryBlogs type={"Application"} color="#b4dc19" offset={3} />
         <CategoryBlogs type={"FrontEnd"} color="#14c8eb" offset={3} />
         <CategoryBlogs type={"Infrastructure"} color="#c8aff0" offset={3} />
         <CategoryBlogs type={"Machine Learning"} color="#ffb9b0" offset={3} />
         <CategoryBlogs type={"Mobile"} color="#ff8c19" offset={3} />
         <CategoryBlogs type={"Security"} color="#b4c8e1" offset={3} />
         <CategoryBlogs type={"Culture"} color="#fa551e" offset={3} />
      </>
   );
};
