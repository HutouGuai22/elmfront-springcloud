<script setup>
import Footer from "@/components/Footer.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router";
import { useRouter } from "vue-router";
import { useMyStore } from "@/store/myStore";

const myStore = useMyStore();
const userId = myStore.userId;
let orderDataNotPay = ref([]);
let orderDataPay = ref([]);

function check() {
  if (userId === null) {
    alert('请先登录');
    router.push('/login');
  } else {
    listOrderNotPay();
    listOrderPay();
  }
}

const listOrderNotPay = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/orderListNotPay/${userId}`, {
      headers: {
        Authorization: myStore.token,
      },
    });
    if (response.data.code === 1) {
      orderDataNotPay.value = response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const listOrderPay = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/orderListPay/${userId}`, {
      headers: {
        Authorization: myStore.token,
      }
    });
    if (response.data.code === 1) {
      orderDataPay.value = response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteOrders = async (orderId) => {
  try {
    const response = await axios.delete(`http://localhost:8080/orders/${orderId}`, {
      headers: {
        Authorization: myStore.token,
      }
    });
    if (response.data.code === 1) {
      alert('删除订单成功');
      listOrderNotPay();
      listOrderPay();
    } else {
      console.log(response.data.msg);
    }
  } catch (error) {
    console.error(error);
  }
};

const router1 = useRouter();
const gotoPayment = (orderId) => {
  router1.push(`/payment/${orderId}`);
};

onMounted(() => {
  check();
});
</script>

<template>
  <section>
    <header>我的订单</header>
    <main>
      <!-- 未支付订单 -->
      <div class="notPay">
        <p class="noPayInfo">未支付订单信息:</p>
        <div class="notPayBusiness" v-for="(orderNotPay, index) in orderDataNotPay" :key="index">
          <div class="notPayHeader">
            <div class="notPayName">
              <p>{{ orderNotPay.business.businessName }} ({{ orderNotPay.business.businessAddress }})</p>
            </div>
            <div class="notPayPrice">
              <p class="totalPrice">￥{{ orderNotPay.orderTotal }}</p>
              <button class="goPay" @click="gotoPayment(orderNotPay.orderId)">去支付</button>
            </div>
          </div>
          <div class="notPayDetails">
            <div v-for="(orderDetailed, index1) in orderNotPay.orderDetailetList" :key="index1" class="orderDetailItem">
              <p>{{ orderDetailed.food.foodName }} ({{ orderDetailed.food.foodExplain }}) x{{ orderDetailed.quantity }}</p>
              <p class="foodPrice">￥{{ orderDetailed.food.foodPrice }}</p>
            </div>
            <div class="delivery">
              <p>配送费</p>
              <p class="deliveryPrice">￥{{ orderNotPay.business.deliveryPrice }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 已支付订单 -->
      <div class="pay">
        <p class="payInfo">已支付订单信息:</p>
        <div class="payBusiness" v-for="(orderPay, index) in orderDataPay" :key="index">
          <div class="payHeader">
            <div class="payName">
              <p>{{ orderPay.business.businessName }} ({{ orderPay.business.businessAddress }})</p>
            </div>
            <div class="payPrice">
              <p class="totalPrice">￥{{ orderPay.orderTotal }}</p>
            </div>
          </div>
          <div class="payDetails">
            <div v-for="(orderDetailed, index1) in orderPay.orderDetailetList" :key="index1" class="orderDetailItem">
              <p>{{ orderDetailed.food.foodName }} ({{ orderDetailed.food.foodExplain }}) x{{ orderDetailed.quantity }}</p>
              <p class="foodPrice">￥{{ orderDetailed.food.foodPrice }}</p>
            </div>
            <div class="delivery">
              <p>配送费</p>
              <p class="deliveryPrice">￥{{ orderPay.business.deliveryPrice }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  height: auto;
  background-color: #f9f9f9;
}
header {
  height: 12vw;
  width: 100vw;
  background-color: #0097FF;
  position: fixed;
  font-size: 5vw;
  text-align: center;
  line-height: 12vw;
  color: white;
  top: 0;
  z-index: 100;
}
main {
  margin-top: 12vw;
  padding: 0 5vw;
  display: flex;
  flex-direction: column;
  margin-bottom: 14vw;
}
.notPay, .pay {
  display: flex;
  flex-direction: column;
  margin-top: 4vw;
}
.noPayInfo, .payInfo {
  font-size: 4vw;
  color: #666;
  font-weight: 600;
}
.notPayBusiness, .payBusiness {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2vw;
  margin-top: 3vw;
}
.notPayHeader, .payHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
}
.notPayName, .payName {
  font-size: 4vw;
  color: #333;
  font-weight: 500;
}
.notPayPrice, .payPrice {
  font-size: 4vw;
  color: #333;
}
.totalPrice {
  font-size: 5vw;
  color: #ff9900;
  font-weight: 700;
}
.goPay {
  background-color: #28a745; /* 绿色 */
  color: white;
  border-radius: 10px;
  padding: 0.8vw 2.5vw;
  font-size: 3.5vw; /* 修改文字大小为3.5vw */
  cursor: pointer;
}
.goPay:hover {
  background-color: #218838; /* 悬停时变深 */
}
.notPayDetails, .payDetails {
  margin-top: 2vw;
}
.orderDetailItem {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5vw;
  font-size: 3.5vw;
  color: #666;
}
.foodPrice, .deliveryPrice {
  color: #ff9900;
}
.delivery {
  display: flex;
  justify-content: space-between;
  font-size: 4vw;
  margin-top: 2vw;
  font-weight: 500;
}
</style>
