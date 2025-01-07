<script setup>
import {onMounted, ref} from "vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useMyStore} from "@/store/myStore";
import {Icon} from '@iconify/vue';

const address = ref();
const searchValue = ref("搜索饿了么商家,商品名称");

let businessData = ref([]);

const myStore=useMyStore();
const daId = myStore.daId;
const userId =myStore.userId;

const getAddress = async () =>{
  try {
    if (daId === null){
      address.value = '请选择地址';
    }else{
      const response = await axios.get(`http://localhost:8080/addressList/daId/${daId}`,{
        headers:{
          Authorization:myStore.token,
        }
      })
      if (response.data.code === 1){
        address.value = response.data.data.address;
      }
    }
  }catch (error){
    console.error(error);
  }

}

//选择地址
function chooseAddress(){
  if (userId != null){
    router.push(`/addressList/${userId}`);
  }else {
    alert('请先登录');
    router.push('/login');
  }

}

const listAll = async () => {
  try {
    const response = await axios.get('http://localhost:8080/business');
    if (response.data.code === 1) {
      businessData.value=response.data.data;
    }
  }catch (error) {
    console.error(error);
  }
};

// 搜索
const search = async () =>{
  try {
    const response = await axios.get(`http://localhost:8080/business/search/${searchValue.value.trim()}`)
    if (response.data.code === 1){
      businessData.value = response.data.data;
    }
  }catch (error){
    console.log(error);
  }
}

// 根据orderTypeId筛选商家
const getOrderTypeId = async (id) =>{
  router.push(`/businessList/${id}`)
}

//跳转功能
const router = useRouter();
const goToBusinessInfo = (businessId) => {
  router.push(`/businessInfo/${businessId}`);
};


onMounted(() => {
  listAll();
  getAddress();
});
</script>

