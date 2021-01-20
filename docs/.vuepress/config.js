const moment = require('moment');
module.exports = {


plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // Don't forget to install moment yourself
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ]
  ],


  title: "Arthur.io",
  description: "The description of the site.",
  head: [["link", { rel: "icon", href: `/logo.png` }]],
  dest: "./dist",
  base: "/docs/",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      //{ text: "Projects", link: "/projects/" },
      { text: "Guide", link: "/guide/" },
      //{ text: "GitHub", link: "https://github.com/leepand/" }
    ],
    sidebar: {
      '/guide/': genSidebarConfig('Guide')
    },
    displayAllHeaders: true, // 默认值：false
    lastUpdated: true,
    lastUpdated: '最近更新时间'
  },

  markdown: {
    anchor: { permalink: false },
    config: md => {
      md.use(require("markdown-it-katex"));
    }
  }
};

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'model_dev',
        'model_deploy',
      ]
    }
  


]
}

