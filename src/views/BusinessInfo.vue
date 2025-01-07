<script setup>
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import router from "@/router";
import {useMyStore} from "@/store/myStore";

const businessId = ref(null);
const businessName = ref();
const businessAddress = ref();
const businessExplain = ref();
const businessImg = ref();
const starPrice =ref();
const deliveryPrice = ref();

let name = ref();
let explain = ref();
let image = ref();
let price = ref();
let remark = ref();
let isDisabled = ref(true);

let foodData = ref([]);
const myStore = useMyStore();
const userId = myStore.userId;
const daId = myStore.daId;

let total = ref();
let totalQuantity =ref();
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
      !explain.value ||
      !image.value ||
      !price.value
  );
};
watch([name, explain, image, price], () => {
  isDisabled.value = check();
});


//跳转功能
const router1 = useRouter();
const listenBusiness = async ()=>{
  businessId.value = router1.currentRoute.value.params.businessId;
  await listBusiness();
  await listFood();
}
//获取商家信息
const listBusiness = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/business/businessId/${businessId.value}`,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1) {
      businessName.value=response.data.data.businessName;
      businessAddress.value=response.data.data.businessAddress;
      businessExplain.value=response.data.data.businessExplain;
      businessImg.value=response.data.data.businessImg;
      starPrice.value=response.data.data.starPrice;
      deliveryPrice.value=response.data.data.deliveryPrice;
    }
  } catch (error) {
    console.error(error);
  }
};

//获取食品列表
const listFood = async () => {
  if (myStore.userId === null){
    try {
      const response = await axios.get(`http://localhost:8080/food/businessId/${businessId.value}`,{
        headers:{
          Authorization:myStore.token,
        }
      });
      if (response.data.code === 1) {
        foodData.value=response.data.data;
      }
    } catch (error) {
      console.error(error);
    }
  }else {
    try {
      const response = await axios.get(`http://localhost:8080/food/${businessId.value}/${userId}`,{
        headers:{
          Authorization:myStore.token,
        }
      });
      if (response.data.code === 1) {
        foodData.value=response.data.data;
      }
    } catch (error) {
      console.error(error);
    }
  }

};


//添加购物车
const addCart = async(foodId) =>{
  if (userId === null){
    console.log('null');
  }else{
    try {
      const response1 = await axios.get(`http://localhost:8080/food/getCart/${foodId}/${userId}`,{
        headers:{
          Authorization:myStore.token,
        }
      });
      if (response1.data.code === 1 && response1.data.data === null){
        const data = {
          userId:userId,
          foodId:foodId,
          businessId:businessId.value,
        }
        const response = await axios.post('http://localhost:8080/cart',data,{
          headers:{
            Authorization:myStore.token,
          }
        });
        if (response.data.code === 1){
          listFood();
          getTotal();
          getTotalQuantity();
        }
      }
    }catch (error){
      console.error(error)
    }
  }

}

// 添加数量
const addQuantity = async(cartId)=>{
  if (myStore.userId === null){
    alert("请先登录!");
    router.push('/login');
  }else{
    if (cartId !== null){
      try {
        const response = await axios.put(`http://localhost:8080/cart/addQuantity/${cartId}`,null,{
          headers:{
            Authorization:myStore.token,
          }
        });
        if (response.data.code === 1){
          listFood();
          getTotal();
          getTotalQuantity();
        }
      }catch (error){
        console.error(error);
      }
    }
  }

}

//减少数量
const substrateQuantity = async (cartId) =>{
  if (myStore.userId === null){
    alert("请先登录!");
    router.push('/login');
  }else{
    if (cartId !== null){
      try {
        const response = await axios.put(`http://localhost:8080/cart/substrateQuantity/${cartId}`,null,{
          headers:{
            Authorization:myStore.token,
          }
        });
        if (response.data.code === 1){
          listFood();
          getTotal();
          getTotalQuantity();
        }
      }catch (error){
        console.error(error)
      }
    }
  }

}

//总价格
const getTotal = async()=>{
  if (myStore.userId === null){
    total.value = 0;
  }else{
    try {
      const response = await axios.get(`http://localhost:8080/business/total/${businessId.value}/${userId}`,{
        headers:{
          Authorization:myStore.token,
        }
      });
      if (response.data.code === 1){
        total.value = response.data.data;

      }
    }catch (error){
      console.error(error);
    }
  }

}

//总数量
const getTotalQuantity= async()=>{
  if(myStore.userId === null){
    totalQuantity = 0;
  }else{
    try {
      const response = await axios.get(`http://localhost:8080/business/quantity/${businessId.value}/${userId}`,{
        headers:{
          Authorization: myStore.token,
        }
      });
      if (response.data.code === 1){
        totalQuantity.value = response.data.data;
      }
    }catch (error){
      console.error(error);
    }
  }
}

const gotoOrder = async () =>{
  if (userId === null){
    alert('请先登录!');
    router.push('/login');
  }else{
    if (daId === null){
      alert('请先选择地址')
      router.push(`/addressList/${userId}`);
    }else {
      try {
        if(total.value >= starPrice.value){
          const data = {
            userId:userId,
            businessId:businessId.value,
            orderTotal:total.value,
            daId:daId,
          }
          const response = await axios.post('http://localhost:8080/orders',data,{
            headers:{
              Authorization:myStore.token,
            }
          });
          if (response.data.code === 1){
            alert('success');
            router.push(`/order/${response.data.data}`)
          }else {
            alert(response.data.msg);
            router.push('/orderList');
          }
        }else {
          alert('商品总价未达到起送费!');
        }
      }catch (error){
        console.error(error);
      }
    }
  }
}




