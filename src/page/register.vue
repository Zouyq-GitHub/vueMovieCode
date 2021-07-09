<template>
  <div id="box">
    <div class="login">
      <h1></h1>
      <form action="" method="POST">
        <div class="inp">
          <img class="icn" src="../../static/img/user.png" alt="" />
          <div class="inpc"><input type="text"  placeholder="手机号"  v-model="phone" /></div>
        </div>

        <div class="inp">
          <img class="icn" src="../../static/img/user.png" alt="" />
          <div class="inpc"><input type="text" placeholder="用户名"  v-model="name" /></div>
        </div>

        <div class="inp">
          <img class="icn" src="../../static/img/password.png" alt="" />
          <div class="inpc"><input type="password" placeholder="密码"  v-model="password" /></div>
        </div>

        <div class="gender">
          <RadioGroup v-model="gender">
            <Radio label="男"></Radio>
            <Radio label="女"></Radio>
          </RadioGroup>
        </div>

        <div class="button">
          <button class="left_button" type="button" @click="register">注册</button>
          <button class="a" type="button">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            phone:null,
            name:null,
            password:null,
            gender:null
        }
    },
    methods:{
        //注册方法
        register(){
            //axios
            this.$axios.post("http://localhost:8087/registerSubmit",
            this.$qs.stringify({
                u_phone:this.phone,
                u_username:this.name,
                u_password:this.password,
                u_gender:this.gender
            })
            ).then(function(res){
                console.log(res.data);
                if (res.data == "isOk") {
                    location.href="http://8.140.175.119:8080/#/login"
                }
            })
        }
    }
};
</script>

<style>
@import "../../static/css/login.css";
body {
  color: gray;
}
form {
  display: inline-block;
  position: relative;
  right: 5px;
}
.login{
    height: 472px;
}
</style>