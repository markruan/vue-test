<template>
  <div id="app">
    <div style="height:80%" >
      <router-view />
    </div>
   
    <div style="height:20%">
     
    </div>
    
  </div>
</template>

<script>
 
import { mapState, mapActions } from "vuex";
import AudioPlayer  from "./components/audio-player"; 
export default {
  name: "app",
  data: () => ({
     audioList: [
        'http://txh-cdn.96qbhy.com/20180817175211dtC1vE3z.mp3',
        'http://txh-cdn.96qbhy.com/20181106105737sOcozMqw.mp3'
      ]
  }),
  components: {
   AudioPlayer
  },
  created() {
    this.show = false;
  },
  methods: {}
};
</script>
 
