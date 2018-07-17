const hexoFs = require('hexo-fs')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const uuidv1 = require('uuid/v1')
const version = uuidv1()

const distPath = path.join(__dirname, '../../public/')

hexo.on('exit', () => {
  let data = {
    version
  }
  try {
    let files = hexoFs.listDirSync(distPath, { ignoreHidden: true })
    data.files = JSON.stringify(files)
  } catch (err) {
    console.error(err.message)
    throw Error('读取文件列表失败')
  }
  ejs.renderFile(path.join(__dirname, './sw.ejs'), data, (err, str) => {
    if (err) {
      console.log(err)
    } else {
      hexoFs.writeFileSync(path.join(distPath, './sw.js'), str)
    }
  })
})
