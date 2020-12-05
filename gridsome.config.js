// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config
const fs = require('fs')
// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const data = (fs.readFileSync('./static/configuration.json','utf-8'))
module.exports = {
  titleTemplate:`${JSON.parse(data).htmlTitle} - %s`,
  templates:{
    // new:[{
    //     path:'/new/:id',
    //     component:'./src/templates/new.vue'
    //  }]
  }
}
