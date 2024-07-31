const prisma = require("../../db/prisma");
const { validateCategories } = require("../../utils/validation");

const getLatestBlogsByCategory = async (req, res) => {
   const { category, offset } = req.params;

   try {
      if (!category) {
         throw new Error("Category not provided");
      }
      if (!offset) {
         throw new Error("Offset not provided");
      }
      if (!validateCategories([category])) {
         throw new Error("Invalid category provided");
      }

      const blogs = await prisma.blog.findMany({
         where: {
            categories: {
               some: {
                  category: {
                     name: category,
                  },
               },
            },
         },
         orderBy: {
            createdAt: "desc",
         },
         include: {
            categories: {
               include: {
                  category: true,
               },
            },
         },
      });

      if (!blogs) {
         throw new Error("Blogs not found");
      }

      const latestBlogs =
         blogs.length < offset ? blogs : blogs.slice(0, offset);

      res.status(200).json({ latestBlogs });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

module.exports = {
   getLatestBlogsByCategory,
};
