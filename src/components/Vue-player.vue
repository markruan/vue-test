<template>
  <div class="musicPlay" v-if="songUrl" v-show="showAplayer">
    <audio
      ref="aplayer"
      controls="controls"
      :src="this.songUrl"
      @timeupdate="timeupdate"
      @play="play"
    />
    <!--        迷你播放器-->
    <div  v-show="minOrMax" class="audio-com-box-min">
      <van-image round width="50px" height="50px" :src="songImg" />
      <div class="musicName">
        <p>{{songName===''?'正在播放电台':songName}}</p>
        <p class="tip" v-text="songArtist"></p>
      </div>
      <div class="musicIcon">
        <van-icon
          v-show="!playing"
          name="play-circle-o"
          size="36px"
          color="#bfbfbf"
           @click="isplay"
        />
        <van-icon
          v-show="playing"
          name="pause-circle-o"
          size="36px"
          color="#bfbfbf"
            @click="ispause"
        />
        <van-icon 
          name="coupon-circle-o"
          size="24px"
          color="#bfbfbf"
          @click="ispause"
        />
      </div>
    </div>
    <!--全屏模式-->
    <div v-show="!minOrMax" >
     <fullplayer/>
    </div>
    
  </div>
</template>>

<script>
import fullplayer from "../pages/player";
import { mapState, mapActions } from "vuex";
export default {
  name: "app",
  data: () => ({
    musicInfo: {},
    minOrMax:true
  }),
  components: {
    fullplayer
  },
  watch: {
    songUrl: function(val) {
      if (val) {
        this.show = true;
        setTimeout(() => {
          let aplayer = this.$refs.aplayer;
          aplayer.play();
        }, 1000);
      }
    },
    songId(val) {
      if (val) {
        this.getMusicInfo();
      }
    },
    playing(val) {
      if (!val) {
        this.$refs.aplayer.pause();
      } else {
        this.$refs.aplayer.play();
      }
    },
    showAplayer(val) {
      // console.log(val)
    }
  },
  created() {
    this.show = false;
  },
  async mounted() {},
  computed: {
    ...mapState([
      "songArtist",
      "songId",
      "songImg",
      "songName",
      "songUrl",
      "playing",
      "showAplayer",
      "playList"
    ])
  },
  methods: {
    ...mapActions([
      "setSongNameActions",
      "setDurationActions",
      "setSongIdActions",
      "setSongUrlActions",
      "setSongImgActions",
      "setSongArtistActions",
      "setCurrentTimeActions",
      "setPlayingActions"
    ]),
    handleEvent(e) {
      // console.log(e);
    },
    isplay(e) {
      this.setPlayingActions(true);
    },
    play(e) {
      this.setPlayingActions(true);
      this.setDurationActions(e.target.duration);
    },
    isplaying(e) {
      // console.log(e);111
      111;
    },
    ispause(e) {
      //  console.log(e);
      this.setPlayingActions(false);
    },
    timeupdate(e) {
      this.setCurrentTimeActions(e.target.currentTime);
      this.setDurationActions(e.target.duration);
    },
    isMinPlayer() {
      this.minOrMax=false
    },
    async getMusicInfo() {
      const songData = await this.$http.get("/song/detail", {
        params: {
          ids: this.$route.params.id
        }
      });
      this.setSongNameActions(songData.data.songs[0].name);
      this.setSongIdActions(songData.data.songs[0].id);
      this.setSongImgActions(songData.data.songs[0].al.picUrl);
      this.setSongArtistActions(songData.data.songs[0].ar[0].name);

      const this_ = this;
      this.$http
        .get("/song/url", { params: { id: this.$route.params.id } })
        .then(response => {
          this.setSongUrlActions(response.data.data[0].url);
        })
        .catch(error => {
          console.log("接口或处理逻辑出错");
        });
    }
  }
};
</script>>
<style scoped >
audio {
  display: none;
}
@keyframes rotatePic {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.move2-enter-active,
.move2-leave-active {
  transition: all 0.7s;
}

/* 显示前或隐藏后的效果 */
.move2-enter,
.move2-leave-to {
  transform: translateY(200%);
}

.audio-com-box-min {
  position: fixed;
  bottom: 0;
  width: -webkit-fill-available;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.99);
}
p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1px;
  
}

.tip {
  margin-top: 5px;
  font-size: 14px;
  color: #a7a6a7;
}

.musicName {
  flex: 3;
  padding-left: 25px; 
  font-weight: 600;
}
/*音频图标*/

.musicIcon {
  flex: 1;

  img {
    margin-top: 15px;
    margin-left: 50px;
  }
}

.move-enter-active,
.move-leave-active {
  transition: all 0.7s;
}

/* 显示前或隐藏后的效果 */
.move-enter,
.move-leave-to {
  transform: translateY(200%);
}
</style>