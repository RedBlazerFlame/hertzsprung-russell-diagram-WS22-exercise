// Declaring Variables and Constants
const PORT = process.env.PORT || 4000;
const OPTIONS = {
    root: __dirname
};
// Express
const express = require("express");
const app = express();
// Set-up express app
app.use(express.static(`${__dirname}/docs`));
app.get("/scripts/:fileName", (req, res) => {
    res.sendFile(`scripts/${req.params.fileName}.js`, Object.assign(Object.assign({}, OPTIONS), { "content-type": "text/js" }));
});
// Create HTTP server
const http = require("http");
const httpServer = http.createServer(app);
// Listen to a port
httpServer.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
