export const FeaturedBlogsShimmer = () => {
   return Array(3)
      .fill("")
      .map(() => (
         <div className="text-[10px] w-[33%] h-fit flex flex-col items-start">
            <div className="w-[96%] h-[196px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]"></div>
         </div>
      ));
};
