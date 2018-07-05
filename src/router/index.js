/**
 * 路由通用类
 * author by kairry 2017年11月20日
 */
const Index = resolve => require(['@/views/index/Index'], resolve)

const Auth = resolve => require(['@/views/auth/Auth'], resolve)
const Init = resolve => require(['@/views/init/Init'], resolve)
const TimingList = resolve => require(['@/views/timing/List'], resolve)
const TimingEdit = resolve => require(['@/views/timing/Edit'], resolve)
const Set = resolve => require(['@/views/set/Index'], resolve)
const DevInfo = resolve => require(['@/views/set/DevInfo'], resolve)
const Share = resolve => require(['@/views/set/Share'], resolve)
const Data = resolve => require(['@/views/set/Data'], resolve)
const Battery = resolve => require(['@/views/set/Battery'], resolve)
const Config = resolve => require(['@/views/set/Config'], resolve)
const List = resolve => require(['@/views/list/Index'], resolve)


let  routes = [
    {
      path: "*",
      redirect: '/init'
    },
    {
      path: '/auth',
      component: Auth,
      meta: {
        title: ''
      },
    },
    {
      path: '/init',
      component: Init,
      meta: {
        title: ''
      },
    },
    {
      path: '/index',
      component: Index,
      meta: {
        title: ''
      },
    },
    {
      path: '/timinglist',
      component: TimingList,
      meta: {
        title: ''
      }
    },
    {
      path: '/timingedit',
      component: TimingEdit,
      meta: {
        title: ''
      },
    },
    {
      path: '/set',
      component: Set,
      meta: {
        title: ''
      }
    },
    {
      path: '/devinfo',
      component: DevInfo,
      meta: {
        title: ''
      }
    },
    {
      path: '/share',
      component: Share,
      meta: {
        title: ''
      }
    },
    {
      path: '/data',
      component: Data,
      meta: {
        title: ''
      }
    },
    {
      path: '/battery',
      component: Battery,
      meta: {
        title: ''
      }
    },
    {
      path: '/config',
      component: Config,
      meta: {
        title: ''
      }
    },
    {
      path: '/list',
      component: List,
      meta: {
        title: '设备列表'
      }
    }
  ]

  export default routes;

