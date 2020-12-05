// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')
const fs = require('fs')
module.exports = function (api) {
  const baseUrl = process.env.GRIDSOME_API_URL
  api.loadSource(async ({ addCollection }) => {
    //1 头部基本信息
    const collection = addCollection('personal')
    const data = (fs.readFileSync('./static/configuration.json', 'utf-8'))
    const res = JSON.parse(data)
    collection.addNode(res)

    //2  最新动态
    const collection2 = addCollection('new')
    const result = await axios({
      url: baseUrl + "/users/hzy18/gists?page=1&per_page=1",
      type: 'get'
    })
    // console.log(result)
    const id = result.data[0].id
    const detail = await axios({
      url: baseUrl + "/gists/" + id,
      type: 'get'
    })
    const file = detail.data.files
    for (let key in file) {
      collection2.addNode({
        id: detail.data.id,
        title: key,
        content: detail.data.files[key]["content"],
        description: detail.data.description,
        updated_at: detail.data.updated_at,
        created_at: detail.data.created_at
      })
      break;
    }
    //3 社交圈
    const collection_1 = addCollection('base')
    const result_1 = await axios({
      url: baseUrl + "/users/hzy18",
      type: 'get'
    })
    collection_1.addNode(result_1.data)
    //粉丝
    const collection3 = addCollection('social_01')
    const result3 = await axios({
      url: baseUrl + "/users/hzy18/followers?page=1&per_page=9999999999999",
      type: 'get'
    })
    for (const item3 of result3.data) {
      collection3.addNode({
        id: item3.id,
        avatar_url: item3.avatar_url,
        html_url: item3.html_url,
        login: item3.login,

      })
    }
    //关注
    const collection3_2 = addCollection('social_02')
    const result3_2 = await axios({
      url: baseUrl + "/users/hzy18/following?page=1&per_page=9999999999999",
      type: 'get'
    })
    for (const item3_2 of result3_2.data) {
      collection3_2.addNode({
        id: item3_2.id,
        avatar_url: item3_2.avatar_url,
        html_url: item3_2.html_url,
        login: item3_2.login
      })
    }

    //博客列表
    {
      const collection4 = addCollection('blogList')
      const detail = await axios({
        url: baseUrl + "/users/hzy18/gists?page=1&per_page=9999999999999",
        type: 'get'
      })
      const file = detail.data.files
      console.log(detail)
      for (let item of detail.data) {
        for (let key in item.files) {
          collection4.addNode({
            id: item.id,
            title: key,
            content: item.files[key],
            description: item.description,
            updated_at: item.updated_at,
            created_at: item.created_at
          })
          break;
        }
      }

    }


    //开源项目
    {
      const collection5 = addCollection('repoList')
      const detail = await axios({
        url: baseUrl + "/users/hzy18/repos?page=1&per_page=9999999999999",
        type: 'get'
      })
      for (let item of detail.data) {
        collection5.addNode({
          id: item.id,
          name:item.name,
          forks_count:item.forks_count,
          watchers_count:item.watchers_count,
          stargazers_count:item.stargazers_count,
          description: item.description,
          updated_at: item.updated_at,
          created_at: item.created_at
        })
      }
  
    }
  


  })
  //社交圈详情  预渲染详情页面

  // Use the Pages API here: https://gridsome.org/docs/pages-api/
  api.createPages(async ({ createPage }) => {
    // createPage({
    //   path: '/user/social/details/:name',
    //   component: './src/templates/social.vue'
    // })
    // const res1 = await axios({
    //   url: baseUrl + "/users/hzy18/followers?page=1&per_page=9999999999999",
    //   type: 'get'
    // })
    // const res2 = await axios({
    //   url: baseUrl + "/users/hzy18/followers?page=1&per_page=9999999999999",
    //   type: 'get'
    // })
    // console.log(res1.data)
    // res1.data.forEach( async item => {
    //   const res = await axios({
    //     url: baseUrl + "/users/"+item.login,
    //     type: 'get'
    //   })
    //   createPage({
    //     path: `/user/social/details/${item.login}`,
    //     component: './src/templates/social.vue',
    //     context: {
    //       avatar_url: res.data.avatar_url,
    //       bio:  res.data.bio,
    //       login:res.data.login,
    //       name:res.data.name,
    //       blog:res.data.blog,
    //       location:res.data.location,
    //     }
    //   })
    // })
    // res2.data.forEach(async item => {
    //   const res = await axios({
    //     url: baseUrl + "/users/"+item.login,
    //     type: 'get'
    //   })
    //   createPage({
    //     path: `/user/social/details/${item.login}`,
    //     component: './src/templates/social.vue',
    //     context: {
    //       avatar_url: res.data.avatar_url,
    //       bio:  res.data.bio,
    //       login:res.data.login,
    //       name:res.data.name,
    //       blog:res.data.blog,
    //       location:res.data.location,
    //     }
    //   })
    // })



  })




}
