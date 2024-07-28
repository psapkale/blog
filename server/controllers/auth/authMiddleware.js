const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
   const authHeaders = req.headers.authorization;

   if (!authHeaders) {
      throw new Error("No token provided, authorization denied");
   }

   try {
      const token = authHeaders.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userEmail = decoded.email;
      next();
   } catch (err) {
      res.status(401).json({ error: "Token is not valid" });
   }
};
module.exports = {
   authMiddleware,
};
