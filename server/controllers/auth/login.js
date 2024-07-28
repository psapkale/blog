const prisma = require("../../db/prisma");

const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await prisma.user.findUnique({
         where: {
            email,
         },
      });

      if (!user) {
         throw new Error("User not found");
      }

      if (user.password !== password) {
         throw new Error("Incorrect Password");
      }

      res.status(200).json({
         user,
      });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

module.exports = {
   login,
};
