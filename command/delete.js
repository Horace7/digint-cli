'use strict'

const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
 
module.exports = () => {
    co(function *() {
        let code = yield prompt('请输入校验码: ')
        if (!code || code !== 'Horace') {
            console.log(chalk.red('校验码错误,请联系gutouya@163.com'))
            process.exit()
        }
        let tplName = yield prompt('输入要删除的模板名称: ')
 
        if (config.tpls[tplName]) {
            config.tpls[tplName] = undefined
        } else {
            console.log(chalk.red('模板不存在!'))
            process.exit()
        }
        
        fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
            if (err) console.log(err)
            console.log(chalk.green('\n模板删除成功!\n'))
            console.log(chalk.grey('最新模板列表: \n'))
            console.log(config)
            console.log('\n')
            process.exit()
        })
    })
}