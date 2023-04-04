// Code Sourced From: https://nodejs.org/en/docs/guides/getting-started-guide

"use strict"
// New express code
import express from 'express';
const app = express();  // Create application

import path from 'path';
app.set("views", path.join(__dirname, "./views/"));
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;
const router = express.Router();

app.use(router);
app.use(express.static(path.join(__dirname, "./client/")));

router.get('/', function(req, res, next){
   res.render('index', {title: "Home Page"});
   next();
});

app.listen(port, function(){
    console.log(`Server listening on port ${port}`)
});

app.use(function(req, res, next){
    console.log(req.url);
    next();
})

export default app;

// OLD server.ts CODE
/*
//const http = require('http');
import http from 'http';
import fs from 'fs';
import mime from 'mime-types';

// Below is for fixing '__dirname not defined error' - Source: https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from 'path';
import { fileURLToPath } from 'url';
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let lookup = mime.lookup;

//const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) =>
{
    let path : string = req.url as string;
    console.log(__dirname);
    console.log(path);

    if(path === "/" || path === "/home")
    {
        path = "/index.ejs";
    }

    let mime_type : string = lookup(path.substring(1)) as string;
    console.log("mime-type: " + mime_type);

    fs.readFile(__dirname + path, function(err, data)
    {
        if(err)
        {
            res.writeHead(404);
            res.end("Error 404 - File Not Found " + err.message);
            return;
        }
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.writeHead(200, {'Content-Type': mime_type});
        res.end(data);
    });
});

server.listen(port, () => {
    console.log(`Server running at ${port}/`);
});

*/