import { useParams } from "react-router-dom";
import { FeaturedBlogs } from "../components/FeaturedBlogs";

export const CategoryModal = () => {
   const { category } = useParams();

   return (
      <>
         <FeaturedBlogs category={category} />
      </>
   );
};
