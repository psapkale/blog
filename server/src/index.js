const express = require("express");
const cors = require("cors");
const { signin } = require("../controllers/auth/signin");
const { login } = require("../controllers/auth/login");
const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Blog Server"));
app.post("/signin", signin);
app.post("/login", login);

app.listen(port, () => console.log(`Server listening on port: ${port}`));
