import Vue from 'vue'
import App from './App.vue'
import http from "axios"
import router from './router'
import store from './store'
Vue.prototype.$http = http;
// http.defaults.baseURL = 'https://api.iqimeng.com';
Vue.prototype.host="/api"
// Vue.prototype.host="https://api.iqimeng.com/"

Vue.config.productionTip = false
import LyricScroll from 'vue-lyric-scroll'
Vue.use(LyricScroll)
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import { Popup } from 'vant';
 
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