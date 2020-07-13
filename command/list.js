'use strict'
const config = require('../templates')
const chalk = require('chalk')
 
module.exports = () => {
    const templates = config.tpls
    for (let tpl in templates) {
        console.log(
            '  ' + chalk.yellow('★') +
            '  ' + chalk.blue(tpl) +
            ' - ' + templates[tpl].desc
        )
    }
    process.exit()
}