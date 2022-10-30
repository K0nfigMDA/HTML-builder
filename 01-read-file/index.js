const path = require('path')
const fs = require('fs')
const ourPath = path.join(__dirname, 'text.txt')
const stream = fs.createReadStream(ourPath, 'utf-8');

let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log(error.message));

