#!/usr/bin/env node
/* Sinh lại index.html từ builder.js.
   - Nếu có content.json thì dùng nội dung trong đó
   - Nếu không thì dùng nội dung mặc định trong builder.js
   Chạy:  node build.js                                              */
const fs = require('fs');
const path = require('path');
const B = require('./builder.js');

const here = __dirname;
const contentPath = path.join(here, 'content.json');

let data = B.DEFAULT;
let source = 'nội dung mặc định trong builder.js';
if (fs.existsSync(contentPath)) {
  data = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  source = 'content.json';
}

fs.writeFileSync(path.join(here, 'index.html'), B.buildHTML(data), 'utf8');
console.log('Đã sinh index.html từ ' + source + '.');
