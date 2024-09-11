const prisma = require("../../db/prisma");

const getSearchBlog = async (req, res) => {
   const { q } = req.query;
   try {
      const blogs = await prisma.blog.findMany({
         where: {
            title: {
               contains: q,
               mode: "insensitive",
            },
         },
      });

      if (!blogs) {
         throw new Error("Failed to fetch blogs");
      }

      res.status(200).json({ blogs });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

module.exports = {
   getSearchBlog,
};