<template>
  <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
  <section>
    <main>
      <header @click="chooseAddress">
        <div class="header">
          <Icon icon="mdi:map-marker" style="font-size: 6vw; color: white;" />
          <p>{{address}}</p>
          <Icon icon="mdi:menu-down" style="font-size: 8vw; color: white;" />
        </div>
      </header>
      <!--搜索-->
      <!-- search部分 -->
      <div class="search">
        <div class="search-fixed-top" id="fixedBox">
          <div class="search-box">
            <i class="fa fa-search"></i>搜索饿了么商家、商品名称
          </div>
        </div>
      </div>


      <!--点餐分类-->
      <ul class="order">
        <li>
          <img src="../assets/image/dcfl01.png" alt="" @click="getOrderTypeId(1)">
          <p>美食</p>
        </li>
        <li>
          <img src="../assets/image/dcfl02.png" alt="" @click="getOrderTypeId(2)">
          <p>早餐</p>
        </li>
        <li>
          <img src="../assets/image/dcfl03.png" alt="" @click="getOrderTypeId(3)">
          <p>跑腿代购</p>
        </li>
        <li>
          <img src="../assets/image/dcfl04.png" alt="" @click="getOrderTypeId(4)">
          <p>汉堡披萨</p>
        </li>
        <li>
          <img src="../assets/image/dcfl05.png" alt="" @click="getOrderTypeId(5)">
          <p>甜品饮品</p>
        </li>
        <li>
          <img src="../assets/image/dcfl06.png" alt="" @click="getOrderTypeId(6)">
          <p>速食简餐</p>
        </li>
        <li>
          <img src="../assets/image/dcfl07.png" alt="" @click="getOrderTypeId(7)">
          <p>地方小吃</p>
        </li>
        <li>
          <img src="../assets/image/dcfl08.png" alt="" @click="getOrderTypeId(8)">
          <p>米粉面馆</p>
        </li>
        <li>
          <img src="../assets/image/dcfl09.png" alt="" @click="getOrderTypeId(9)">
          <p>包子粥铺</p>
        </li>
        <li>
          <img src="../assets/image/dcfl10.png" alt="" @click="getOrderTypeId(10)">
          <p>炸鸡炸串</p>
        </li>
      </ul>
      <!--横幅广告-->
      <div class="ad">
        <h3>品质套餐</h3>
        <p>搭配齐全吃得好</p>
        <a>立即抢购></a>
      </div>
      <!--超级会员-->
      <div class="vip">
        <img src="../assets/image/super_member.png" alt="">
        <h3>超级会员</h3>
        <p style="margin-left: 2vw;">&#8226; 每月享超值权益</p>
        <p style="margin-left: 20vw;">立即开通 &gt;</p>
      </div>
      <!--推荐方式-->
      <div style="margin-top: 16px;height: 40px;">
        <p style="text-align: center;font-size:large">—&emsp;推荐商家&emsp;—</p>
      </div>
      <ul class="recommend">
        <li>综合排序</li>
        <li>距离最近</li>
        <li>销量最高</li>
        <li>筛选</li>
      </ul>
      <!-- 商家列表 -->
      <ul class="business">
        <li v-for="(business, index) in businessData" :key="index" @click="goToBusinessInfo(business.businessId)">
          <img :src="`../src/assets/image/${business.businessImg}`" alt="商家图片">
          <div class="business-info">
            <!-- 商家名称和地址 -->
            <div class="business-info-h">
              <h3>{{ business.businessName }}</h3>
              <div class="business-info-like">&#8226;</div>
            </div>

            <!-- 写死的星级和评分 -->
            <div class="business-info-star">
              <div class="business-info-star-left">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <p>4.9 月售345单</p>
              </div>
              <div class="business-info-star-right">
                蜂鸟专送
              </div>
            </div>

            <!-- 写死的配送信息 -->
            <div class="business-info-delivery">
              <p>&#165;15起送 | &#165;3配送</p>
              <p>3.22km | 30分钟</p>
            </div>

            <!--商家说明 -->
            <div class="business-info-explain">
              <div>{{ business.businessExplain }}</div>
            </div>

            <!-- 写死的活动信息 -->
            <div class="business-info-promotion">
              <div class="business-info-promotion-left">
                <div class="business-info-promotion-left-icon">新</div>
                <p>饿了么新用户首单立减9元</p>
              </div>
              <div class="business-info-promotion-right">
                <p>2个活动</p>
                <i class="fa fa-caret-down"></i>
              </div>
            </div>

            <!-- 写死的特价商品 -->
            <div class="business-info-promotion">
              <div class="business-info-promotion-left" style="background-color: lightblue">
                <div class="business-info-promotion-left-icon">特</div>
                <p>特价商品5元起</p>
              </div>
            </div>
          </div>
        </li>
      </ul>


      <div style="height: 15vw;"></div>
    </main>
    <Footer></Footer>
  </section>
</template>

<style scoped>
section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
  overflow: auto;
}

header {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 12vw;
}

.header{
  display: flex;
  align-items: center;
  font-size: 4.5vw;
  font-weight: 700;
  color: #fff;
  padding: 10px;
  background-color: #0097FF;
  width: 100vw;
}
.header img {
  height: 5vw;
  width: 5vw;
}
/******************* search *******************/
.search{
  width: 100%;
  height: 13vw;
}
.search .search-fixed-top{
  width: 100%;
  height: 13vw;
  background-color: #0097FF;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search .search-fixed-top .search-box{
  width: 90%;
  height: 9vw;
  background-color: #ffffff;
  border-radius: 2px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3.5vw;
  color: #aeaeae;
  font-family: "宋体";
  user-select: none;  /*此样式让文本选中状态无效*/
}
.search .search-fixed-top .search-box .fa-search{
  margin-right: 1vw;
}

