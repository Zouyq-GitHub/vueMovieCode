<template>
  <div class="buyUser">

    <!-- 顶部头像和名称 -->
    <div class="userPhoneAndName">
      <div class="user">
        <div class="uploadPng">
          <Upload action="http://localhost:8087/NewAddUserHeadPNG" :show-upload-list="false" :data={u_phone:phone} :on-success="getFile">
            <Button icon="ios-cloud-upload-outline"></Button>
          </Upload>
        </div>
        <div class="photo">
          <a href="javascript:;">
            <img :src="this.$store.state.userImg" alt="">
          </a>
        </div>
        <div class="userName">
          {{this.$store.state.newUserName}}
        </div>
        <div class="vip">
          <div class="vipFont">
            {{this.$store.state.vipDate}}
          </div>
          <a href="">
            快来续费靓仔
          </a>
        </div>
        <a href="" class="userVip">
          已开启自动续费 >
        </a>
      </div>
    </div>
    <!-- 中部 -->
    <div class="creationItem">
      创作中心
    </div>
    <div class="userChannelInfo">
      <a href="">我的个人频道</a>
      <div class="channelInfo">
        <div class="info">
          <span class="infoNumber">15</span>
          <span class="infoFont">关注</span>
        </div>
        <div class="info">
          <span class="infoNumber">71</span>
          <span class="infoFont">粉丝</span>
        </div>
        <div class="info">
          <span class="infoNumber">5</span>
          <span class="infoFont">doki圈</span>
        </div>
      </div>
    </div>

    <!-- 下半部分个人中心导航条 -->
    <div class="userNavigate">

      <div class="userItem" v-for="(item,index) in userItemsList">
        <a href="javascript:;" @click="userItemFun(index)">{{item}}</a>
      </div>
    </div>

    <div class="passwordBox" v-show="passwordBox">
      <input type="password" placeholder="输入当前密码" v-model="nowPassword">
      <input type="password" placeholder="输入新密码" v-model="newPassword">
      <input type="password" placeholder="确认新密码" v-model="confirmNewPwaaword">
      <button type="botton" @click="submitPassword()">提交</button>
      <Modal v-model="modal1" title="">
        <p>修改成功</p>
        <p>重新登录生效</p>
      </Modal>

      <Modal v-model="newName" title="">
        <Input v-model="newNameValue" placeholder="输入新名字" style="width: 65%" /><Button @click="nameSubmit">提交</Button>
      </Modal>
    </div>

  </div>
</template>


<script>
import buyTitle from "./buyTitle";
export default {
  computents: {
    buyTitle
  },
  created() {
    // //头像管理
    if (localStorage.getItem('user') != null) {
      this.userImg = JSON.parse(localStorage.getItem('user')).u_headImg;
      // console.log(this.$store.state.userImg)
      //获取用户手机号
      this.phone = JSON.parse(localStorage.getItem('user')).u_phone;
      //用户的昵称
      this.$store.commit('newUserNameFun', JSON.parse(localStorage.getItem('user')).u_username);
      this.$store.commit('vipDateFun', "2022-1-15 到期");
    }
    else{
       //Vip到期时间
      this.$store.commit('vipDateFun', "请登录");
    }
  },
  data() {
    return {
      phone: "1",
      userImg: "http://localhost/img/1606786397606xiaomao.jpg",
      userItemsList: [
        "修改密码", "修改昵称", "关注", "我的doki", "评论", "消息", "上传视频", "账号管理", "VIP会员", "我的钻石",
      ],
      passwordBox: false,
      nowPassword: "",
      newPassword: "",
      confirmNewPwaaword: "",
      isOk: false,
      modal1: false,
      newNameValue: "",
      newName: false,
      vipDate:"2022-1-15 到期"
    }
  },
  methods: {
    getFile(file) {
      //更新当前头像
      this.userImg = "http://localhost:8080/static/img/" + file.u_headImg
      //更新头像到localstorage  取-改-存
      var newUser = JSON.parse(localStorage.getItem('user'));
      newUser.u_headImg = this.userImg;
      localStorage.setItem("user", JSON.stringify(newUser));
      //将图片地址传到store的headpng属性
      this.$store.commit('showPeople', this.userImg)
    },
    userItemFun(index) {
      //下标为0就是用户的修改密码功能
      if (index == 0) {
        if (this.passwordBox == false) {
          this.passwordBox = true;
        }
        else {
          this.passwordBox = false;
        }
      }
      else if (index == 1) {
        this.newName = true
      }

    },
    submitPassword() {
      //先判断用户输入的当前密码是否是正确密码
      console.log(this.nowPassword, this.newPassword, this.confirmNewPwaaword)
      //发送密码的数据和用户名的数据让用户登录
      this.$axios.post('http://localhost:8087//submitPassword', this.$qs.stringify({
        phone: JSON.parse(localStorage.getItem('user')).u_phone,
        password: this.nowPassword
      })).then((res) => {
        // this.HotCinema = res.data
        if (res.data == true) {
          //说明密码正确 是当前账号 那么开始验证第二次的新密码是否相同
          if (this.newPassword == this.confirmNewPwaaword && this.nowPassword != this.newPassword) {
            //用户步骤正确 开始修改密码逻辑  
            this.$axios.post('http://localhost:8087/submitNewPassword', this.$qs.stringify({
              phone: JSON.parse(localStorage.getItem('user')).u_phone,
              password: this.confirmNewPwaaword
            })).then((res) => {
              //将查询的文件内容传到store的headpng属性
              if (res.data == true) {
                this.modal1 = true
              }
            })
          }
        }
      })
    },
    nameSubmit() {
      //实现修改名称方法  手机号+新名称
      this.$axios.post('http://localhost:8087//newUserName', this.$qs.stringify({
        U_phone: JSON.parse(localStorage.getItem('user')).u_phone,
        U_username: this.newNameValue
      })).then((res) => {
        console.log(res.data);
        //判断是否成功
        if (res.data == true) {
          //引用成功弹窗
          this.$Notice.success({
            title: '修改成功'
          });
          //传到store
          this.$store.commit('newUserNameFun', this.newNameValue)
          //修改localstorage的name
          var newUser = JSON.parse(localStorage.getItem('user'));
          console.log(newUser)
          newUser.u_username = this.newNameValue;
          console.log(newUser)
          localStorage.setItem("user", JSON.stringify(newUser));

        }
        //关闭窗口
        this.newName = false;
      })
    }
  },

}
</script>


<style>
@import "../../static/css/buy.css";
</style>