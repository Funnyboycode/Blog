import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 存放所有组件都可以共享的数据
    loginUser: localStorage.getItem('user'),
    projectlist: JSON.parse(localStorage.getItem('projectlist')),
    articlelist: JSON.parse(localStorage.getItem('articlelist'))
  },
  // 放置同步修改state数据的方法
  mutations: {
    // 保存登录用户数据
    saveLoginUser (state, value) {
      state.loginUser = value
      localStorage.setItem('user', value)
    },
    // 保存从数据库获取的项目数据
    saveProjectList (state, value) {
      state.projectlist = value
      localStorage.setItem('projectlist', JSON.stringify(value))
    },
    // 保存从数据库获取的文章数据
    saveArticleList (state, value) {
      state.articlelist = value
      localStorage.setItem('articlelist', JSON.stringify(value))
    },
    // 对项目和文章数据根据不同条件进行排序
    saveDataSort (state, value) {
      switch (value.sorttype) {
        case 'timedown':
          state[value.type] = value.data.sort(function (a, b) {
            return a.date < b.date ? 1 : -1
          })
          break
        case 'timeup':
          state[value.type] = value.data.sort(function (a, b) {
            return a.date > b.date ? 1 : -1
          })
          break
        case 'visitdown':
          state[value.type] = value.data.sort(function (a, b) {
            return b.visit - a.visit
          })
          break
        case 'visitup':
          state[value.type] = value.data.sort(function (a, b) {
            return a.visit - b.visit
          })
          break
      }
      localStorage.setItem(value.type, JSON.stringify(state[value.type]))
    },
    // 清除登录用户的缓存数据
    cleanLoginUser (state, value) {
      localStorage.setItem('user', '')
      state.loginUser = ''
    }
  },
  // 放置异步修改state数据的方法
  actions: {
    // 从数据库获取项目数据
    getProjectList (cxt) {
      axios.get('/api/projectlist').then(res => {
        cxt.commit('saveProjectList', res.data)
      })
    },
    // 从数据库获取文章数据
    getArticleList (cxt) {
      axios.get('/api/articlelist').then(res => {
        cxt.commit('saveArticleList', res.data)
      })
    },
    // 文章或项目被访问后对访问量进行累加的操作
    addVisit (cxt, value) {
      axios.post('/api/addVisit', value).then(res => {
        if (!res.data.error) {
          console.log('访问量正常加1')
        }
      })
    },
    // 排序前先获取数据
    dataSort (cxt, value) {
      if (value[1].indexOf('articles') > -1) {
        axios.get('/api/articlelist').then(res => {
          cxt.commit('saveDataSort', {data: res.data, type: 'articlelist', sorttype: value[0]})
        })
      }
      if (value[1].indexOf('exhibition') > -1) {
        axios.get('/api/projectlist').then(res => {
          cxt.commit('saveDataSort', {data: res.data, type: 'projectlist', sorttype: value[0]})
        })
      }
    }
  }
  // getters: {
  //   oldUser: (state) => {
  //     return state.projectlist.filter(user => user.age > 30)
  //   }
  // }
})
