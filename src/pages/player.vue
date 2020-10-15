 
<template>
  <div v-if="audioList.length">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-swipe class="my-swipe myswipe" indicator-color="red">
      <van-swipe-item>
        <div class="v-image">
          <div class="border">
            <van-image
              :src="audioSources.pic"
              round
              :class="{'Rotation':isPlaying}"
              style="width:100%"
            ></van-image>
          </div>
          <div class="title">{{audioSources.title+'-'+audioSources.artist}}</div>
        </div>
      </van-swipe-item>
      <van-swipe-item  class="v-lyric">
        
        <LyricScroll  :lyric="lyric" lyricLineheight="1.2em" :current-time="currentTime" :lyricActiveClass="active" />
      </van-swipe-item>
    </van-swipe>

    <AudioPlayer
      ref="audioPlayer"
      autoplay="autoplay"
      :audio-list="audioList"
      :before-play="onBeforePlay"
      :show-play-button="true"
      style="position: fixed;width: 90%;bottom: 20px;}"
      @timeupdate="onTimeUpdate"
      @playing="Playing"
      @pause="stopP"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AudioPlayer  from "../components/audio-player"; 
 
import LyricScroll from "vue-lyric-scroll";
 

export default {
  name: "app",
  data() {
    return { 
      isfull:false,
      audioSources: {},
      audioList: [],
      duration: {},
      timeupdate: {},
      currentTime: 0,
      isPlaying:false,
      xuzhuan: "Rotation",
      lyric: {},
      active:"lyric-active"
      
    };
  },
  components: {
    AudioPlayer,
    LyricScroll
  },
  watch: {
    isPlaying(old, nw) {
      //监听正在播放的歌曲改变
        
    },
    audioList(old,news){
       
      
      
    }
  },
  methods: {
    play(){

    },
    stopP() {
      this.isPlaying = false;
    },
    Playing() {
      this.isPlaying = true; 
      

    },
    onTimeUpdate(e) {
      this.currentTime = e.target.currentTime;
      
    },
    getDuration() {
      let audio = this.$refs.audioPlayer;
     
      //此时可以获取到duration
      this.duration = audio.duration;
    },
        timeStrToNum(str) {
      const minute = Number(str.slice(0, 2))
      const second = Number(str.slice(3, 5))
      const minSec = Number(str.slice(6, 8))
      return minute * 60 + second + minSec / 100
    },
    // 将歌词字符串转换为对象，格式为{开始时间: 歌词, ...}
    lyricToObj(lyricStr) {
            
        
      const obj = {}
      let perLyric
      let time
      lyricStr.split('\n').forEach((item, idx) => {
        perLyric = item.slice(item.indexOf(']') + 1)
        if (perLyric) {
          time = this.timeStrToNum(item.slice(1, 9))
          obj[time] = perLyric
        }
      })
      return obj
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime; //获取audio当前播放时间
    },

    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onBeforePlay(next) {
     
      next(); // 开始播放
       
      this.getDuration();
    },
    getlyric() {
      const self = this;
      
      this.$http
        .get(this.host+"/lyric", { params: { id: this.$route.params.id } })
        .then(response => {
          this.lyric =self.lyricToObj(response.data.lrc.lyric) ;
        })
        .catch(error => {
          console.log("接口或处理逻辑出错");
        });
    },
    getMusicInfo() {
      const this_ = this;
      
      this.$http
        .get(this.host+"/song/url", { params: { id: this.$route.params.id } })
        .then(response => {
          for (const item of this.playList) {
            if (item.id == this.$route.params.id) {
              this.musicInfo = item;
            }
          }

          this.audioSources = {
            title: this.musicInfo.name,
            artist: this.musicInfo.ar[0].name,
            pic: this.musicInfo.al.picUrl + "?param=500y500",
            src: response.data.data[0].url,
            id: this.$route.params.id
          };
          this_.audioList.push(response.data.data[0].url);
    
          this_.$store.commit("addSongToHistory", this.audioSources);
        })
        .catch(error => {
          console.log("接口或处理逻辑出错");
        });
    }
  },
  mounted() {
    this.getMusicInfo();
    this.getlyric();
   
  },
  computed: {
    
    ...mapState(["playList", "playHistory"])
  }
};
</script>
 <style  >
 .v-lyric{
     text-align: center !important;
 }
 .lyric-active{
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

</style>