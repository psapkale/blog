const prisma = require("../../db/prisma");

const getLatestBlogs = async (req, res) => {
   const { offset } = req.params;

   try {
      if (!offset) {
         throw new Error("Offset not provided");
      }

      const blogs = await prisma.blog.findMany({
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
   getLatestBlogs,
};
