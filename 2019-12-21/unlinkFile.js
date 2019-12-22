const fs = require('fs');

// 删除文件
fs.unlink('www/2.txt',function(err,fd) {
    if(err) {
        return console.log(err);
    }
})