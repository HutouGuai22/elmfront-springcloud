<script setup>
import Footer from "@/components/Footer.vue";
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {useMyStore} from "@/store/myStore";

let name = ref('');
let sex = ref(1);
let tel = ref('');
let addr = ref('');

let userId = ref();

const myStore = useMyStore();


//增加地址
const addAddr= async() =>{
  try {
    const data={
      contactName:name.value,
      contactSex:Number(sex.value),
      contactTel:tel.value,
      address:addr.value,
      userId:userId.value,
    }
    const response = await axios.post('http://localhost:8080/addressList',data,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1){
      alert('添加成功');
      router.push(`/addressList/${userId}`)
    }
  }catch (error){
    console.error(error)
  }
}

//跳转功能
const router = useRouter();
const listenAddressList = async ()=>{
  userId.value = router.currentRoute.value.params.userId;
}

function back(){
  router.push(`/addressList/${userId.value}`)
}

onMounted(()=>{
  listenAddressList();
})
</script>

<template>
  <section>
    <header @click="back">新增送货地址</header>
    <div style="height: 12vw; width: 100vw;"></div>
    <main>
      <div class="info">
        <div class="name">联系人：
          <input type="text" v-model="name" placeholder="请输入联系人姓名" />
        </div>
        <div class="sex">
          性别：
          <input type="radio" checked="checked" name="sex" value="1" v-model="sex">男
          <input type="radio" v-model="sex" name="sex" value="0">女
        </div>
        <div class="tel">电话：
          <input type="text" v-model="tel" placeholder="请输入手机号" />
        </div>
        <div class="address">收货地址：
          <input type="text" v-model="addr" placeholder="请输入收货地址" />
        </div>
      </div>
      <div class="save">
        <button @click="addAddr">保存</button>
      </div>
    </main>
    <Footer></Footer>
  </section>
</template>

<style scoped>
/* 基本布局 */
section {
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: #f5f5f5;
}

/* 页头样式 */
header {
  height: 12vw;
  width: 100vw;
  background-color: #0097FF;
  position: fixed;
  font-size: 5vw;
  text-align: center;
  line-height: 12vw;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 主体部分 */
main {
  display: flex;
  flex-direction: column;
  padding-top: 15vw; /* 给头部留出空间 */
  padding-left: 5vw;
  padding-right: 5vw;
}

/* 表单输入区域 */
.info {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 5vw 4vw;
  margin-bottom: 3vw;
}

.info div {
  margin-bottom: 3vw;
  font-size: 3.8vw;
  color: #333;
}

.info div input {
  width: 100%;
  padding: 3vw 4vw;
  font-size: 3.5vw;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 1vw;
  color: #333;
  background-color: #fafafa;
}

.info div input:focus {
  border-color: #0097FF;
  outline: none;
  background-color: #f0f8ff;
}

/* 性别选择部分 */
.sex {
  display: flex; /* 使子元素横向排列 */
  align-items: center;
  font-size: 3.8vw;
  color: #333;
  flex-wrap: nowrap; /* 防止换行 */
}

.sex input {
  margin-left: 2vw;
  margin-right: 2vw;
  transform: scale(1.2);
}

/* 保存按钮样式 */
.save {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vw;
}

.save button {
  background-color: #38CA73;
  width: 90vw;
  height: 9vw;
  color: white;
  font-size: 3.5vw;
  font-weight: 600;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.save button:hover {
  background-color: #32b463;
}

/* 页脚样式 */
Footer {
  margin-top: 2vw;
}
</style>

