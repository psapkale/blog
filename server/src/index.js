const express = require("express");
const cors = require("cors");
const { signin } = require("../controllers/auth/signin");
const { login } = require("../controllers/auth/login");
const { createBlog } = require("../controllers/blogs/createBlog");
const { authMiddleware } = require("../controllers/auth/authMiddleware");
const { getBlogByTitle } = require("../controllers/blogs/getBlogByTitle");
const {
   getBlogsByCategory,
} = require("../controllers/blogs/getBlogsByCategory");
const { getFeaturedBlogs } = require("../controllers/blogs/getFeaturedBlogs");
const { getLatestBlogs } = require("../controllers/blogs/getLatestBlogs");
const {
   getLatestBlogsByCategory,
} = require("../controllers/blogs/getLatestBlogsByCategory");
const { updateBlog } = require("../controllers/blogs/updateBlog");
const { getSearchBlog } = require("../controllers/blogs/getSearchBlog");
const app = express();
const apiRouter = express.Router();

const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Blog Server"));

apiRouter.post("/signin", signin);
apiRouter.post("/login", login);
apiRouter.post("/create-blog", authMiddleware, createBlog);
apiRouter.get("/search", getSearchBlog);
apiRouter.get("/blog/:title", getBlogByTitle);
apiRouter.get("/all/:categoryName", getBlogsByCategory);
apiRouter.get("/featured", getFeaturedBlogs);
apiRouter.get("/latest", getLatestBlogs);
apiRouter.get("/latest/:offset", getLatestBlogs);
apiRouter.get("/:category/:offset", getLatestBlogsByCategory);
apiRouter.put("/update/:title", authMiddleware, updateBlog);

app.use("/api", apiRouter);

app.listen(port, () => console.log(`Server listening on port: ${port}`));
