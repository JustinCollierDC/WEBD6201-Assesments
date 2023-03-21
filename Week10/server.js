"use strict";

const fs = require('fs');
const fsPromises = fs.promises;

import {getData} from "./user.data.js"

getData()
    .then(function (data)
    {
        console.log(data);
    }).catch(function(err) {
    console.error("Error: user data not returned");
});

module.exports = async function() {
    fs.readFile("./data/user.json", "utf-8", function(err, data) {

        if(err)
        {
            console.error(err.message)
        }
        console.log(data);
    });
}