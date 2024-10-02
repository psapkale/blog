export const HeroHeader = ({ content, isHeroHeader }) => {
   return (
      <div
         className={`${
            isHeroHeader ? "hidden" : "flex"
         } w-full h-[44vh] bg-black flex items-center justify-center`}
      >
         {/* <div className="w-[66%] h-fit mx-auto text-[#fff] text-[4rem]"> */}
         {/* Blog.Dev(Technology) */}
         {content}
         {/* </div> */}
      </div>
   );
};
