/**
 * 路由通用类
 * author by kairry 2017年11月20日
 */
const Index = resolve => require(['@/views/index/Index'], resolve)


let  routes = [
    {
      path: "*",
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      meta: {
        title: '借玩具'
      },
    },
  ]

  export default routes;

