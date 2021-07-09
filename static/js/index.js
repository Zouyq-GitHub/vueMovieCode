new Vue({
  el: "#index",
  data() {
    return {
      bodyFontBackColorShow: true,
      photoIndex: 0,
      userLoginShow: false,
      userName: "小米",
      userImg: "../../static/img/userDefault.png",
      userShow: false,
      newUserShow: false,
      pic: true,
      picHoverRed: "#ff5c38",
      hoverIndex: null,
      img: false,
      lookHover: "../../static/img/lookHover.png",
      hoverHot: "../../static/img/hot.png",
      onmouseColor: {
        "pic-right-first": true
      },
      hotList: [],
      HotCinema: [],
      firstList: [],
      PhotoAlbumList: [
        {
          img: "https://puui.qpic.cn/tv/0/26977530_340820/0"
        }
      ],
      picRight: true,
      picLeft: false,
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
        }
      ]
    };
  },
  created() {
    //查询热门电影及影院热映
    this.getData();
    //用户登录状态方法
    this.userLogin();
  },
  methods: {
    picAndImg(e) {
      if (e == 1) {
        this.pic = true;
        this.img = false;
        this.lookHover = "../../static/img/lookHover.png";
        this.hoverHot = "../../static/img/hot.png";
        this.hoverIndex = null;
      } else if (e == 2) {
        this.pic = false;
        this.img = true;
        this.lookHover = "../../static/img/right-djzk.png";
        this.hoverHot = "../../static/img/hoverHot.png";
      }
    },
    //查询电影
    getData() {
      this.$axios
        .post(
          "http://localhost:8087//queryHotMovie",
          this.$qs.stringify({
            curr: 1
          })
        )
        .then(res => {
          //操作这个数组 只显示12部电影

          let list = [];
          for (let index = 0; index < 10; index++) {
            list.push(res.data[index]);
          }
          this.hotList = list;
        });
      //分页查询初始第一页 热门影院
      this.$axios
        .post(
          "http://localhost:8087//queryHotCinema",
          this.$qs.stringify({
            curr: 1
          })
        )
        .then(res => {
          this.HotCinema = res.data;
        });
      //首播影院分页查询第一页
      this.$axios
        .post(
          "http://localhost:8087//queryHotMovie",
          this.$qs.stringify({
            curr: 1
          })
        )
        .then(res => {
          this.firstList = res.data;
        });
      //影集查询
      this.$axios.post("http://localhost:8087//queryPhotoAlbumList").then(res => {
        this.PhotoAlbumList = res.data;
        console.log(res.data);
      });
    },
    picImgFun(e) {
      if (e == 1) {
        this.picRight = false;
        this.picLeft = true;
      } else {
        this.picRight = true;
        this.picLeft = false;
      }
    },
    picBckgroundImg(index) {
      this.backgroundUrl = this.hoverList[index].url;
      this.hoverIndex = index;
    },
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
    //用户登录状态方法
    userLogin() {
      //判断登录状态
      if (localStorage.getItem("user") != null) {
        //用户头像
        this.userImg = JSON.parse(localStorage.getItem("user")).u_headImg;
        //用户名
        this.userName = JSON.parse(localStorage.getItem("user")).u_username;
        console.log(this.userName);

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
    //退出登录
    clearLogin() {
      //清除登录状态
      localStorage.clear();
      //清除cookie
      $.cookie("token", null);
      //重新加载用户状态方法
      this.userLogin();
    },
    //跳转到登录
    gotoLoginOn() {
      location.href = "http://8.140.175.119:8080/#/login";
    },
    //分页的页面返回代码 分页 热门影院
    changePage(val) {
      console.log(val);
      if (val == 1) {
        val = 0;
      }
      this.$axios
        .post(
          "http://localhost:8087//queryHotCinema",
          this.$qs.stringify({
            curr: val * 2
          })
        )
        .then(res => {
          this.HotCinema = res.data;
        });
    },
    firstPage(val) {
      if (val == 1) {
        val = 0;
      } else {
        val = val - 1;
      }

      //首播影院
      this.$axios
        .post(
          "http://localhost:8087//queryHotMovie",
          this.$qs.stringify({
            curr: val * 16
          })
        )
        .then(res => {
          this.firstList = res.data;
        });
    },
    //图集
    PhotoIndexFun(index) {
      this.photoIndex = index;
    }
  }
});
