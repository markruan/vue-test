import Vue from 'vue'
import App from './App.vue'
import http from "axios"
import router from './router'
import store from './store'
import apiConfig from './config/api.config'

Vue.prototype.$http = http;
console.log(apiConfig)
http.defaults.baseURL = apiConfig;
http.defaults.withCredentials = true;
Vue.prototype.host=""
 

Vue.config.productionTip = false
import LyricScroll from 'vue-lyric-scroll'
Vue.use(LyricScroll)
// import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload,Popup,Image,Button,NavBar,List,Cell,CellGroup,Tab,Tabs,Loading,Grid,GridItem,Icon,Swipe,SwipeItem } from 'vant';
import Carousel3d from 'vue-carousel-3d';

Vue.use(Carousel3d);
 
Vue.use(Image);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Loading);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);

 
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


 

// Vue.use(Vant);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
