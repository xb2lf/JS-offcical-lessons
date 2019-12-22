const fs = require('fs');
let index = 0;
fs.mkdir('www/tree' + index++, { recursive: true }, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("目录创建成功。");
})