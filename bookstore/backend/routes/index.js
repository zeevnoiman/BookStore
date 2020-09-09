const fs = require('fs');
const path = require('path');

// This file is for importing just in one line on the server every router file

module.exports = app => {
    fs
        .readdirSync(__dirname)
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== 'index.js')))
        .forEach(file => require(path.resolve(__dirname, file))(app));
};