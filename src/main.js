import Vue from 'vue'
import App from './App.vue'
import http from "axios"
import router from './router'
import store from './store'
Vue.prototype.$http = http;
// http.defaults.baseURL = 'https://api.iqimeng.com';
Vue.prototype.host="api"
// Vue.prototype.host="https://api.iqimeng.com/"

Vue.config.productionTip = false
import LyricScroll from 'vue-lyric-scroll'
Vue.use(LyricScroll)
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload,Popup } from 'vant';
import Carousel3d from 'vue-carousel-3d';

Vue.use(Carousel3d);
 
 
 
Vue.use(Popup);
 

Vue.use(Lazyload,{
   
});

import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)


 

Vue.use(Vant);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
