<script setup>
import { onMounted, ref } from "vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useMyStore } from "@/store/myStore";
import router from "@/router";

const addressData = ref();
const myStore = useMyStore();
const userId = myStore.userId;

const listAddress = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/addressList/${userId}`, {
      headers: {
        Authorization: myStore.token,
      }
    });
    if (response.data.code === 1) {
      addressData.value = response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteAddress = async (daId) => {
  try {
    const response = await axios.delete(`http://localhost:8080/addressList/${daId}`, {
      headers: {
        Authorization: myStore.token,
      }
    });
    if (response.data.code === 1) {
      alert("删除成功");
      listAddress(); // 删除后重新获取地址列表
    }
  } catch (error) {
    console.error(error);
  }
};

function setDaId(newDaId) {
  myStore.setDaId(newDaId);
  alert(`选择地址成功:${myStore.daId}`);
  router.back();
}

const router1 = useRouter();
const gotoAddressAdd = (userId) => {
  router1.push(`/addressAdd/${userId}`);
};

const router2 = useRouter();
const gotoAddressUpdate = (daId) => {
  router2.push(`/addressUpdate/${daId}`);
};

onMounted(() => {
  listAddress();
});
</script>

<template>
  <section>
    <header>地址管理</header>
    <div style="height: 12vw; width: 100vw;"></div>
    <main>
      <div class="address" v-for="(address1, index) in addressData" :key="index">
        <div class="userInfo">
          <div class="info">
            <p class="name">{{ address1.contactName }}</p>
            <p class="tel">{{ address1.contactTel }}</p>
          </div>
          <p class="addr">{{ address1.address }}</p>
        </div>
        <div class="image">
          <button @click="setDaId(address1.daId)" class="select-button">选择</button>
          <i @click="gotoAddressUpdate(address1.daId)" class="edit-icon">
            <!-- 铅笔图标 -->
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"></path>
              <path d="M17 3l4 4-10 10H7v-4l10-10z"></path>
            </svg>
          </i>
          <i @click="deleteAddress(address1.daId)" class="delete-icon">
            <!-- 叉叉图标 -->
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </i>

        </div>
      </div>
      <div class="addAddr" @click="gotoAddressAdd(userId)">
        <p>新增收货地址</p>
      </div>
    </main>
    <Footer/>
  </section>
</template>

<style scoped>
section {
  background-color: #f9f9f9;
  display: flex;
  height: 100vh;
  flex-direction: column;
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
  font-weight: bold;
}

main {
  flex: 1;
  padding-top: 14vw; /* 头部高度的间隙 */
  padding-left: 5vw;
  padding-right: 5vw;
}

.address {
  background-color: white;
  margin-bottom: 3vw;
  padding: 4vw;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info {
  display: flex;
  flex-direction: column;
  margin-bottom: 2vw;
}

.name, .tel, .addr {
  font-size: 4vw;
  color: #555;
  line-height: 5vw;
}

.addr {
  margin-top: 1vw;
}

.image {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.select-button {
  background-color: #38CA73;
  color: white;
  font-size: 3vw;
  padding: 1vw 2vw;
  border-radius: 5px;
  margin-right: 2vw;
  border: none;
  cursor: pointer;
}

.select-button:hover {
  background-color: #32a65a;
}

.select-button:active {
  background-color: #2c914c;
}

.edit-icon, .delete-icon {
  width: 6vw;
  height: 6vw;
  margin-left: 2vw;
  cursor: pointer;
}

.edit-icon:hover, .delete-icon:hover {
  opacity: 0.7;
}

.addAddr {
  background-color: white;
  margin-top: 4vw;
  padding: 3vw;
  text-align: center;
  border: 1px solid #0097EF;
  border-radius: 10vw;
  color: #0097EF;
  font-size: 4vw;
  cursor: pointer;
}

.addAddr:hover {
  background-color: #f2f9ff;
}

.addAddr:active {
  background-color: #e0f0ff;
}
</style>
