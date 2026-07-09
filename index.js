const express = require("express");
const fs = require("fs");

const app = express();

const API_KEY = process.env.API_KEY;

app.get("/", (req, res) => {
    res.status(403).send("Access Denied");
});

app.get("/script", (req, res) => {
    const key = req.query.key;
    const ua = req.get("User-Agent") || "";
    
    if (ua.includes("Mozilla")) {
        return res.status(403).send("Access Denied");
    }

    if (key !== API_KEY) {
        return res.status(403).send("Forbidden");
    }

    try {
        const script = fs.readFileSync("main.lua", "utf8");
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Cache-Control", "no-store");
        res.send(script);
    } catch (err) {
        console.error(err);
        res.status(500).send("Script not found.");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
