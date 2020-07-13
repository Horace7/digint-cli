'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
 
module.exports = () => {
 co(function *() {
 
   let tplName = yield prompt('模板名称: ')
   let gitUrl = yield prompt('Git链接: ')
   let desc = yield prompt('模板描述: ')
    
   if (!config.tpls[tplName]) {
     config.tpls[tplName] = {}
     config.tpls[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') // 过滤unicode字符
     config.tpls[tplName]['desc'] = desc
   } else {
     console.log(chalk.red('模板已存在!'))
     process.exit()
   }
   
   fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
     if (err) console.log(err)
     console.log(chalk.green('\n模板创建成功!\n'))
     console.log(chalk.grey('最新模板列表: \n'))
     console.log(config)
     console.log('\n')
     process.exit()
    })
 })
}