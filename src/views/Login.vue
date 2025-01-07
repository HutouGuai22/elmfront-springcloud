<script setup>
import Footer from "@/components/Footer.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import router from "@/router";
import {useMyStore} from "@/store/myStore";

let userName= ref();
let password = ref();
let check = ref(false);

const myStore = useMyStore();


let userData=ref([]);

function checkState(){
  const main = document.querySelector('main');
  const info = document.querySelector('.userInfo');
  if (myStore.userId === null){
    info.style.display = 'none';
  }else{
    getInfo();
    main.style.display = 'none';
  }
}

const getInfo = async () =>{
  try {
    const response = await axios.get(`http://localhost:8080/userInfo/${myStore.userId}`,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1){
      userData.value = response.data.data;
    }
  }catch (error){
    console.error(error);
  }
}
//登录验证
const login = async ()=>{
  try {
    const data = {
      userName: userName.value,
      password: password.value,
    };
    // console.log(data);
    const response = await axios.post('http://localhost:8080/login', data);
    if (response.data.code ===1){
      alert("登录成功");
      check.value=true;
      const userId = response.data.data.userId;
      myStore.setUserId(userId);
      myStore.setToken(response.data.data.token);
      myStore.setDaId(null);
      userData.value= response.data.data;
      const main = document.querySelector('main');
      const info = document.querySelector('.userInfo');
      main.style.display='none';
      info.style.display='flex';
    }else{
      alert('用户名或密码错误');
    }
  } catch (error){
    console.error(error);
  }
}

//选择地址
function chooseAddr(){
  router.push(`/addressList/${myStore.userId}`);
}

//退出登录
function exit(){
  myStore.clearUserData();
  const main = document.querySelector('main');
  const info = document.querySelector('.userInfo');
  main.style.display='';
  info.style.display='none';
}
function register(){
  router.push('/register');
}

onMounted(()=>{
  checkState();
})
</script>

<template>
<section>
  <header>
    用户登录
  </header>
  <main>
<!--    用户名，密码-->
    <div class="info">
      <div class="name" style="margin-right: 10px ">
        <span>用户名:</span>
        <input type="text" v-model="userName" placeholder="请输入用户名">
      </div>
      <div class="password" style="margin-right: 10px ">
        <span>密码:</span>
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
    </div>
<!--    登录-->
    <button class="login" @click="login">登录</button>
<!--    注册-->
    <button class="register" @click="register">注册</button>
  </main>
  <div class="userInfo">
    <ul class="infoUl">
      <li class="userImg">用户头像: <img :src="`../src/assets/image/${userData.userImg}`" alt="" style="height: 20vw;width: 20vw;" > </li>
      <li class="userName">用户名: <p>{{userData.userName}}</p> </li>
      <li class="userSex">
        性别:
        <p v-if="userData.userSex === 1">男</p>
        <p v-else>女</p>
        </li>
    </ul>
    <button class="chooseAddress" @click="chooseAddr">选择收货地址</button>
    <button class="exit" @click="exit">退出登录</button>
  </div>
    <Footer></Footer>

</section>
</template>

<style scoped>
section{
  display: flex;
  height: 250vw;
  flex-direction: column;
}
header{
  height: 12vw;
  width: 100vw;
  background-color: #0097FF;
  position: fixed;
  font-size: 5vw;
  text-align: center;
  line-height: 12vw;
  color: white;
}
.info{
  display: flex;
  flex-direction: column;
  color: #666;
  font-weight: 700;
  font-size: 3vw;
  margin-bottom: 3vw;
  margin-top: 15vw;
}
.info input{
  outline-width: 0;
  font-size: 3vw;
  font-weight: 400;
  margin-left: 5vw;
}
.info div{
  display: flex;
  justify-content: start;
  height: 10vw;
  align-items: center;
  padding-left: 3vw;
}
.name input,
.password input {
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 4px;
  width: 10vw;
  flex: 5;
}
.name span,
.password span {
  flex:1;
}

.password{
  display: flex;
  justify-content: start;
  height: 10vw;
  align-items: center;
  padding-left: 3vw;
}
.password input{
  outline-width: 0;
  margin-left: 5vw;
  font-size: 3vw;
  font-weight: 400;
}
.login{
  width: 90vw;
  margin-left: 3vw;
  margin-right: 3vw;
  color: white;
  font-weight: 700;
  font-size: 4vw;
  display: flex;
  height: 10vw;
  background-color: #38CA73;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 4vw;
}
.register{
  width: 90vw;
  color: #666;
  font-weight: 700;
  font-size: 4vw;
  display: flex;
  margin-left: 3vw;
  margin-right: 3vw;
  height: 10vw;
  background-color: #EEE;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 4vw;
}
.userInfo{
  font-size: 6vw;
  display: flex;
  margin-top: 15vw;
  flex-direction: column;
}
.infoUl{
  margin-left: 4vw;
  margin-right: 4vw;
  display: flex;
  flex-direction: column;
}
.userImg{
  margin-bottom: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.userName{
  margin-bottom: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.userSex{
  margin-bottom: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.name{
  margin-bottom: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.chooseAddress{
  width: 90vw;
  margin-left: 3vw;
  margin-right: 3vw;
  color: white;
  font-weight: 700;
  font-size: 4vw;
  display: flex;
  height: 10vw;
  background-color: #38CA73;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 4vw;
}
.exit{
  width: 90vw;
  color: #666;
  font-weight: 700;
  font-size: 4vw;
  display: flex;
  margin-left: 3vw;
  margin-right: 3vw;
  height: 10vw;
  background-color: #EEE;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 4vw;
}
</style>
