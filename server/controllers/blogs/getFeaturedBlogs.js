const prisma = require("../../db/prisma");

function featuredRes(blogs, count = 3) {
   let shuffled = blogs.slice(0);
   for (let i = blogs.length - 1; i > 0; i--) {
      let r = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[r]] = [shuffled[r], shuffled[i]];
   }
   return shuffled.slice(0, count);
}

const getFeaturedBlogs = async (req, res) => {
   try {
      const blogs = await prisma.blog.findMany({
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

      const featuredBlogs = blogs.length > 3 ? featuredRes(blogs) : blogs;

      res.status(200).json({ featuredBlogs });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

module.exports = {
   getFeaturedBlogs,
};
