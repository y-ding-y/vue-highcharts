// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui' //element-ui的全部组件   
import store from './store'
import VueHighcharts from 'vue-highcharts'
import './assets/css/theme-green/index.css' // 浅绿色主题
import './assets/css/icon.css'
import Highcharts from 'highcharts'
import loadExporting from 'highcharts/modules/exporting'
import exportdata from 'highcharts/modules/export-data'
import drilldown from 'highcharts/modules/drilldown'
import jquery from 'jquery'
import XLSX from "xlsx";
import promise from 'es6-promise';
import moment from 'moment'
import html2canvas from 'html2canvas'


Vue.use(VueAxios, axios, XLSX, moment, html2canvas);
Vue.use(VueHighcharts);
promise.polyfill();
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
Vue.prototype.$ = jquery;
Vue.prototype.XLSX = XLSX;
loadExporting(Highcharts)
exportdata(Highcharts)
drilldown(Highcharts)
Vue.use(ElementUI, {
  size: 'small'
});//使用elementUI  


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {

  if (to.path == '/routepage') {
    //next('http://localhost:8084/#/2');
    window.location.href = 'http://10.98.5.58:9077';
  }
  else {
    next()
  }

});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');  