// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import DefaultLayout from '~/layouts/Default.vue'
import Element from 'element-ui'
import util from './utils/util'
import 'element-ui/lib/theme-chalk/index.css'
import dayjs from 'dayjs'
export default function (Vue, { router, head, isClient }) {
  Vue.prototype.$util = util
  Vue.prototype.$share = function (message) {
    if (!message) {
      message = window.location
    } else {
      let arr = (window.location + "").split("#")
      message = arr[0] + "#" + message
    }
    if (util.copy(message)) {
      Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'success'
      })
    } else {
      Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'warning'
      })
    }
  }
  Vue.use(Element)
  Vue.filter('formatDate', function (date) {
    if (!date) {
      return '---';
    }
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss'); // 使用 dayjs 格式化时间
  })
  // Set default layout as a global component
  Vue.mixin({
    data() {
      return {
        baseUrl: process.env.GRIDSOME_API_URL,
      }
    }
  })
  Vue.component('Layout', DefaultLayout)
}
