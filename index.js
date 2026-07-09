const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
    res.send("SeiHub API Online");
});

app.get("/script", (req, res) => {
    try {
        const script = fs.readFileSync("main.lua", "utf8");
        res.setHeader("Content-Type", "text/plain");
        res.send(script);
    } catch (err) {
        res.status(500).send("Script not found.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
