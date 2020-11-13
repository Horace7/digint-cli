'use strict'

const ora = require('ora')
const inquirer = require('inquirer')
const config = require('../templates')
const chalk = require('chalk')
const download = require('download-git-repo')

const templates = config.tpls

let tempNames = []

for (let temp in templates) {
    tempNames.push(temp)
}

let promptList = [
    {
      type: 'list',
      message: '请选择模版',
      name: 'tplName',
      choices: tempNames
    },
    {
      type: 'input',
      message: '请输入项目名称：',
      name: 'projectName',
      validate (val) {
        if (val !== '') {
          return true
        }
        return '项目名称不能为空'
      }
    }
  ]
module.exports = () => {
    inquirer.prompt(promptList).then(answers => {

        let ind = templates[answers.tplName],
            gitUrl = `direct:${ind.url}`,
            defaultUrl = './',
            projectUrl = `${defaultUrl}/${answers.projectName}`,
            spinner = ora(chalk.underline('\n 开始创建项目，请等待...'))

        spinner.color = 'yellow'
        spinner.start();
        download(gitUrl, projectUrl, {clone: true},(error) => {
          spinner.stop();
          if (error) {
            console.log('模版下载失败……')
            console.log(error)
            process.exit()
          }
          console.log(chalk.green(`\n √ ${answers.projectName} 项目创建成功!`))
          console.log(`\n cd ${answers.projectName} && npm install \n`)
        })
    })
}
