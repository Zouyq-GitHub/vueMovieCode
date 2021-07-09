<template>
  <div id="box">
    <div class="login">
      <h1></h1>
      <form action="" method="POST">
        <div class="inp">
          <img class="icn" src="../../static/img/user.png" alt="" />
          <div class="inpc"><input type="text" placeholder="手机号" v-model="phone" /></div>
        </div>
        <div class="inp">
          <img class="icn" src="../../static/img/password.png" alt="" />
          <div class="inpc"><input type="password" placeholder="密码" v-model="password" /></div>
        </div>
        <div class="button">
          <button class="left_button" type="button" @click="login">登录</button>
          <button class="a" type="button" @click="goToRegister">注册</button>
        </div>
      </form>
      <div class="lookPassword" @click="lookPasswordFun()">忘记密码</div>
      <!-- 输入邮箱框 -->
      <Modal v-model="boxEmal" title="">
        <Input v-model="phoneValue" placeholder="输入手机号" style="width: 65%" />
        <br>
        <br>
        <Input v-model="mailValue" placeholder="输入邮箱" style="width: 65%" />
        <br>
        <br>
        <Button @click="mailSubmit">提交</Button>
      </Modal>

      <!-- 邮箱验证码 -->
      <Modal v-model="EmailNumberBox" title="">
        <Input v-model="EmailNumber" placeholder="输入邮箱验证码" style="width: 65%" />
        <br>
        <br>
        <Input v-model="newPassword" type="password" placeholder="输入新密码" style="width: 65%" />
        <br><br>
        <Button @click="newPasswordFun">提交</Button>
      </Modal>

      <!-- 密码找回与失败  -->
      <Modal v-model="modal1" title="">
        <p>{{notice}}</p>
      </Modal>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: null,
      password: null,
      boxEmal: false,
      phoneValue: "",
      mailValue: "",
      EmailNumberBox: false,
      modal1: false,
      notice: "修改成功",
      EmailNumber: "",
      newPassword: "",
      num: ""
    };
  },
  methods: {
    login() {
      //实现登录
      //整合axios  并且发送token过去
      this.$axios
        .post(
          "http://localhost:8087/loginSubmit",
          this.$qs.stringify({
            u_phone: this.phone,
            u_password: this.password,
            token: $.cookie("token"),
          })
        )
        .then(function (res) {
          console.log(res.data)
          //将接收到的用户数据存到localStorage中  如果返回用户名是空的 那就不做修改  还有头像和用户名state
          if (res.data.u_username != null) {
            localStorage.setItem("user", JSON.stringify(res.data));
            // console.log($store)
            // this.$store.commit('showPeople', res.data.u_headImg);
            // console.log(this.$store.state.userImg)
          }
          //取user数据
          // console.log(JSON.parse(localStorage.getItem('user')))
          //Cookie   设置时间  大约10分钟  expires和天数比是 1:1
          $.cookie("token", res.data.token, { expires: 0.005 });
          //删除cookie
          // $.cookie("token",null)

          //判断res是否有数 跳转到主页
          if (res.data.token == null) {
            location.href = "http://8.140.175.119:8080/#/login"
          } else {
            location.href = "http://8.140.175.119:8080/#/"
          }
          //---
        })
        .catch(function (res) {
        });
    },
    goToRegister() {
      location.href = "http://8.140.175.119:8080/#/register";
    },
    lookPasswordFun() {
      //忘记密码框
      this.boxEmal = true;
    },
    //发送邮箱
    mailSubmit() {
      //生成随机数
      var Range = 999999 - 1;
      var Rand = Math.random();
      var num = 1 + Math.round(Rand * Range);
      //把验证码赋值一下
      this.num = num;
      //发送数据
      this.$axios.post('http://localhost:8087//TestSendHtmlMail',
        this.$qs.stringify({
          to: this.mailValue,
          subject: "ROC-视频",
          content: num,
        })).then((res) => {
        })
      //关闭当前窗口打开新的窗口
      this.boxEmal = false;
      this.EmailNumberBox = true;
    },
    //根据邮箱验证码判断并决定是否修改新密码
    newPasswordFun() {
      //验证验证码是否符合
      if (this.num == this.EmailNumber) {
        //根据手机号让用户输入新密码
        this.$axios.post('http://localhost:8087//submitNewPassword',
          this.$qs.stringify({
            phone: this.phoneValue,
            password: this.newPassword
          })).then((res) => {
            console.log(res.data)
            if (res.data == true) {
              //修改成功给提示
              this.EmailNumberBox = false;
              this.modal1 = true;
              this.notice = "修改成功"
            }
          })
      }
      else {
        this.EmailNumberBox = false;
        this.modal1 = true;
        this.notice = "修改失败"
      }
    }
  },
};
</script>

<style>
@import "../../static/css/login.css";
body {
  color: gray;
}
form {
  display: inline-block !important;
  position: relative;
  right: 5px;
}
</style>