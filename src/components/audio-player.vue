<template>
  <div class="audio-player">
    <div class="audio__btn-wrap">
      <div class="audio__play--previous">
        <van-icon name="arrow-left" />
      </div>
      
       <div @click="playerPause()" v-if="playing" class="audio__play--pause">
        <van-icon name="pause-circle-o" />
      </div>
      <div  v-else @click="playerPause()" class="audio__play--start">
        <van-icon name="play-circle-o" />
      </div>

     

      <div class="audio__play--next">
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="audio__progress-wrap" ref="audioProgressWrap">
      <div class="audio__progress" ref="audioProgress" />
      <div class="audio__progress-point" ref="audioProgressPoint" />
    </div>

    <div class="audio__time-wrap">
      <div class="audio__current-time" v-text="currentTimeAfterFormat">0：00</div>
      <div class="audio__duration">{{ formatTime(duration) }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AudioPlayer",

  data() {
    return {
      isIOS: /iPhone|iPad|iPod/i.test(window.navigator.userAgent), // 是否是IOS设备
      currentTimeAfterFormat: "", // 音频播放当时时间（格式化后）
      isDragging: false // 是否正在拖拽音频进度
    };
  },
  watch: {
    currentTime(val) {
      this.currentTimeAfterFormat = this.formatTime(val);
    }
  },
  methods: {
    ...mapActions(["setPlayingActions"]),
    // 格式化秒为分
    formatTime(second) {
      return [parseInt((second / 60) % 60), parseInt(second % 60)]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1");
    },
    playerPause(){ 
       this.setPlayingActions(!this.playing)
    }
  },

  beforeDestroy() {},
  computed: {
    ...mapState(["currentTime","duration","playing"])
  }
};
</script>

<style >
.audio-player {
  margin: 0 15px;
}

.audio-player .audio__btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-player .audio__btn-wrap .audio__play__icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
  color: #e35924;
}

.audio-player .audio__btn-wrap .audio__play--previous {
  font-size: 33px;
  width: 21px;
  height: 33px;
}

.audio-player .audio__btn-wrap .audio__play--previous.disable {
  opacity: 0.5;
}

.audio-player .audio__btn-wrap .audio__play--start {
  font-size: 42px;
  width: 42px;
  height: 42px;
  margin: 0 30px 0 40px;
}

.audio-player .audio__btn-wrap .audio__play--pause {
  font-size: 42px;
  width: 42px;
  height: 42px;
  margin: 0 30px 0 40px;
}

.audio-player .audio__btn-wrap .audio__play--next {
  font-size: 33px;
  width: 21px;
  height: 33px;
}

.audio-player .audio__btn-wrap .audio__play--next.disable {
  opacity: 0.5;
}

.audio-player .audio__progress-wrap {
  position: relative;
  background: #ddd;
  height: 2px;
  margin-top: 10px;
}

.audio-player .audio__progress-wrap .audio__progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: #e35924;
}

.audio-player .audio__progress-wrap .audio__progress-point {
  position: absolute;
  left: 0;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-top: -8px;
  background: #e35924;
  box-shadow: 0 0 10px 1px rgba(227, 89, 36, 0.5);
}

.audio-player .audio__progress-wrap .audio__progress-point:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  background: #fff;
  border-radius: 50%;
}

.audio-player .audio__time-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 7px;
}

.audio-player .audio__time-wrap .audio__current-time {
  font-size: 10px;
  color: #888;
}

.audio-player .audio__time-wrap .audio__duration {
  font-size: 10px;
  color: #888;
}

.audio-player .audio-player__audio {
  display: block;
  margin: 0 auto;
}
</style>
