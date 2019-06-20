import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/pages/welcome/Welcome'
import Exhibition from '@/pages/exhibition/Exhibition'
import ExhibitionAll from '@/pages/exhibition/ExhibitionAll'
import ExhibitionShow from '@/pages/exhibition/ExhibitionShow'
import Link from '@/pages/link/Link'
import About from '@/pages/about/About'
import Home from '@/pages/home/Home'
import Articles from '@/pages/articles/Articles'
import All from '@/pages/articles/ArticlesAll'
import Life from '@/pages/articles/ArticlesLife'
import Technology from '@/pages/articles/ArticlesTechnology'
import Show from '@/pages/articles/ArticlesShow'
import BackStage from '@/pages/backstage/BackStage'
import NewArticle from '@/pages/backstage/components/NewArticle'
import NewProject from '@/pages/backstage/components/NewProject'
import DressUp from '@/pages/backstage/components/DressUp'

Vue.use(Router)

export default new Router({
  // savedPosition当且仅当通过浏览器的前进/后退按钮触发时才可用
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/exhibition',
      name: 'Exhibition',
      component: Exhibition,
      redirect: '/exhibition/all',
      children: [{
        path: 'all',
        name: 'ExhibitionAll',
        component: ExhibitionAll
      }, {
        path: 'show',
        name: 'ExhibitionShow',
        component: ExhibitionShow
      }]
    },
    {
      path: '/link',
      name: 'Link',
      component: Link
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles,
      children: [{
        path: 'all',
        name: 'ArticlesAll',
        component: All
      }, {
        path: 'life',
        name: 'ArticlesLife',
        component: Life
      }, {
        path: 'technology',
        name: 'ArticlesTechnology',
        component: Technology
      }, {
        path: 'show',
        name: 'ArticlesShow',
        component: Show
      }]
    },
    {
      path: '/backstage',
      name: 'BackStage',
      component: BackStage,
      redirect: '/backstage/newArticle',
      children: [
        {
          path: 'newArticle',
          name: 'NewArticle',
          component: NewArticle
        },
        {
          path: 'newProject',
          name: 'NewProject',
          component: NewProject
        },
        {
          path: 'dressUp',
          name: 'DressUp',
          component: DressUp
        }
      ]
    }
  ]
})
