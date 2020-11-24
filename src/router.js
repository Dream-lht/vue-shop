import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
const Login = () => import('components/Login')
const Home = () => import('components/Home')

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
    path:'/login',
    component:Login
    },
    {
      path:'/home',
      component:Home
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to,from,next) => {
  // 如果用户要访问的是login页面，直接放行
  if(to.path == '/login'){
    next()
  }
  if(from.path === '/login'){
    // 如果能获取到token的h话，那么就登录成功
    const tolenStr = window.sessionStorage.getItem('token')
    if(tolenStr){
      next()
    }else{
      next('login')
    }
  }
})
export default router