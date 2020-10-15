<template>
  <van-row gutter="5" justify="space-between" style="margin:5px">
    <van-col v-for="item in mvList" :key="item.id" span="12">
      <router-link tag="div" :to="'/mv/'+item.id" :name="item.name">
        <van-image
          height="100"
          lazy-load
          :src="item.cover+'?param=320y180'"
          :loading-icon="require('../assets/loading.gif')"
        />
        <div class="van-ellipsis" style="font-size:12px;line-height:16px;">
          <span>{{item.name}}-{{item.artistName}}</span>
        </div>
      </router-link>
    </van-col>
  </van-row>
</template>
<script>
export default {
  name: "Vlist",
  props: {
    mvList: {
      type: Array
    }
  },
  methods: {}
};
</script>>