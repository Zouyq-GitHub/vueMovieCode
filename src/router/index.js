import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import index from '@/page/index'

Vue.use(Router)

const index = r => require.ensure([], () => r(require('../page/index')), 'index')
const login = r => require.ensure([], () => r(require('../page/login')), 'login')
const register = r => require.ensure([], () => r(require('../page/register')), 'register')
const buy = r => require.ensure([], () => r(require('../page/buy')), 'buy')
const indexTitle = r => require.ensure([], () => r(require("../components/indexTitle")), "indexTitle");
const indexNavigation = r => require.ensure([], () => r(require("../components/indexNavigation")), "indexNavigation");
const indexImgPic = r => require.ensure([], () => r(require("../components/indexImgPic")), "indexImgPic");
const indexTheHit = r => require.ensure([], () => r(require("../components/indexTheHit")), "indexTheHit");
const premiereTheater = r => require.ensure([], () => r(require("../components/premiereTheater")), "premiereTheater");
const photoAlbum = r => require.ensure([], () => r(require("../components/photoAlbum")), "photoAlbum");
const indexBottom = r => require.ensure([], () => r(require("../components/indexBottom")), "indexBottom");
const buyTitle = r => require.ensure([], () => r(require("../components/buyTitle")), "buyTitle");
const buyData = r => require.ensure([], () => r(require("../components/buyData")), "buyData");
const buyUser = r => require.ensure([], () => r(require("../components/buyUser")), "buyUser");
const buyShop = r => require.ensure([], () => r(require("../components/buyShop")), "buyShop");
export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/index",
      name: "index",
      component: index
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/buy",
      name: "buy",
      component: buy
    },
    {
      path: "/indexNavigation",
      name: "indexNavigation",
      component: indexNavigation
    },
    {
      path: "/indexTitle",
      name: "indexTitle",
      component: indexTitle
    },
    {
      path: "/indexImgPic",
      name: "indexImgPic",
      component: indexImgPic
    },
    {
      path: "/indexTheHit",
      name: "indexTheHit",
      component: indexTheHit
    },
    {
      path: "/premiereTheater",
      name: "premiereTheater",
      component: premiereTheater
    },
    {
      path: "/photoAlbum",
      name: "photoAlbum",
      component: photoAlbum
    },
    {
      path: "/indexBottom",
      name: "indexBottom",
      component: indexBottom
    },
    {
      path: "/buyTitle",
      name: "buyTitle",
      component: buyTitle
    },
    {
      path: "/buyData",
      name: "buyData",
      component: buyData
    },
    {
      path: "/buyUser",
      name: "buyUser",
      component: buyUser
    },
    {
      path: "/buyShop",
      name: "buyShop",
      component: buyShop
    }
  ]
});
