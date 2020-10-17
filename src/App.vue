<template>
  <div id="app">
    <div class="view">
      <router-view />
    </div>
    <div class="player" v-if="songUrl" v-show="showAplayer">
      <aplayer
        ref="aplayer"
        autoplay
        @timeupdate="timeupdate"
        @pause="handleEvent"
        :music="{
            title: this.songName,
            artist: this.songArtist,
            src: this.songUrl,
            pic: this.songImg, 
          }"
        :currentTime="0"
        fixed
        listFolded
        @canplay="handleEvent"
        @play="play"
        @abort="handleEvent"
        @canplaythrough="handleEvent"
        @durationchange="handleEvent"
        @emptied="handleEvent"
        @ended="handleEvent"
        @error="handleEvent"
        @loadeddata="handleEvent"
        @loadedmetadata="handleEvent"
        @loadstart="handleEvent"
        @playing="handleEvent"
        @progress="handleEvent"
        @ratechange="handleEvent"
        @readystatechange="handleEvent"
        @seeked="handleEvent"
        @seeking="handleEvent"
        @stalled="handleEvent"
        @suspend="handleEvent"
        @volumechange="handleEvent"
        @waiting="handleEvent"
      />
    </div>
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
import { mapState, mapActions } from "vuex";
export default {
  name: "app",
  data: () => ({
    musicInfo: {}
  }),
  components: {
    Aplayer
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
      "showAplayer"
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
    ispause(e) {
      this.setPlayingActions(false);
    },
    timeupdate(e) {
      this.setCurrentTimeActions(e.target.currentTime);
    },
    async getMusicInfo() {
      const songData = await this.$http.get(this.host + "/song/detail", {
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
        .get(this.host + "/song/url", { params: { id: this.$route.params.id } })
        .then(response => {
          this.setSongUrlActions(response.data.data[0].url);
        })
        .catch(error => {
          console.log("接口或处理逻辑出错");
        });
    }
  }
};
</script>
<style scoped>
.player {
  position: fixed;
  width: 100%;
  background-color: white;
  bottom: 0;
}
.view {
  margin-bottom: 22%;
}
</style>
 
