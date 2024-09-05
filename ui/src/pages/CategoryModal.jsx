import { useParams } from "react-router-dom";
import { FeaturedBlogs } from "../components/FeaturedBlogs";
import { CategoryBlogs } from "../components/CategoryBlogs";

export const CategoryModal = () => {
   const { category } = useParams();

   return (
      <>
         <FeaturedBlogs category={category} />
         <CategoryBlogs type={category} allPostsByCategory />
      </>
   );
};
