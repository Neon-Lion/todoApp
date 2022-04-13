const todos      = require("./routes/todos");
const connection = require("./db");
const cors       = require("cors");
const express    = require("express");
const app        = express();

connection();

app.use(express.json());
app.use(cors());

app.use("/todos", todos);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));