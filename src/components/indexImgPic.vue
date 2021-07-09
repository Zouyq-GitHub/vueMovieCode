<template>
  <div class="img-pic">
    <!-- 负责背景图片的元素 -->
    <div class="data-box-pic" v-show="pic">
      <div class="data">
        <img src="../../static/img/pic_left.png" alt="" style="left:0" class="pic_rightAndLeft" v-show="picLeft" @click="picImgFun(2)">
        <img src="../../static/img/pic_right.png" alt="" class="pic_rightAndLeft" @click="picImgFun(1)" v-show="picRight">

        <div :class="{'data-overflow-box':true ,'data-overflow-box-right': picLeft}" v-for="item in hotList">
          <a href="" v-bind:style="{ 'background-image': 'url(' + item.movie_img + ')','background-repeat':'no-repeat','background-size':'cover' }">
            <div class="data-bottom-box">
              <p class="p-title">{{item.m_movieName}}</p>
              <p class="p-data">{{item.m_describe}}</p>
            </div>
          </a>
          <!-- <a href="" class="data-b">
              <div class="data-bottom-box">
                <p class="p-title">庆余年</p>
                <p class="p-data">张若昀身陷棋局绝处逢生</p>
              </div>
            </a>
            <a href="" class="data-c">
              <div class="data-bottom-box">
                <p class="p-title">信条</p>
                <p class="p-data">诺兰扭转时空，烧脑力作</p>
              </div>
            </a>
            <a href="" class="data-d">
              <div class="data-bottom-box">
                <p class="p-title">姜子牙</p>
                <p class="p-data">姜子牙大战九尾妖狐</p>
              </div>
            </a>
            <a href="" class="data-e">
              <div class="data-bottom-box">
                <p class="p-title">八佰</p>
                <p class="p-data">年度超燃催泪抗日大片</p>
              </div>
            </a>
            <a href="" class="data-f">
              <div class="data-bottom-box">
                <p class="p-title">毒液：致命守护者</p>
                <p class="p-data">漫威暗黑英雄霸气登场</p>
              </div>
            </a> -->
        </div>
      </div>
    </div>

    <a href="javascript:;" class="data-img-pic" v-bind:style="{ 'background-image': 'url(' + backgroundUrl + ')'}" v-show="img"></a>

    <div class="pic-right">
      <a href="" @mouseenter="picAndImg(1)" :class="{'pic-right-first':true,'hover-Color':pic}">
        <img alt="" width="16px" class="pic-right-first-img" :src="lookHover" />
        大家在看</a>

      <div class="right-hr"></div>
      <div class="pic-right-bottom-box" @mouseenter="picAndImg(2)">
        <span href="" :class="{'pic-right-second':true,'zbHover-Color':img}">
          <img alt="" :src="hoverHot" />
          重磅推荐
        </span>

        <a href="" v-for="(obj,index) in hoverList" @mouseenter="picBckgroundImg(index)" :style="hoverIndex==index?'color:#ff5c38':'color:#FFFFFFB3'"> {{obj.name}} </a>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      pic: true,
      hotList: [],
      picRight: true,
      picLeft: false,
      img: false,
      backgroundUrl: "https://puui.qpic.cn/media_img/lena/PICa8spgt_580_1680/0",
      hoverList: [
        {
          name: "冷血狂宴·独播",
          url: "https://puui.qpic.cn/media_img/lena/PIC14mthj_580_1680/0"
        },
        {
          name: "信条",
          url: "https://puui.qpic.cn/media_img/lena/PICfrk9qj_580_1680/0"
        },
        {
          name: "2020迪拜中国影视周",
          url: "https://puui.qpic.cn/media_img/lena/PICa8spgt_580_1680/0"
        },
        {
          name: "风平浪静",
          url: "https://puui.qpic.cn/media_img/lena/PICp0wnpa_580_1680/0"
        },
        {
          name: "阴阳美人棺",
          url: "https://puui.qpic.cn/tv/0/1225457511_1680580/0"
        },
        {
          name: "《赤狐书生》独家纪录片",
          url: "https://puui.qpic.cn/media_img/lena/PICoekbio_580_1680/0"
        },
        {
          name: "喜宝",
          url: "https://puui.qpic.cn/media_img/lena/PICwh2a97_580_1680/0"
        },
        {
          name: "大秦赋",
          url: "https://puui.qpic.cn/media_img/lena/PICu8ysqg_580_1680/0"
        },
        {
          name: "有翡·首播",
          url: "https://puui.qpic.cn/media_img/lena/PICymh6c6_580_1680/0"
        },
      ],
      lookHover: '../../static/img/lookHover.png',
      hoverHot: '../../static/img/hot.png',
      hoverIndex: null
    }
  },
  created(){
      this.getData();
  },
  methods:{
      picAndImg(e) {
      if (e == 1) {
        this.pic = true
        this.img = false
        this.lookHover = '../../static/img/lookHover.png'
        this.hoverHot = '../../static/img/hot.png'
        this.hoverIndex = null
      } else if (e == 2) {
        this.pic = false
        this.img = true
        this.lookHover = '../../static/img/right-djzk.png'
        this.hoverHot = '../../static/img/hoverHot.png'
      }
    },
      picBckgroundImg(index) {
      this.backgroundUrl = this.hoverList[index].url;
      this.hoverIndex = index;
    },
    getData() {
      this.$axios.post('http://localhost:8087//queryHotMovie', this.$qs.stringify({
        curr: 1
      })).then((res) => {
        //操作这个数组 只显示12部电影

        let list = [];
        for (let index = 0; index < 10; index++) {
          list.push(res.data[index]);
        }
        this.hotList = list

      })
    },
    picImgFun(e) {
      if (e == 1) {
        this.picRight = false;
        this.picLeft = true;
      }
      else {
        this.picRight = true;
        this.picLeft = false;
      }
    }
  }
}
</script>

<style>
@import "../../static/css/index.css";
</style>