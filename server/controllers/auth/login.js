const prisma = require("../../db/prisma");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      if (!email || !password) {
         throw new Error("Email or password not provided");
      }

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

      const token = jwt.sign({ email }, process.env.JWT_SECRET);

      res.status(200).json({
         token,
      });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

module.exports = {
   login,
};
