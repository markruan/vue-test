<template>
  <keep-alive>
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
  </keep-alive>
</template>>
<script>
import SongList from "../components/SongList"
import { mapState, mapActions } from "vuex";
export default {
  name: "GeDanList",
  data() {
    return {
        geDanInfo:{},
        tracks:[],
        playlist:[]
    };
  },
  components:{
    SongList
  },
  created() {
    this.getDetail();
  },
  methods: {
    ...mapActions(["setPlayListActions"]),
    getDetail() {
      this.$http
        .get(this.host+"/playlist/detail", { params: { id: this.$route.params.id } })
        .then(response => {
            this.geDanInfo=response.data.playlist
            this.tracks=response.data.playlist.tracks
            var info={}
            for (const item  of this.tracks) {
              info.songId=item.id
              info.songName=item.name
              info.songArtist=item.ar[0].name
              info.songImg=item.al.picUrl
              this.playlist.push(info)
            }
         this.setPlayListActions(this.playlist)
        })
        .catch(error => {
          console.log("接口或处理逻辑出错");
        });
    },
    onClickLeft(){
         this.$router.go(-1);//返回上一层
    },
  
  }
};
</script>