function back(){
  router.back();
}

onMounted(() => {
  listenBusiness();
  listBusiness();
  listFood();
  getTotal();
  getTotalQuantity();
});
</script>

<template>

  <section>
    <header @click="back">
      <i class="back-icon"><</i>
      <div >商家信息</div>
    </header>
    <main>
<!--      商家信息-->
      <div class="businessInfo">
        <img :src="`../src/assets/image/${businessImg}`" alt="">
        <h1>{{businessName}}（{{businessAddress}}）</h1>
        <h3>¥{{starPrice}}起送 ¥{{deliveryPrice}}配送</h3>
        <h3>{{businessExplain}}</h3>
      </div>
<!--      商品列表-->
      <div class="foodInfo">
        <div class="food" v-for="(food,index) in foodData" :key = "index" @click="addCart(food.foodId)" >
          <div class="picture">
            <img :src="`../src/assets/image/${food.foodImg}`" alt="">
            <div>
              <p>{{food.foodName}}</p>
              <p>{{food.foodExplain}}</p>
              <p>¥{{food.foodPrice}}</p>
            </div>
          </div>
          <div class="text" >
            <div class="substrate" @click="substrateQuantity(food.cart.cartId)"><img src="../assets/image/substrate.png" alt=""></div>
            <p>{{food.cart.quantity}}</p>
            <div class="add" @click="addQuantity(food.cart.cartId)"><img src="../assets/image/add.png" alt=""></div>
          </div>
        </div>
      </div>
    </main>
<!--    支付栏-->
    <footer>
      <div class="pay">
        <div class="shoppingCar">
          <img src="../assets/image/shopping.png" alt="">
          <div class="number">{{totalQuantity}}</div>
        </div>
        <div class="money">
          <p class="total">￥{{total}}</p>
          <p class="delivery">另需配送费{{deliveryPrice}}元</p>
        </div>
      </div>
      <div class="payment" @click="gotoOrder()">去结算</div>
    </footer>
  </section>

</template>

<style scoped>
.back-icon {
  position: absolute;
  left: 2vw;
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
section{
  display: flex;
  height: 250vw;
  flex-direction: column;
}
header{
  display: flex;
  justify-content: center;
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
  margin-top: 15vw;
}
.businessInfo{
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
}
.businessInfo img{
  width: 40vw;
  height: 30vw;
}
.businessInfo h1{
  font-size: 5vw;
  font-weight: 900;
  margin-top: 3vw;
  text-align: center;
}
.businessInfo h3 {
  color: gray;
  font-size: 4vw;
  margin-top: 3vw;
}
.foodInfo{
  display: flex;
  flex-direction: column;
  margin-bottom: 16vw;
}
.food{
  display: flex;
  margin-top: 4vw;
  margin-left: 2vw;
  justify-content: space-between;
  align-items: center;
}
.picture{
  margin-left: 2vw;
  display: flex;
}
.picture img{
  width: 20vw;
  height: 20vw;
}
.picture div{
  margin-left: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.picture div p:nth-child(1){
  font-weight: 600;
  color: #555;
  font-size: 3.8vw;
}
.picture div p{
  color: #888;
  font-size: 4vw;
}

.text{
  display: flex;
}
.substrate {
  width: 5vw;
  height: 5vw;
  border-radius: 5vw;
  margin-left: 2vw;
  margin-right: 2vw;
  background-color: #999;
}
.add{
  width: 5vw;
  height: 5vw;
  border-radius: 5vw;
  margin-left: 2vw;
  margin-right: 2vw;
  background-color: #0097EF;
}
.text img {
  width: 5vw;
  height: 5vw;
}
.text p{
  font-size: 3.6vw;
}
.delete{
  background-color: #0097EF;
  color: white;
  height: 6vw;
  width: 10vw;
  margin-left: 20vw;
}
.addFood{
  background-color: #0097FF;
  color: white;
  height: 9vw;
  width: 60vw;
  align-items: center;
  margin-left: 20vw;
  margin-top: 5vw;
}
footer{
  position: fixed;
  display: flex;
  width: 100vw;
  bottom: 0;
  height: 15vw;
}
.pay{
  display: flex;
  flex:2;
  background-color: #505051;
}
.shoppingCar{
  margin-top: -4vw;
  margin-left: 3vw;
  background-color: #3190E8;
  height: 16vw;
  width: 16vw;
  border: solid 1.6vw #444444;
  border-radius: 16vw;
}
.shoppingCar img {
  height: 7vw;
  width: 7vw;
  margin: 2.6vw;
}
.number {
  height: 5vw;
  width: 5vw;
  border-radius: 5vw;
  background-color: #FF0000;
  text-align: center;
  line-height: 5vw;
  font-size: 3.5vw;
  color: white;
  margin-top: -13vw;
  margin-left: 10vw;
}
.total{
  font-size: 4.5vw;
  color: #fff;
  margin-top: 1.5vw;
}
.delivery{
  font-size: 2.8vw;
  color: #AAA;
}
.payment{
  flex:1;
  background-color: #38CA73;
  color: white;
  font-size: 4.5vw;
  font-weight: 600;
  text-align: center;
  line-height: 15vw;
}
</style>
