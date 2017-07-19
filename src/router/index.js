import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'
import  '../common/stylus/index.styl';

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'index',
    component:App,
    children:[
      {path:'/goods',component:goods},
      {path:'/ratings',component:ratings},
      {path:'/seller',component:seller},
    ]
  }
]
export default new Router({
  'linkActiveClass':'active',
  routes
})

