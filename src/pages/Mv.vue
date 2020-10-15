<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-loading
      type="circular"
      color="#1989fa"
      vertical
      v-show="!this.playerOptions.sources[0].src"
      size="24px"
      style="margin-top:30px"
    ></van-loading>
    <span v-if="this.playerOptions.sources[0].src">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      />
    </span>

    <van-cell
      v-show="this.playerOptions.sources[0].src"
      title="MV信息"
      :value="MvDetail.publishTime"
      size="large"
      :label="MvDetail.name+'-'+MvDetail.artistName"
    />
  </div>
</template>
<script>
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
export default {
  data() {
    return {
      MvDetail: {},
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "" //url地址
          }
        ],
        // poster: this.MvDetail.cover?this.MvDetail.cover:require("../assets/logo.png"), //你的封面地址
        width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  created() {},
  props: {
    name: {
      type: String
    }
  },
  mounted() {
    console.log("this is current player instance object", this.player);
    this.getMvDetail();
    this.openMv();
  },
  computed: {
    // player() {
    //   return this.$refs.videoPlayer.player;
    // }
  },
  methods: {
    openMv() {
      const this_ = this;
      this.$http
        .get(this.host+"/mv/url", { params: { id: this.$route.params.id } })
        .then(function(response) {
          this_.playerOptions.sources[0].src = response.data.data.url;
        })
        .catch(function(error) {});
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    getMvDetail() {
      const this_ = this;
      this.$http
        .get(this.host+"/mv/detail", { params: { mvid: this.$route.params.id } })
        .then(response => {
          this_.MvDetail = response.data.data;
          this_.playerOptions.poster = this_.MvDetail.cover + "?param=320y180";
          console.log(this_.MvDetail);
        })
        .catch(error => {});
    }
  }
};
</script>
 
<style scoped>
/* .play-button {
  　　width: 72px;
  height: 72px;
  border-radius: 100%;
  z-index: 100;
  background-color: #ffffff;
  border: solid 1px #979797;
} */
</style>
 