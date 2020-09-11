'use strict'
const config = require('../templates')
const chalk = require('chalk')
 
module.exports = () => {
    const templates = config.tpls
    if (JSON.stringify(templates) === "{}") {
        console.log(chalk.redBright('暂无模板, 请先添加'))
        process.exit()
    }
    for (let tpl in templates) {
        console.log(
            '  ' + chalk.yellowBright('★') +
            '  ' + chalk.redBright(tpl) +
            ' - ' + chalk.whiteBright(templates[tpl].desc)
        )
    }
}