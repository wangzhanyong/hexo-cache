const hexoFs = require('hexo-fs');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const version = require('../../package.json').version;

hexo.on('generateAfter', () => {
    const distPath = path.join(__dirname, '../../public/');
    try {
        let files = hexoFs.listDirSync(distPath, {ignoreHidden: true});
        ejs.renderFile(path.join(__dirname, './sw.js'), {cacheList: files, version: version || 1}, (err, str) => {
            if (err) {
                console.log(err);
            } else {
                hexoFs.writeFileSync(path.join(distPath, './sw.js'), str);
            }
        });
    } catch (err) {
        console.error(err.message);
    }
})
