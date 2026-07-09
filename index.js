const express = require("express");
const fs = require("fs");

const app = express();

const API_KEY = process.env.API_KEY;

app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SeiHub</title>
<style>
body{
    margin:0;
    background:#111;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    font-family:Arial,sans-serif;
}
.box{
    text-align:center;
}
h1{
    font-size:40px;
}
p{
    color:#999;
}
</style>
</head>
<body>
<div class="box">
<h1>SeiHub API</h1>
<p>Server is running.</p>
</div>
</body>
</html>
`);
});

app.get("/script", (req, res) => {
    if (req.query.key !== API_KEY) {
        return res.status(404).send("Not Found");
    }

    try {
        const script = fs.readFileSync("main.lua", "utf8");
        res.setHeader("Content-Type", "text/plain");
        res.send(script);
    } catch {
        res.status(500).send("Internal Server Error");
    }
});

app.use((req, res) => {
    res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
