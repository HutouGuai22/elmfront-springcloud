<script setup>
import Footer from "@/components/Footer.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import router from "@/router";
import {useMyStore} from "@/store/myStore";

const router1 = useRouter();

let orderId =ref(null);

const totalPrice = ref();
const address = ref();
const contactName = ref();
const contactTel = ref();
const businessName =ref();
const businessAddress = ref();
const deliveryPrice = ref();
const myStore = useMyStore();

let orderDetailets = ref([]);


const getBusiness = async () =>{
  try {
    const response = await axios.get(`http://localhost:8080/order/businessInfo/${orderId.value}`,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1){
      console.log(response.data.data);
      businessName.value = response.data.data.businessName;
      businessAddress.value = response.data.data.businessAddress;
      deliveryPrice.value = response.data.data.deliveryPrice;
    }
  }catch (error){
    console.error(error)
  }
}

const getOrder = async () =>{
  try {
    const response = await axios.get(`http://localhost:8080/orders/${orderId.value}`,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1){
      totalPrice.value = response.data.data.orderTotal;
      address.value = response.data.data.deliveryAddress.address;
      contactName.value = response.data.data.deliveryAddress.contactName;
      contactTel.value = response.data.data.deliveryAddress.contactTel;
    }
  }catch (error){
    console.error(error)
  }
}

const getOrderDetailets =async () =>{
  try {
    const response = await axios.get(`http://localhost:8080/orderDetailet/${orderId.value}`,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1){
      console.log(response);
      orderDetailets.value = response.data.data;
    }
  }catch (error){
    console.error(escape);
  }
}

const listenOrderId = async () =>{
  orderId.value = router1.currentRoute.value.params.orderId;
}

//跳转功能
function gotoPayment(){
  router.push(`/payment/${orderId.value}`)
}

onMounted(()=>{
  listenOrderId();
  getBusiness();
  getOrderDetailets();
  getOrder();
})
</script>

<template>
  <section>
    <header>
      确认订单
    </header>
    <main>
<!--      订单配送地址-->
      <div class="addr">
        <div>订单配送至</div>
        <div class="address">
          <p>{{address}}</p>
        </div>
        <div style="display: flex">
          <p>{{contactName}} {{contactTel}}</p>
          <p style="margin-left: 1vw;"></p>
        </div>
      </div>
<!--        商品目录-->
        <div class="meu">
<!--          商家名-->
          <div class="business">{{businessName}}({{businessAddress}})</div>
<!--          商品列表-->
          <div class="foodList">
            <div class="foodInfo" v-for="(orderList,index) in orderDetailets" :key="index">
              <img :src="`../src/assets/image/${orderList.food.foodImg}`" alt="" style="width: 14vw; height: 14vw;">
              <div class="textInfo">
                <p>{{orderList.food.foodName}}({{orderList.food.foodExplain}})</p>
                <p>x{{orderList.quantity}} </p>
                <p style="margin-right: 2vw;">¥{{orderList.food.foodPrice}}</p>
              </div>
            </div>
          </div>
<!--          配送费-->
          <div class="delivery">
            <p>配送费</p>
            <p style="margin-right: 1.5vw;">￥{{deliveryPrice}}</p>
          </div>
        </div>
    </main>
<!--    结算栏-->
    <footer>
      <div class="totalMoney">￥{{totalPrice}}</div>
      <button class="gotoPay" @click="gotoPayment">去支付</button>
    </footer>
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
.addr{
  padding: 2vw;
  background-color: #0097FF;
  display: flex;
  margin-top: 12vw;
  height: 22vw;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  font-size: 3vw;
}
.address{
  font-size: 5vw;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
}
.meu{
  display: flex;
  flex-direction: column;
  font-size: 3.5vw;
  color: #666;
}
.business{
  height: 12vw;
  padding-left: 3vw;
  line-height: 12vw;
  color: #666;
  font-size: 4vw;
  font-weight: 700;
  border-bottom: solid #a9a8a8 1px;
}
.foodList{
  display: flex;
  flex-direction: column;
  padding: 3vw;
}
.foodInfo{
  display: flex;
  align-items: center;
  margin-bottom: 3vw;
}
.textInfo{
  display: flex;
  justify-content: space-between;
  margin-left: 3vw;
  margin-right: 3vw;
  width: 100vw;
}
.delivery{
  display: flex;
  margin-top: 5vw;
  justify-content: space-between;
  margin-left: 3vw;
  margin-right: 3vw;
}
footer{
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 14vw;
  display: flex;
  color: white;
  font-size: 4.5vw;
  font-weight: 700;
}
.totalMoney{
  background-color: #505051;
  flex: 2;
  text-align: center;
  line-height: 14vw;
}
.gotoPay{
  background-color: #38CA73;
  flex: 1;
  text-align: center;
  line-height: 14vw;
}
</style>