.order {
  width: 100vw;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-around;
}
.order li {
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3vw;
}
.order li img {
  width: 12vw;
  height: 12vw;
}
.order li p {
  font-size: 2.8vw;
  --tw-text-opacity: 1;
  color: rgb(102 102 102 / var(--tw-text-opacity));
}
.ad {
  margin-top: 7vw;
  margin-left: 2vw;
  margin-right: 2vw;
  padding: 16px;
  height: 25vw;
  background-size: cover;
  background-image: url("../assets/image/index_banner.png");
}
.ad h3 {
  font-size: 4.2vw;
  font-weight: 800;
  margin-left: 3vw;
}
.ad p{
  color:#666;
  font-size: 3.5vw;
  margin-left: 3.5vw;
  margin-top: 1vw;
}
.ad a {
  color: #C79060;
  font-weight: 800;
  font-size: 3vw;
  margin-left: 3vw;
}
.vip {
  display: flex;
  margin: 8px 8px 0 8px;
  padding-top: 8px;
  height: 44px;
  background-color: #FEEDC1;
  align-items: center;
}
.vip img{
  width: 6vw;
  height: 6vw;
  margin-left: 4vw;
  margin-bottom: 1vw;
}
.vip h3 {
  font-size: 4vw;
  margin-left: 2vw;
  font-weight: 800;
  color: #644F1B;
}
.vip p {
  font-size: 3vw;
  color: #644F1B;
}
.recommend {
  margin-top: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: small;
  height: 5vw;
  color: #555;
}

/* 商家列表 */
.business {
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
}
.business li {
  display: flex;
  padding: 2.5vw;
  border-bottom: 1px solid #DDD;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
}
.business li img {
  width: 20vw;
  height: 20vw;
}
.business-info {
  width: 100%;
  padding-left: 3vw;
  box-sizing: border-box;
}

/* 商家名称和喜欢标志 */
.business-info .business-info-h {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
}
.business-info .business-info-h h3 {
  font-size: 4vw;
  color: #333;
  margin: 0;
}
.business-info .business-info-h .business-info-like {
  width: 1.6vw;
  height: 3.4vw;
  background-color: #666;
  color: #fff;
  font-size: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 星级评分部分 */
.business-info .business-info-star {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
  font-size: 3.1vw;
}
.business-info .business-info-star .business-info-star-left {
  display: flex;
  align-items: center;
}
.business-info .business-info-star .business-info-star-left .fa-star {
  color: #FEC80E;
  margin-right: 0.5vw;
}
.business-info .business-info-star .business-info-star-left p {
  color: #666;
  margin-left: 1vw;
}
.business-info .business-info-star .business-info-star-right {
  background-color: #0097FF;
  color: #fff;
  font-size: 3vw;
  border-radius: 2px;
  padding: 0 0.6vw;
}

/* 配送信息 */
.business-info .business-info-delivery {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
  font-size: 3.1vw;
  color: #666;
}

/* 商家说明部分 */
.business-info .business-info-explain {
  display: flex;
  align-items: center;
  margin-bottom: 3vw;
}
.business-info .business-info-explain div {
  border: solid 1px #DDD;
  font-size: 2.8vw;
  color: #666;
  border-radius: 3px;
  padding: 0 0.1vw;
}

/* 商家信息活动部分 */
.business-info .business-info-promotion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.8vw;
}

.business-info .business-info-promotion .business-info-promotion-left {
  display: flex;
  align-items: center;
  background-color: white; /* 背景色修复 */
  padding: 1vw;  /* 内边距增加，避免文字挤压 */
  border-radius: 5px; /* 增加圆角 */
}

.business-info .business-info-promotion .business-info-promotion-left .business-info-promotion-left-icon {
  width: 4vw;
  height: 4vw;
  background-color: #ffffff; /* 图标背景色保持与文字分开 */
  border-radius: 3px;
  font-size: 3vw;
  color: #F1884F;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5vw; /* 图标与文字之间的间距 */
}

.business-info .business-info-promotion .business-info-promotion-left p {
  color: black; /* 文字颜色 */
  font-size: 3vw;
  margin: 0; /* 移除默认的段落间距 */
}

.business-info .business-info-promotion .business-info-promotion-right {
  display: flex;
  align-items: center;
  font-size: 2.8vw;
  color: #999;
}

.business-info .business-info-promotion .business-info-promotion-right p {
  margin-right: 2vw;
}


</style>
