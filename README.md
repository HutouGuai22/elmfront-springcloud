# 饿了么前端仿真项目（Vue3 + Vite）

## 项目简介

本项目为饿了么外卖平台的前端仿真实现，基于 Vue3、Vite、Pinia 等现代前端技术栈，包含用户注册、登录、商家浏览、下单、地址管理、订单管理等核心功能，适合作为前端学习和全栈实训项目。

## 主要功能

- 用户注册与登录
- 首页商家推荐与分类浏览
- 商家详情与商品展示
- 下单与支付流程
- 订单列表与订单详情
- 地址管理（增删改查）
- 服务熔断降级页面
- 响应式移动端布局

## 技术栈

- 框架：Vue 3
- 构建工具：Vite
- 路由管理：vue-router
- 状态管理：Pinia（含持久化插件 pinia-plugin-persist）
- UI与图标：@iconify/vue、FontAwesome
- 网络请求：axios
- 其它：qs

## 目录结构

```
├── public/                  # 公共资源
├── src/
│   ├── assets/              # 静态资源（图片、样式）
│   ├── components/          # 公共组件（如底部导航Footer）
│   ├── router/              # 路由配置
│   ├── store/               # 状态管理（Pinia）
│   ├── views/               # 主要页面
│   │   ├── addressManager/  # 地址管理相关页面
│   │   └── ...              # 其它业务页面
│   ├── App.vue              # 应用主组件
│   └── main.js              # 入口文件
├── package.json             # 项目依赖与脚本
├── vite.config.js           # Vite 配置
└── jsconfig.json            # 路径别名配置
```

## 安装与启动

1. **安装依赖**

   ```bash
   npm install
   ```

2. **本地开发启动**

   ```bash
   npm run dev
   ```

   默认端口为 `5173`，可通过 Vite 配置修改。

3. **生产环境构建**

   ```bash
   npm run build
   ```

4. **预览构建结果**

   ```bash
   npm run preview
   ```

## 依赖说明

详见 `package.json`，主要依赖如下：

- `vue`、`vue-router`、`pinia`、`pinia-plugin-persist`
- `axios`、`qs`
- `@iconify/vue`
- `vite`、`@vitejs/plugin-vue`、`vite-plugin-vue-devtools`

## 状态管理

- 使用 Pinia 进行全局状态管理，`src/store/myStore.js` 负责用户信息、token、地址ID等的持久化存储。
- 持久化方案采用 `pinia-plugin-persist`，数据存储于 `localStorage`。

## 路由与页面

- 路由集中配置于 `src/router/index.js`，包含首页、商家列表、商家详情、登录注册、地址管理、订单、支付、熔断等页面。
- 主要页面位于 `src/views/` 目录，地址管理相关页面在 `src/views/addressManager/`。
