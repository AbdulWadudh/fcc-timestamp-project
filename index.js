// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});

app.get("/api/:rawDate", function (req, res) {
    const { rawDate } = req.params;

    // Checking if Date is coming in String or in Timestamp & Parsing it Accordingly.
    const unixDate = rawDate.includes("-") ? Date.parse(rawDate) : parseInt(rawDate);

    // Again Checking and Converting the Date to UTC based on the Date Recived.
    const uTCDate = new Date(rawDate.includes("-") ? rawDate : rawDate * 1).toUTCString();

    //Based on the Validatation Sending the Response.
    if ([uTCDate, unixDate].includes("Invalid Date")) {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({ unix: unixDate, utc: uTCDate });
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 4000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
