<template >
  <div>
    <div class="topDh">
      <div class="top">
        <div class="top-head">
          <a href="" class="top-logo">
            <img src="../../static/img/movie-logo.png" alt="" />
          </a>
          <div class="top-dh">
            <a href="">精选</a>
            <a href="">电视剧</a>
            <a href="">
              <img src="../../static/img/top-dy.png" alt="" width="18px" height="18px" class="top-dh-img-dy" />
              电影</a>
            <a href="">综艺</a>
            <a href="">动漫</a>
            <a href="">少儿</a>
            <a href="">纪录片</a>
            <a href="">VIP会员</a>
            <a href="">音乐</a>
            <a href="">知识</a>
            <a href="" class="top-qb">全部</a>
            <a href="">{{searchMovieValues}}</a>
          </div>

          <div class="search">
            <input type="" class="search-input" v-model="searchMovieValue" />
            <a href="JavaScript:;">
              <img src="../../static/img/search-hot.png" alt="" class="hot-top" />
              Video</a>
            <button class="search-submit" @click="searchMovie">
              <img src="../../static/img/search-ico.png" alt="" />
              Search
            </button>
          </div>

          <div class="top-right">
            <!-- 个人中心小窗口 -->

            <div class="newUserBox" @mouseleave="userShowFun(4)" @mouseover="userShowFun(3)" v-show="userShow">

              <div v-if="userLoginShow==false">
                <div class="userBox">

                  <div class="userHead">
                    <div class="userBoxHead">
                      <span>QQ账号: &nbsp; {{this.$store.state.newUserName}}</span>
                      <div class="userBoxHeadRight">
                        <a href="">切换</a>
                        <a href="javascript:;" @click="clearLogin()">退出</a>
                      </div>
                    </div>

                    <div class="topVip">
                      <span>
                        VIP于2022-01-15到期
                      </span>

                      <div class="VipRight">
                        <a href="" class="buyVip">
                          续费
                        </a>
                        <span>
                          开通电视特权
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="userBoxBottom">
                    <div class="iconBox">
                      <div class="radiusColor">
                        <img src="../../static/img/userLogoA.png" alt="">
                      </div>
                      <a href="">评论消息</a>
                    </div>

                    <div class="iconBox">
                      <div class="radiusColor" style="backgroundColor:rgb(235,250,253)">
                        <img src="../../static/img/userLogoB.png" alt="">
                      </div>
                      <a href="">云同步观看记录</a>
                    </div>

                    <div class="iconBox">
                      <div class="radiusColor" style="backgroundColor:rgb(254,245,244)">
                        <img src="../../static/img/userLogoC.png" alt="">
                      </div>
                      <a href="">创作中心</a>
                    </div>

                    <div class="iconBox">
                      <div class="radiusColor" style="backgroundColor:rgb(253,246,237)">
                        <img src="../../static/img/userLogoD.png" alt="">
                      </div>
                      <a href="">用客户端抢VIP</a>
                    </div>
                  </div>

                </div>
              </div>

              <div v-else>
                <div class="userBox loginUserBox">
                  <div class="userHead">
                    <div class="userBoxHead">
                      <span>登陆之后可以</span>

                    </div>

                    <div class="topVip">
                      <span>
                        开通VIP/超级影视VIP 看大片
                      </span>

                      <div class="VipRight">
                        <a href="" class="buyVip loginBuyVip">
                          开通
                        </a>
                      </div>
                    </div>
                  </div>
                  <!-- 个人中心窗口下边 -->
                  <div class="userBoxBottom loginUserBoxBottom">
                    <div class="iconBox">
                      <div class="radiusColor">
                        <img src="../../static/img/userLogoA.png" alt="">
                      </div>
                      <a href="">评论消息</a>
                    </div>

                    <div class="iconBox">
                      <div class="radiusColor" style="backgroundColor:rgb(235,250,253)">
                        <img src="../../static/img/userLogoB.png" alt="">
                      </div>
                      <a href="">云同步观看记录</a>
                    </div>

                    <div class="iconBox">
                      <div class="radiusColor" style="backgroundColor:rgb(254,245,244)">
                        <img src="../../static/img/userLogoC.png" alt="">
                      </div>
                      <a href="">创作中心</a>
                    </div>

                    <div class="iconBox">
                      <div class="radiusColor" style="backgroundColor:rgb(253,246,237)">
                        <img src="../../static/img/userLogoD.png" alt="">
                      </div>
                      <a href="http://localhost:8080/#/login">用客户端抢VIP</a>

                    </div>

                  </div>
                  <a href=""></a>
                  <!-- --- -->
                  <div class="loginButton">

                    <button class="gotoLogin" type="button" @click="gotoLoginOn()">
                      立即登录
                    </button>
                  </div>

                </div>
              </div>

            </div>
            <img src="../../static/img/top-vip.png" alt="" class="top-right-img" />
            <img src="../../static/img/top-right2.png" alt="" class="top-right-img" />
            <img src="../../static/img/top-right3.png" alt="" class="top-right-img" />
            <img src="../../static/img/top-right4.png" alt="" class="top-right-img" />

            <!-- 用户头像 -->
            <div>
              <div class="userPng">
                <!-- <img :src="userImg" alt="" class="top-right-img" @mouseover="userShowFun(1)" @mouseleave="userShowFun(2)" /> -->
                <img :src="this.$store.state.userImg" alt="" class="top-right-img" @mouseover="userShowFun(1)" @mouseleave="userShowFun(2)" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="heightDh"></div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      userLoginShow: false,
      userName: "小米",
      userShow: false,
      searchMovieValue: "",
      u_username: "",
      u_headImg: ""
    }
  },
  created() {
    this.userLogin();
    //更新到storage
    if (localStorage.getItem('user') != null) {
      this.$store.commit('showPeople', JSON.parse(localStorage.getItem('user')).u_headImg);
    }

  },
  computed: {
    searchMovieValues() {
      // if (this.searchMovieValue=="") {
      //   console.log("空了");
      var searchMovieValues = this.searchMovieValue
      if (searchMovieValues == "") {
        //查询购买页面的分页查询
        this.$axios.post('http://localhost:8087//queryBuyMoviePage', this.$qs.stringify({
          curr: 0
        })).then((res) => {
          // this.queryBuyMovieList = res.data
          this.$store.commit('queryMovieFun', res.data);
        })
      }
      return searchMovieValues;
      // }

    }
  },
  methods: {
    userShowFun(e) {
      if (e == 1) {
        this.userShow = true;
      } else if (e == 2) {
        if (!this.newUserShow) {
          this.userShow = false;
        } else {
          this.userShow = true;
        }
      } else if (e == 3) {
        this.userShow = true;
        this.newUserShow = true;
      } else if (e == 4) {
        this.userShow = false;
        this.newUserShow = false;
      }
    },
    //退出登录
    clearLogin() {
      //清除登录状态
      localStorage.clear();
      //重置头像
      this.$store.commit('showPeople', "http://localhost:8080/static/img/userDefault.png");
      //清除cookie 
      $.cookie("token", null, { path: '/' })
      //重新加载用户状态方法
      this.userLogin();
      //清空用户名
      this.$store.commit('newUserNameFun', null);
      //VIP到期时间
      this.$store.commit('vipDateFun', "请登录");
    },
    //跳转到登录
    gotoLoginOn() {
      location.href = "http://8.140.175.119:8080/#/login";
    },
    userLogin() {
      //判断登录状态
      if (localStorage.getItem('user') != null) {
        //用户头像
        // this.userImg = JSON.parse(localStorage.getItem('user')).u_headImg;
        // console.log(this.$store.state.userImg)
        // this.userImg = this.$store.state.userImg;
        //用户名
        this.userName = JSON.parse(localStorage.getItem('user')).u_username;

        //显示登录用户窗口
        this.userLoginShow = false;
        //用户信息窗口
        this.userShow = false;

      } else {
        //让跳转登录的窗口出来 头像恢复
        this.userLoginShow = true;
        this.userImg = "../../static/img/userDefault.png";
      }
    },
    //模糊查询出售电影名称
    searchMovie() {
      this.$axios.post('http://localhost:8087//searchBuyMovie', this.$qs.stringify({
        movieName: this.searchMovieValue
      })).then((res) => {
        //将查询的文件内容传到store的headpng属性
        this.$store.commit('queryMovieFun', res.data);
      })
    }
  }
}
</script>

<style>
@import "../../static/css/index.css";
</style>
