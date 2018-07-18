const hexoFs = require('hexo-fs')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const uuidv1 = require('uuid/v1')
const version = uuidv1()
const distPath = path.join(__dirname, '../../public/')

const config = hexo.config
const moment = require('moment')
// exit事件有问题，不能确保public目录是否存在，尤其是在hexo clean之后
hexo.on('exit', () => {
  let { hexoCache: { ignoreRequestKeywords, version } } = config
  let data = {
    ignoreRequestKeywords: ignoreRequestKeywords ? JSON.stringify(ignoreRequestKeywords) : JSON.stringify([])
  }
  if (version) {
    data.version = moment(version).format('YYYYMMDDHHmm')
  } else {
    data.version = moment().format('YYYYMMDDHHmm')
  }
  try {
    let files = hexoFs.listDirSync(distPath, { ignoreHidden: true }).filter(url=>{
       if (url==='CNAME' || url === 'sw.js') return false
       return true
    })
    data.cacheList = JSON.stringify(files)
  } catch (err) {
    console.error(err.message)
    throw Error('读取文件列表失败')
  }
  ejs.renderFile(path.join(__dirname, './sw.ejs'), data, (err, str) => {
    if (err) {
      console.log(err)
    } else {
      hexoFs.writeFileSync(path.join(distPath, './sw.js'), str)
      console.log('sw.js 文件已生成')
    }
  })
})
