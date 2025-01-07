<script setup>
import {ref, onMounted, watch} from "vue";
import axios from "axios";
import Footer from "@/components/Footer.vue";
import router from "@/router";
import {useRouter} from "vue-router";
import {useMyStore} from "@/store/myStore";


let businessData = ref([]);
let isDisabled = ref(true);
let name = ref();
let address = ref();
let explain = ref();
let orderTypeId = ref();
let star = ref();
let delivery = ref();
let remark = ref();
let image = ref();
let myStore = useMyStore();

let orderTypeIdCheck=ref(0);


const router1 = useRouter();
const listenOrderTypeId = async ()=>{
  orderTypeIdCheck.value = Number(router1.currentRoute.value.params.orderTypeId);
}

const list = async () =>{
  if (orderTypeIdCheck.value === 0){
    try {
      const response = await axios.get('http://localhost:8080/business');
      if (response.data.code === 1) {
        businessData.value=response.data.data;
      }
    } catch (error) {
      console.error(error);
    }
  }else{
    try {
      const response = await axios.get(`http://localhost:8080/business/orderTypeId/${orderTypeIdCheck.value}`)
      if (response.data.code === 1){
        businessData.value = response.data.data;
      }
    }catch (error){
      console.log(error);
    }
  }
}

function show(){
  const button = document.querySelector(".insert");
  button.style.display = "flex";
}
function cancel(){
  const button1 = document.querySelector(".insert");
  button1.style.display = "none";

}

const check = () =>{
  return(
      !name.value ||
      !address.value ||
      !explain.value ||
      !orderTypeId.value ||
      !star.value ||
      !delivery.value
  );
};
watch([name, address, explain, image, orderTypeId, star, delivery], () => {
  isDisabled.value = check();
});



//跳转功能
function gotoBusinessInfo(businessId){
  router.push(`/businessInfo/${businessId}`);
}

onMounted(() => {
  listenOrderTypeId();
  list();
});
</script>

<template>
  <header class="businessHeader">商家列表</header>
  <div class="action">

  </div>
  <main>
    <div class="bus" v-for="(business,index) in businessData" :key = "index" >
      <div>
        <img :src="`../src/assets/image/${business.businessImg}`" alt="" @click="gotoBusinessInfo(business.businessId)">
      </div>
      <div>
        <p>{{business.businessName}}（{{business.businessAddress}}）</p>
        <p>{{business.starPrice}}起送 | ¥{{business.deliveryPrice}}配送</p>
        <p>{{business.businessExplain}}</p>
      </div>
      <div>
        <button @click="delete1(business.businessId)" v-show="false">删除商家</button>
      </div>
    </div>
    <div style="height: 15vw;"> </div>
  </main>
  <Footer></Footer>

</template>

<style scoped>
.insert{
  display: none;
  background-color: #bee0f3;
  //display: flex;
  flex-direction: column;
  justify-content:start;
  position: fixed;
  margin-top: 20vw;
  margin-left: 10vw;
  height: 120vw;
  width: 80vw;
}

.insert div{
  font-family: STSong ;
  font-size: 5vw;
  margin-top: 15px;
  display: flex;
  justify-content: left;
  margin-left: 10vw;
}
.insert div input{
  height: 8vw;
}
.button button {
  font-size: 4vw;
  height: 9vw;
  width: 14vw;
}
template{
  display: flex;
  height: 270vw;
  flex-direction: column;
}
.businessHeader{
  height: 12vw;
  width: 100vw;
  background-color: #0097FF;
  position: fixed;
  font-size: 5vw;
  text-align: center;
  line-height: 12vw;
  color: white;
  top: 0;
}
.action{
  margin-top: 15vw;
  display: flex;
  justify-content: space-around;
}
.action button{
  width: 15vw;
  height: 5vw;
  background-color: deepskyblue;
  color: white;
}
main{
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
}
.bus {
  margin-top: 2vw;
  margin-left: 2vw;
  display: flex;
  height: 23.5vw;
  border-bottom:solid #d7d4d4 0.1px;
}
.bus div:nth-child(1){
  display: flex;
}
.bus div:nth-child(1) img{
  width: 20vw;
  height: 20vw;
}
.bus div:nth-child(2){
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 1.8vw;
  margin-left: 1.4vw;
}
.bus div:nth-child(2) p:nth-child(1){
  font-size: 3.8vw;
  font-weight: 700;
  color: #555;
}
.bus div:nth-child(2) p:nth-child(2){
  font-size: 3vw;
  color: #888;
}
.bus div:nth-child(2) p:nth-child(3){
  font-size: 3vw;
  color: #888;
  margin-bottom: 2.5vw;
}
.bus div:nth-child(3) {
  margin-left:15vw;
}
.bus div:nth-child(3) button{
  background-color: deepskyblue;
  margin-top: 5vw;
  color: white;
  width: 15vw;
  height: 5vw;
  text-align: center;

}

</style>
