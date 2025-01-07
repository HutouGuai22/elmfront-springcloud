<script setup>

import Footer from "@/components/Footer.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import router from "@/router";
import {useMyStore} from "@/store/myStore";


const router1 = useRouter();
const myStore = useMyStore();
const orderId =ref(null);
let orderState = ref();

const businessName =ref();
const businessAddress = ref();
const deliveryPrice = ref();

const orderDetailets = ref([]);
const totalPrice = ref();
const getBusinessInfo = async () =>{
  try {
    const response = await axios.get(`http://localhost:8080/order/businessInfo/${orderId.value}`,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1){
      businessName.value = response.data.data.businessName;
      businessAddress.value = response.data.data.businessAddress;
      deliveryPrice.value = response.data.data.deliveryPrice;
    }
  }catch (error){
    console.error(error);
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
      orderState.value = response.data.data.orderState;
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

const pay = async () =>{
  try {
    if (orderState.value === 1){
      alert('您已支付过，无需再支付');
    }else{
      const data = {
        orderId:orderId.value,
        orderState:1,
      }
      const response = await axios.put('http://localhost:8080/orders',data,{
        headers:{
          Authorization:myStore.token,
        }
      });
      if (response.data.code === 1){
        alert('支付成功');
        await router.push('/index');
      }
    }
  }catch (error){
    console.error(error);
  }
}

const listenOrderId = async () =>{
  orderId.value = router1.currentRoute.value.params.orderId;
}

function back(){
  router.push('/orderList');
}

onMounted(()=>{
  listenOrderId();
  getBusinessInfo();
  getOrder();
  getOrderDetailets();
})
</script>

<template>
  <section>
    <header>在线支付</header>
    <main>
<!--      订单信息-->
      <div class="order">
        <div class="orderInfo">订单信息:</div>
        <div class="businessInfo">
          <p style="color: #666;">{{businessName}}({{businessAddress}})</p>
          <p style="color: orange">￥{{totalPrice}}</p>
        </div>
        <div style="color: #999;">订单明细:</div>
        <div class="orderDetail" v-for="(orders,index) in orderDetailets" :key="index">
          <p>{{orders.food.foodName}}({{orders.food.foodExplain}})</p>
          <p style="margin-right: 45vw;">x{{orders.quantity}}</p>
          <p>￥{{orders.food.foodPrice}}</p>
        </div>
        <div style="display: flex;justify-content: space-between;margin-top: 2vw;">
          <p>配送费</p>
          <p>￥{{deliveryPrice}}</p>
        </div>
      </div>
<!--      支付方式-->
      <div class="payWay">
        <div class="aliPay">
          <img src="../assets/image/alipay.png" alt="" style="width: 33vw;height: 9vw;">
          <img src="../assets/image/check.svg" alt="" style="width: 5vw;height: 5vw;">
        </div>
        <div class="wechatPay">
          <img src="../assets/image/wechat.png" alt="" style="width: 33vw;height: 9vw;">
        </div>
      </div>
<!--      确认支付-->
      <button class="surePay" @click="pay">确认支付</button>
      <button class="back" @click="back">取消支付</button>
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
main{
  display: flex;
  flex-direction: column;
  margin-top: 12vw;
}
.order{
  display: flex;
  flex-direction: column;
  padding: 3vw;
}
.orderInfo{
  color: #999;
  height: 10vw;
  line-height: 10vw;
}
.businessInfo{
  display: flex;
  justify-content: space-between;
  height: 10vw;
  align-items: center;
}
.orderDetail{
  display: flex;
  margin-top: 2vw;
  justify-content: space-between;
}
.payWay{
  display: flex;
  flex-direction: column;
  padding-left: 3vw;
  padding-right: 3vw;
}
.aliPay{
  display: flex;
  height: 15vw;
  align-items: center;
  justify-content: space-between;
}
.wechatPay{
  display: flex;
  height: 15vw;
  align-items: center;
  margin-top: 2vw;
}
.surePay{
  margin: 4vw;
  color: white;
  font-weight: 700;
  display: flex;
  height: 10vw;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 30px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  font-size: 5vw;
}
.back{
  margin: 4vw;
  font-weight: 700;
  display: flex;
  height: 10vw;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 30px;
  margin: 4vw 4vw 10px;
  cursor: pointer;
  background-color: white;
  color: #999999;
  font-size: 5vw;
  border: 1px solid #999999;
}
</style>
