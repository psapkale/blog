const prisma = require("../../db/prisma");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
   const { name, email, password } = req.body;

   try {
      if (!name || !email || !password) {
         throw new Error("Name or email or password not provided");
      }

      const existingUser = await prisma.user.findUnique({
         where: {
            email,
         },
      });

      if (existingUser) {
         throw new Error("User already exist with this email");
      }

      if (password.length < 8) {
         throw new Error("Password is weak");
      }

      const user = await prisma.user.create({
         data: {
            name,
            email,
            password,
         },
      });

      if (!user) {
         throw new Error("Failed to create user");
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET);

      res.status(200).json({
         token,
         email: user.email,
      });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

module.exports = {
   signin,
};
