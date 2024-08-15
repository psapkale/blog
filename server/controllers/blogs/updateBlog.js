const prisma = require("../../db/prisma");

const updateBlog = async (req, res) => {
   const { title } = req.params;
   const { ...rest } = req.body;
   const userEmail = req.userEmail;

   try {
      if (!title) {
         throw new Error("Blog title not provided");
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
         },
      });

      if (!blog) {
         throw new Error("Blog not found");
      }

      if (blog.author.email !== userEmail) {
         throw new Error("Unauthorized");
      }

      // ! changing title will result in `Blog not found` after the change as it is used in the url on client-side
      const newBlog = await prisma.blog.update({
         where: blog,
         data: {
            ...rest,
         },
      });

      if (!newBlog) {
         throw new Error("Failed to update");
      }

      res.status(200).json({
         newBlog,
      });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

module.exports = {
   updateBlog,
};
