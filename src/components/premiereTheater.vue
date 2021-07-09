<template>
  <div class="firstCinema">
    <div class="firstCinemaTitle">
      <h2>首播影院</h2>
      <div class="dataShowPic">
        <Page :current="1" :total="20" simple @on-change="firstPage" />
      </div>
    </div>

    <div class="firstCinemaBody">
      <div class="firstCinemaItems" v-for="item in firstList">
        <a href="" class="ItemsHover">
          <img :src="item.movie_img" alt="">
        </a>
        <a href="">{{item.m_movieName}}</a>
        <span>{{item.m_describe}}</span>
      </div>
    </div>
  </div>

</template>


<script>
export default {

  data() {
    return {
      firstList: []
    }
  },
  created() {
    this.getData();
  },
  methods: {
    firstPage(val) {
      if (val == 1) {
        val = 0
      } else {
        val = val - 1
      }

      //首播影院
      this.$axios.post('http://localhost:8087//queryHotMovie', this.$qs.stringify({
        curr: val * 16
      })).then((res) => {
        this.firstList = res.data
      })
    },
    getData() {
      //首播影院分页查询第一页 
      this.$axios.post('http://localhost:8087//queryHotMovie', this.$qs.stringify({
        curr: 1
      })).then((res) => {
        this.firstList = res.data
      })
    }
  }
}
</script>


<style>
@import "../../static/css/index.css";
</style>