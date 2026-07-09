const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");

const app = express();

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    console.error("FATAL: API_KEY environment variable is required");
    process.exit(1);
}

function safeCompare(a, b) {
    const bufA = Buffer.from(String(a || ""));
    const bufB = Buffer.from(String(b || ""));
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}

const scriptLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests"
});

app.get("/", (req, res) => {
    res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SeiHub API</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0f0f0f;color:#fff;font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;}
.card{text-align:center;padding:40px;border-radius:15px;background:#1a1a1a;box-shadow:0 0 20px rgba(0,0,0,.5);}
h1{font-size:40px;color:#8b5cf6;}
p{margin-top:10px;color:#aaa;}
</style>
</head>
<body><div class="card"><h1>SeiHub API</h1><p>API Server Online</p></div></body>
</html>`);
});

app.get("/script", scriptLimiter, (req, res) => {
    const authHeader = req.headers.authorization || "";
    const providedKey = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : req.query.key;

    if (!safeCompare(providedKey, API_KEY)) {
        return res.status(404).send("Not Found");
    }

    if (!fs.existsSync("./main.lua")) {
        return res.status(500).send("main.lua not found");
    }

    res.type("text/plain");
    res.send(fs.readFileSync("./main.lua", "utf8"));
});

app.use((req, res) => {
    res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
