const prisma = require("../../db/prisma");
const { validateCategories } = require("../../utils/validation");

const createBlog = async (req, res) => {
   try {
      const email = req.userEmail;
      const { categories, title, content } = req.body;

      const user = await prisma.user.findUnique({
         where: {
            email,
         },
      });

      if (!user) {
         throw new Error("Failed to get user");
      }

      if (!title || !content) {
         throw new Error("Please provide title and content");
      }

      if (!categories || !validateCategories(categories)) {
         throw new Error("Invalid category provided");
      }

      const blog = await prisma.blog.create({
         data: {
            title,
            content,
            author: { connect: { id: user.id } },
            categories: {
               create: categories.map((category) => ({
                  category: {
                     connectOrCreate: {
                        where: { name: category },
                        create: { name: category },
                     },
                  },
               })),
            },
         },
      });

      if (!blog) {
         throw new Error("Failed to create a blog");
      }

      res.status(200).json({ blog });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

module.exports = {
   createBlog,
};
