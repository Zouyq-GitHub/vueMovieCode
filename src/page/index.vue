<template>
  <div id="index">

    <!-- 首页标题部分 -->
    <indexTitle></indexTitle>

    <!-- 轮播图部分 -->
    <indexImgPic></indexImgPic>

    <div class="dataShow">
      <!-- 热门影院 -->
      <indexTheHit></indexTheHit>
      <!-- 首播影院 -->
      <premiereTheater></premiereTheater>
      <!-- 影集 -->
      <photoAlbum></photoAlbum>
    </div>
    <indexBottom></indexBottom>

  </div>
</template>

<script>
import indexTitle from "../components/indexTitle.vue";
import indexImgPic from "../components/indexImgPic.vue";
import indexTheHit from "../components/indexTheHit.vue";
import premiereTheater from "../components/premiereTheater.vue";
import photoAlbum from "../components/photoAlbum.vue";
import indexBottom from "../components/indexBottom.vue";
export default {
  components: {
    indexTitle,
    indexImgPic,
    indexTheHit,
    premiereTheater,
    photoAlbum,
    indexBottom
  },
  data() {
    return {
      
    }
  },
  created() {
   
  },
  methods: {
    
  }
}
</script>

<style>

</style>