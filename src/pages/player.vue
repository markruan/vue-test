 
<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>
      <van-swipe class="my-swipe myswipe" indicator-color="red" v-if="songImg">
        <van-swipe-item>
          <div class="v-image">
            <div class="border">
              <van-image
                :src="songImg+'?param=300y300'"
                round
                :class="{'Rotation':playing}"
                style="width:100%"
              ></van-image>
            </div>
            <div class="title">{{songName+'-'+songArtist}}</div>
          </div>
        </van-swipe-item>

        <van-swipe-item v-if="lyricShow" class="v-lyric">
          <LyricScroll
            :lyric="lyric"
            lyricLineheight="1.2em"
            :current-time="currentTime"
            :lyricActiveClass="active"
          />
        </van-swipe-item>
      </van-swipe>
      <audioPlayer class="player" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LyricScroll from "vue-lyric-scroll";
import audioPlayer from "../components/audio-player";

export default {
  name: "app",
  data() {
    return {
      isfull: false,
      audioSources: {},
      audioList: [],
      timeupdate: {},
      xuzhuan: "Rotation",
      lyric: {},
      active: "lyric-active",
      lyricShow: false
    };
  },
  components: {
    LyricScroll,
    audioPlayer
  },
  created() {
    this.init();
    this.setShowAplayerActions(false)
  },
  watch: {
    currentTime: function(val) { 
      if (val) {
        this.lyricShow = true;
      }
    }
  },
  methods: {
    ...mapActions(["setSongIdActions","setShowAplayerActions"]),
    async init() {
      this.setSongIdActions(this.$route.params.id);
      await this.getlyric();
    },
    timeStrToNum(str) {
      const minute = Number(str.slice(0, 2));
      const second = Number(str.slice(3, 5));
      const minSec = Number(str.slice(6, 8));
      return minute * 60 + second + minSec / 100;
    },
    // 将歌词字符串转换为对象，格式为{开始时间: 歌词, ...}
    lyricToObj(lyricStr) {
      const obj = {};
      let perLyric;
      let time;
      lyricStr.split("\n").forEach((item, idx) => {
        perLyric = item.slice(item.indexOf("]") + 1);
        if (perLyric) {
          time = this.timeStrToNum(item.slice(1, 9));
          obj[time] = perLyric;
        }
      });
      return obj;
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
      this.setShowAplayerActions(true)
    },
    async getlyric() {
      const self = this;
      await this.$http
        .get(this.host + "/lyric", { params: { id: this.$route.params.id } })
        .then(response => {
          if (response.data.lrc.lyric) {
            this.lyric = self.lyricToObj(response.data.lrc.lyric);
          }
        })
        .catch(error => {
          console.log("接口或处理逻辑出错");
        });
    }
  },
  mounted() {},
  computed: {
    ...mapState(["songArtist", "songId", "songImg", "songName", "songUrl","playing","currentTime"])
  }
};
</script>
 <style scoped >
.v-lyric {
  text-align: center !important;
}
.lyric-active {
  color: red !important;
  font-size: 20px;
}
.v-image {
  position: absolute;
  left: 15%;
  top: 15%;
  width: 70%;
  box-sizing: border-box;
}
.border {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

.Rotation {
  -webkit-transform: rotate(360deg);
  animation: rotation 8s linear infinite;
  -moz-animation: rotation 8s linear infinite;
  -webkit-animation: rotation 8s linear infinite;
  -o-animation: rotation 8s linear infinite;
}
.title {
  padding-top: 12px;
  text-align: center;
}
.myswipe {
  height: 25rem;
}
.audio-player {
  margin: 0 15px;
  position: fixed;
  width: 90%;
  bottom: 0;
}
</style>