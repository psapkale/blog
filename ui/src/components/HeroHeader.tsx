interface HeroHeaderProps {
   content: React.ReactNode;
   isHeroHeader: boolean;
}

export const HeroHeader = ({ content, isHeroHeader }: HeroHeaderProps) => {
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
