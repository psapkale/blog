const prisma = require("../../db/prisma");
const { validateCategories } = require("../../utils/validation");

const getBlogsByCategory = async (req, res) => {
   const { categoryName } = req.params;

   try {
      if (!validateCategories([categoryName])) {
         throw new Error("Invalid category provided");
      }

      const blogs = await prisma.blog.findMany({
         where: {
            categories: {
               some: {
                  category: {
                     name: categoryName,
                  },
               },
            },
         },
      });

      if (!blogs) {
         throw new Error("Blogs not found");
      }

      res.status(200).json({ blogs });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

module.exports = {
   getBlogsByCategory,
};
