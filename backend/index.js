const todos   = require("./routes/todos");
const express = require("express");
const cors    = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/todos", todos);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    
    return;
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});