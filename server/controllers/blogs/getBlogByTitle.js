const prisma = require("../../db/prisma");

const getBlogByTitle = async (req, res) => {
   const { title } = req.params;

   try {
      if (!title) {
         throw new Error("Title not provided");
      }

      const blog = await prisma.blog.findFirst({
         where: {
            title,
         },
         include: {
            author: {
               select: {
                  id: true,
                  name: true,
                  email: true,
               },
            },
            categories: {
               include: {
                  category: true,
               },
            },
         },
      });

      if (!blog) {
         throw new Error("Blog not found");
      }

      res.status(200).json({ blog });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

module.exports = {
   getBlogByTitle,
};
