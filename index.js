const express = require("express");
const fs = require("fs");

const app = express();

const API_KEY = "FreeFire598";

app.get("/", (req, res) => {
    res.send("SeiHub API Online");
});

app.get("/script", (req, res) => {
    const key = req.query.key;

    if (key !== API_KEY) {
        return res.status(403).send("Forbidden");
    }

    try {
        const script = fs.readFileSync("main.lua", "utf8");
        res.setHeader("Content-Type", "text/plain");
        res.send(script);
    } catch {
        res.status(500).send("Script not found.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});
