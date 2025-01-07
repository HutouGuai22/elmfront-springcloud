import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMyStore = defineStore('myStore', () => {
    // 定义状态
    const userId = ref(null);
    const daId = ref(null);
    const token = ref(null);

    // 定义方法
    function setUserId(newUserId) {
        userId.value = newUserId;
    }

    function setDaId(newDaId) {
        daId.value = newDaId;
    }

    function setToken(newToken) {
        token.value = newToken;
    }

    function clearUserData() {
        userId.value = null;
        daId.value = null;
        token.value = null;
    }

    // 返回状态和方法
    return { userId, setUserId, daId, setDaId, token, setToken, clearUserData };
}, {
    persist: {
        enabled: true, // 启用持久化
        strategies: [
            {
                key: 'user', // 存储键名
                storage: localStorage, // 使用 localStorage
                paths: ['userId', 'daId', 'token'], // 持久化哪些数据
            }
        ]
    }
});
