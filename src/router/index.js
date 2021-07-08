import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/byline'
    },
    {
      path: '/',
      component: () => import('../components/Home.vue'),
      meta: { title: '下載頁面' },
      children: [
        {
          path: '/charts',
          component: () => import('../components/Charts.vue'),
          meta: { title: '首頁' }
        },
        {
          path: '/uploadexcel',
          component: () => import('../components/Upload.vue'),
          meta: { title: '上傳excel' }
        },
        {
          path: '/byline',
          component: () => import('../components/ByLine.vue'),
          meta: { title: '個產線產出推移' }
        },
        {
          path: '/bymonth',
          component: () => import('../components/Bymonth.vue'),
          meta: { title: '产出月报' }
        },
        {
          path: "/infomanage",
          component: () => import('../components/Infomanage.vue'),
          meta: { title: "資料維護" }
        },
        {
          path: '/searchbyday',
          component: () => import('../components/Searchbyday.vue'),
          meta: { title: '產量查詢' }
        },
        {
          path: '/excelform',
          component: () => import('../components/ExcelForm.vue'),
          meta: { title: 'Excel' }
        },
        {
          path: '/total',
          component: () => import('../components/Total.vue'),
          meta: { title: '產出匯總' }
        },
        {
          path: "/summary",
          component: () => import("../components/Summary.vue"),
          meta: { title: "总计" }
        },
        {
          path: '/routepage',
          component: () => import('../components/Total.vue'),
          meta: { title: '產出匯總' }
        },
        {
          path: "/omhighchart",
          component: () => import('../components/OMhighcharts.vue'),
          meta:{title:"OM产出推移"}
        },
      ]
    },
  ]
})

