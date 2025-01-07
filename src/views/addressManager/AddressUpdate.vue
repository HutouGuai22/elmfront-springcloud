<script setup>
import Footer from "@/components/Footer.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {useMyStore} from "@/store/myStore";

let name = ref();
let sex = ref();
let tel = ref();
let addr = ref();
let userId = ref();
let daId = ref(null);

const myStore = useMyStore();

const getByDaId = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/addressList/daId/${daId.value}`, {
      headers: {
        Authorization: myStore.token,
      }
    });
    if (response.data.code === 1) {
      name.value = response.data.data.contactName;
      sex.value = response.data.data.contactSex;
      tel.value = response.data.data.contactTel;
      addr.value = response.data.data.address;
      userId.value = response.data.data.userId;
    } else {
      console.error(response.data.message);
    }

  } catch (error) {
    console.error(error)
  }
}

// 更新功能
const updateAddr = async () => {
  try {
    const data = {
      daId: daId.value,
      contactName: name.value,
      contactSex: sex.value,
      contactTel: tel.value,
      address: addr.value,
    }
    const response = await axios.put('http://localhost:8080/addressList', data, {
      headers: {
        Authorization: myStore.token,
      }
    });
    if (response.data.code === 1) {
      alert('更新成功!');
      router.push(`/addressList/${userId.value}`)
    }
  } catch (error) {
    console.error(error);
  }
}

// 跳转功能
const router = useRouter();
const listenAddressList = async () => {
  daId.value = router.currentRoute.value.params.daId;
}

function back() {
  router.push(`/addressList/${userId.value}`)
}

onMounted(() => {
  listenAddressList();
  getByDaId();
})
</script>

<template>
  <section>
    <header @click="back">编辑送货地址</header>
    <div style="height: 12vw; width: 100vw;"></div>
    <main>
      <div class="info">
        <div class="name">联系人:<input type="text" v-model="name" placeholder="请输入联系人"></div>
        <div class="sex">
          性别:
          <label>
            <input type="radio" checked="checked" name="sex" value="1" v-model="sex">男
          </label>
          <label>
            <input type="radio" v-model="sex" name="sex" value="0">女
          </label>
        </div>
        <div class="tel">电话:<input type="text" v-model="tel" placeholder="请输入电话号码"></div>
        <div class="address">收货地址:<input type="text" v-model="addr" placeholder="请输入收货地址"></div>
      </div>
      <div class="save">
        <button @click="updateAddr">更新</button>
      </div>
    </main>
    <Footer></Footer>
  </section>
</template>

<style scoped>
section {
  display: flex;
  height: 250vw;
  flex-direction: column;
  background-color: #f9f9f9; /* 更清爽的背景色 */
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
  font-weight: 700;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

main {
  display: flex;
  flex-direction: column;
  padding: 14vw 5vw 0 5vw;
}

.info {
  display: flex;
  flex-direction: column;
}

.info div {
  margin-bottom: 3vw;
  font-weight: 600;
  font-size: 4vw;
  color: #4a4a4a;
}

.info div input {
  color: #333;
  font-size: 3.2vw;
  font-weight: 500;
  padding: 2vw;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  margin-left: 2vw;
  margin-top: 1vw;
}

.info .sex label {
  font-size: 3.5vw;
  color: #333;
  margin-right: 3vw;
}

.info .sex input {
  margin-right: 1vw;
  transform: scale(1.3);
}

.save {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12vw;
}

.save button {
  background-color: #38CA73;
  width: 90vw;
  height: 9vw;
  color: white;
  font-size: 3.6vw;
  font-weight: 600;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  border: none;
}

.save button:hover {
  background-color: #32a65a;
}

.save button:active {
  background-color: #2c914c;
}
</style>
