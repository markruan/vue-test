<template>
  <div id="app">
    <div class="view"> 
        <router-view/>
     </div>
    <keep-alive>
      <VuePlayer />
    </keep-alive>
  </div>
</template>

<script>
import VuePlayer from "./components/Vue-player";
export default {
  name: "app",
  data: () => ({
    musicInfo: {}
  }),
  components: {
    VuePlayer
  }
};
</script>
<style scoped>
.view {
  margin-bottom: 22%;
}
</style>>

 
