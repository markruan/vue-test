<template>
  <div>
    <van-nav-bar
      :title="geDanInfo.name"
      left-text="返回"
      fixed
      left-arrow
      @click-left="onClickLeft"
    
    />
    <van-image
        width="100%"
        style="margin-top: 46px;"
        :src="geDanInfo.coverImgUrl+'?param=320y180'"
      />
   <SongList :tracks="tracks" />
  </div>
</template>>
<script>
import SongList from "../components/SongList"
import { mapState, mapActions } from "vuex";
export default {
  name: "GeDanList",
  data() {
    return {
        geDanInfo:{},
        tracks:[]
    };
  },
  components:{
    SongList
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$http
        .get(this.host+"/playlist/detail", { params: { id: this.$route.params.id } })
        .then(response => {
            this.geDanInfo=response.data.playlist
            this.tracks=response.data.playlist.tracks
            this.tracks=this.tracks
            this.id=this.tracks
            this.$store.dispatch("setPlayListActions",this.tracks)
          
        })
        .catch(error => {
          console.log("接口或处理逻辑出错");
        });
    },
    onClickLeft(){
         this.$router.go(-1);//返回上一层
    }
  }
};
</script>