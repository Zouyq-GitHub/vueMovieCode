<template>
  <div class="PhotoAlbum">
    <div class="AlbumData">
      <div class="dataItems dataItemsTitle">
        <img src="../../static/img/PhotoAlbum.png" alt="">
        <div class="TitleFont">
          你喜欢的同类影片统统在这里排队，一秒看全，省时省力
        </div>
        <div class="FontAndButton">
          <img src="../../static/img/fl.png" alt="">
          换一换
        </div>
      </div>

      <div v-for="(item,index) in PhotoAlbumList" @mouseenter="PhotoIndexFun(index)" :class="{'dataItems':true,'dataItemsHover':photoIndex==index?true:false}" v-bind:style="{ 'background-image': 'url(' + item.movie_img + ')','background-repeat':'no-repeat','background-size':'cover' }">
        <!-- <img :src="item.movie_img" alt="" width="100%" height="100%"> -->
        <div class="TitleFont">
          {{item.m_movieName}}
        </div>

        <div class="bodyFont">

          <a href="">{{item.m_lead}}</a>

          <a href="">{{item.m_time}}</a>

          <a href="">{{item.m_price}}</a>

        </div>
        <div :class="{'bodyFontBackColor':photoIndex==index?false:true}"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  created(){
    this.getData();
  },
  data() {
    return {
      photoIndex: 0,
      PhotoAlbumList: [{
        img: "https://puui.qpic.cn/tv/0/26977530_340820/0"
      }]
    }
  },
  methods:{
       //图集
    PhotoIndexFun(index) {
      this.photoIndex = index;
    },
    getData(){
      //影集查询 
      this.$axios.post('http://localhost:8087//queryPhotoAlbumList').then((res) => {
        this.PhotoAlbumList = res.data
      })
    },
    //图集
    PhotoIndexFun(index) {
      this.photoIndex = index;
    }
  }
}
</script>


<style>
@import "../../static/css/index.css";
</style>