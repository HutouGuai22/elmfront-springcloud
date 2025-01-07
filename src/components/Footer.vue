<script setup>
import {Icon} from '@iconify/vue';
import router from "@/router";

function index() {
  router.push('/index');
}

function business() {
  router.push('/businessList/0');
}

function orderList() {
  router.push('/orderList');
}

function login() {
  router.push('/login');
}
</script>

<template>
  <footer>
    <div class="footer1" @click="index">
      <Icon icon="mdi:home" style="width: 6vw; height: 6vw;"/>
      <div>首页</div>
    </div>
    <div class="footer2" @click="business">
      <Icon icon="mdi:compass" style="width: 6vw; height: 6vw;"/>
      <div>发现</div>
    </div>
    <div class="footer3" @click="orderList">
      <Icon icon="mdi:clipboard-list" style="width: 6vw; height: 6vw;"/>
      <div>订单</div>
    </div>
    <div class="footer4" @click="login">
      <Icon icon="mdi:account" style="width: 6vw; height: 6vw;"/>
      <div>我的</div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 1vw;
  color: gray;
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  height: 14vw;
  border-top: solid gray 0.1px;
  justify-content: space-around;
  align-items: center;
  font-size: 2.8vw;
}

.footer1, .footer2, .footer3, .footer4 {
  text-align: center;
  line-height: 1;
}
</style>
