<template>
  <div>
    <div class="dataShowTop">
      <h2>院线热映</h2>
      <div class="dataShowPic">
        <Page :current="1" :total="50" simple @on-change="changePage" />
      </div>
    </div>
    <div class="dataShowBody">
      <div class="dataLeft">
        <div class="video">
          <video src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-learning-vue/52d32740-aecd-11ea-b244-a9f5e5565f30.mp4" controls="controls" class="leftVideo"></video>
        </div>

        <div class="dataLeftBottom">
          <div class="bottomLeft">
            <a href="" style="color: #ff5c38;">
              大偃术师·12.18独播
            </a>
            <a href="">
              崖上的波妞·特辑
            </a>
            <a href="">
              门神·定档12.20
            </a>
          </div>

          <div class="bottomRight">
            <a href="">
              紧急救援·父子情预告
            </a>
            <a href="">
              你好，李焕英·大年初一
            </a>
            <a href="">
              神奇女侠1984·IMAX3D
            </a>
          </div>
        </div>

      </div>
      <div class="dataRight">
        <div class="dataRightItems">
          <div class="dataRightItem" v-for="item in HotCinema">
            <img :src="item.movie_img" alt="">
            <p>{{item.m_movieName}}</p>
            <span>{{item.m_describe}} </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      HotCinema: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    //分页的页面返回代码 分页 热门影院
    changePage(val) {
      console.log(val)
      if (val == 1) {
        val = 0
      }
      this.$axios.post('http://localhost:8087//queryHotCinema', this.$qs.stringify({
        curr: val * 2
      })).then((res) => {
        this.HotCinema = res.data
      })
    },
    getData() {
      //分页查询初始第一页 热门影院
      this.$axios.post('http://localhost:8087//queryHotCinema', this.$qs.stringify({
        curr: 1
      })).then((res) => {
        this.HotCinema = res.data
      })
    }
  }
}
</script>


<style>
@import "../../static/css/index.css";
</style>