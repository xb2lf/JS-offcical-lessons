const fs = require('fs');

//  写入文件

fs.writeFile('www/2.txt','hello world',function(error) {
    if(error) {
        console.log('写入失败');
    }
})