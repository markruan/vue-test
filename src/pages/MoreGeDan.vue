<template>
  <div>
    <van-nav-bar title="歌单广场" left-text="返回" @click-left="onClickLeft" left-arrow />

    <van-tabs v-model="active" sticky @change="indexChange" swipeable>
      <van-tab v-for="item in catList" :key="item.name" :title="item.name " animated>
        <van-loading v-if="isloading" type="circular" color="#1989fa" vertical />
        <van-grid v-else :column-num="3" :border="false">
          <van-grid-item v-for="value in geDanList" :key="value.id" :to="'/list/'+value.id">
            <van-image
              :src="value.coverImgUrl+'?param=150y150'"
              lazy-load
              @load="imgLoad"
              :loading-icon="require('../assets/loading.gif')"
              width="100%"
              fit="contain"
            />
            <span
              style="font-size:12px;height:32px;line-height:1.4"
              class="van-multi-ellipsis--l2"
            >{{value.name}}</span>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      catList: [],
      tabIndex: 0,
      active: "home",
      geDanList: [],
      isloading: true
    };
  },
  watch: {},

  methods: {
    getCatList() {
      const list = localStorage.getItem("catlist");
      if (list != null) {
        this.catList = JSON.parse(localStorage.getItem("catlist"));
        this.getGeDanList(0);
      } else {
        console.log("http");
        this.$http
          .get(this.host + "/playlist/catlist")
          .then(response => {
            this.catList = response.data.sub;
            this.getGeDanList(0);
            localStorage.setItem("catlist", JSON.stringify(this.catList));
          })
          .catch(error => {
            console.log("接口或处理逻辑出错");
          });
      }
    },
    getGeDanList(index) {
      this.$http
        .get(this.host + "/top/playlist", {
          params: { cat: this.catList[index].name, limit: 21 }
        })
        .then(response => {
          this.geDanList = response.data.playlists;
          if(this.geDanList .length>20){
             this.isloading = false;
          }

          // this.$nextTick(() => {
            
          // });
        })
        .catch(error => {
          console.log("接口或处理逻辑出错");
        });
    },
    indexChange(e) {
      this.getGeDanList(e);
      this.isloading = true;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    imgLoad(e) {
      this.isloading = false;
    }
  },
  mounted() {
    this.getCatList();
  }
};
</script>
<style scoped>
</style>>