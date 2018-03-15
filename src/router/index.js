/**
 * 路由通用类
 * author by kairry 2017年11月20日
 */


import HelloWorld from '@/components/HelloWorld'


//点餐项目模块
const Auth = resolve => require(['@/views/order/auth/Auth'], resolve)
const Index = resolve => require(['@/views/order/index/Index'], resolve)
const Dish = resolve => require(['@/views/order/dish/Dish'], resolve)
const Error = resolve => require(['@/views/order/error/Error'], resolve)
const Cart = resolve => require(['@/views/order/cart/Cart'], resolve)
const List = resolve => require(['@/views/order/list/List'], resolve)
const Pay = resolve => require(['@/views/order/pay/Pay'], resolve)
const Init = resolve => require(['@/views/order/init/Init'], resolve)
const Personal = resolve => require(['@/views/order/personal/Personal'], resolve)
const Success = resolve => require(['@/views/order/success/Success'], resolve)
const Login = resolve => require(['@/views/order/login/Login'], resolve)

//公众号项目模块

//优惠券
const Coupon = resolve => require(['@/views/public/coupon/Index'], resolve)

let  routes = [
    {
      path: '/demo',
      component: HelloWorld
    },
    {
      path: "*",
      redirect: '/auth'
    },
    {
      path: '/auth',
      component: Auth,
      name:'Auth',
      meta: {
        title: '授权中'
      }
    },
    {
      path: '/error',
      component: Error,
      name:'Error',
      meta: {
        title: '异常信息'
      }
    },
    {
      path: '/index',
      component: Index,
      meta: {
        title: '自助点餐'
      },
      children: [
        {
          path: ':id',
          component:Dish,
          name:'Dish'
        }
      ]
    },
    {
      path: '/coupon',
      component: Coupon,
      name:'Coupon',
      meta: {
        title: '优惠券列表'
      }
    },
    {
      path: '/cart',
      component: Cart,
      name:'Cart',
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/list',
      component: List,
      name:'List',
      meta: {
        title: '订单列表'
      }
    },
    {
      path: '/pay',
      component: Pay,
      name:'Pay',
      meta: {
        title: '结账'
      }
    },
    {
      path:'/personal',
      component: Personal,
      name:'Personal',
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/init',
      component: Init,
      name:'Init',
      meta: {
        title: '自助点餐'
      }
    },
    {
      path: '/success',
      component: Success,
      name:'Success',
      meta: {
        title: '完成'
      }
    },
    {
      path: '/login',
      component: Login,
      name:'Login',
      meta: {
        title: '会员登录'
      }
    }
  ]

  export default routes;

