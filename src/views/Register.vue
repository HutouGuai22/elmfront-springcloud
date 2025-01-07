<script setup>
import Footer from "@/components/Footer.vue";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";


let userName = ref();
let password1 = ref();
let password2 = ref();
let sex = ref(1);

const register = async () => {
  if (!password1.value || !password2.value) {
    alert('密码不能为空');
    return;
  }
  if (password1.value === password2.value) {
    try {
      const data = {
        userName: userName.value,
        password: password1.value,
        userSex: sex.value,
      };
      const response = await axios.post('http://localhost:8080/register', data);
      if (response.data.code === 1) {
        await router.push('/login');
        alert('注册成功');
      }else {
        alert("该用户名已被注册");
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    alert('两次密码不一致');
  }
};

function back(){
  router.push('/login');
}
</script>

<template>
  <section>
    <header @click="back">
      <i class="back-icon"><</i>
      <span class="title">用户注册</span>
    </header>
    <main>
      <!-- 用户名，密码，确认密码，性别-->
      <div class="information">
        <div class="username" style="margin-right: 10px ">
          <span>用户名:</span>
          <input type="text" v-model="userName">
        </div>
        <div class="password1" style="margin-right: 10px">
           <span>密码:</span>
          <input type="password" v-model="password1" >
        </div>
        <div class="password2" style="margin-right: 10px">
          <span>确认密码:</span>
          <input type="password" v-model="password2" >
        </div>
        <div class="sex">
          性别:<input type="radio" v-model.number="sex" value="1" name="sex" checked="checked" style="margin-left: 12vw;">男
          <input type="radio" v-model.number="sex" value="0" name="sex" style="margin-left: 3vw;">女
        </div>
        <!-- 注册-->
        <button class="register" @click="register">注册</button>
      </div>
    </main>
    <Footer></Footer>
  </section>
</template>

<style scoped>
section{
  display: flex;
  height: 250vw;
  flex-direction: column;
}
header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12vw;
  width: 100vw;
  background-color: #0097FF;
  position: fixed;
  font-size: 5vw;
  color: white;
}

.back-icon {
  position: absolute;
  left: 2vw;
}

.title {
  flex-grow: 1;
  text-align: center;
}
.username input,
.password1 input,
.password2 input {
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 4px;
  width: 60vw;
  flex: 5
}
.information div span {
  flex: 1;
}
.information{
  display: flex;
  flex-direction: column;
  color: #666;
  font-weight: 700;
  font-size: 3vw;
  margin-bottom: 3vw;
  margin-top: 15vw;
}
.information div{
  display: flex;
  justify-content: start;
  height: 10vw;
  align-items: center;
  padding-left: 3vw;
}
.information input{
  outline-width: 0;
  font-size: 3vw;
  font-weight: 400;
  margin-left: 5vw;

}
.register{
  margin-left: 5vw;
  margin-right: 3vw;
  width: 90vw;
  color: white;
  font-weight: 700;
  display: flex;
  height: 10vw;
  background-color: #38CA73;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
}
</style>
