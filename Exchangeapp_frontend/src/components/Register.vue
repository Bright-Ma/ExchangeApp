<template>
  <div class="auth-container">
    <el-form :model="form" class="auth-form" @submit.prevent="register">
      <el-form-item label="用户名" label-width="80px">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" label-width="80px">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-button type="primary" native-type="submit">注册</el-button>
    </el-form>
  </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../store/auth';
  import { ElMessage } from 'element-plus';
  
  const form = ref({
    username: '',
    password: '',
  });
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  const register = async () => {
    try {
      await authStore.register(form.value.username, form.value.password);
      router.push({ name: 'News' });
    } catch {
      ElMessage.error('注册失败，请重试。');
    }
  };
  </script>
  
  <style scoped>
@keyframes gradientBackground {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.auth-container {  
  display: flex;  
  justify-content: center;  
  align-items: center;  
  height: 100vh; 
  background: linear-gradient(135deg, #ff7e5f, #feb47b, #ff6b6b, #ff9a9e);
  background-size: 300% 300%;
  animation: gradientBackground 8s ease infinite;
  padding: 20px;  
  box-sizing: border-box;
}  
  
.auth-form {  
  width: 100%;  
  max-width: 400px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(6px);
}  

.el-form-item label {
  color: #ff6b6b;
  font-weight: bold;
}

.el-button {
  background-color: #ff6b6b;
  border-color: #ff6b6b;
}

.el-button:hover {
  background-color: #ff3b3b;
  border-color: #ff3b3b;
}

.el-input__inner {
  border-radius: 8px;
}

.el-input__inner::placeholder {
  color: #ffb6b9;
}
  </style>
