<template>
  <van-tab title="推荐" fixed>
      <Tabb :pic-list="picList" />
    <van-panel title="热门歌单" desc status>
       <List :hot-list="hotList" />
    </van-panel>
    <van-panel title="热门视频" desc status>
       <vlist :mv-list="mvList" />
       
    </van-panel>
  </van-tab>
</template>
<script>
import List from "../components/List.vue";
import Tabb from "../components/Tabb.vue";
import Vlist from "../components/Vlist.vue";
export default {
  name: "find",
  data() {
    return {};
  },
  components: {
    List,
    Tabb, 
    Vlist
  },
  props: {
    picList: Array,
    hotList:Array,
    mvList:Array
 }
};
</script>