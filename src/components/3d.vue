<template>
  <carousel-3d
    :autoplay="true"
    :autoplayTimeout="3000"
    :perspective="35"
    :display="5"
    :animationSpeed="1000"
    :width="180"
    :height="180"
    :controlsHeight="60"
  >
    <slide v-for="(item, i) in slides" :index="i" :key="i">
      <!--通过插槽作用域可以拿到点击的图片的索引-->
      <template slot-scope="obj">
        <img :src="item.coverImgUrl +'?param=300y300'" alt />
      </template>
    </slide>
  </carousel-3d>
</template>>
<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  components: {
    Carousel3d,
    Slide
  },
  props: {
    slides: Array
  }
};
</script>>