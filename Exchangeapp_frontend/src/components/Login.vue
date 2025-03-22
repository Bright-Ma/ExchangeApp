<template>  
  <div class="auth-container full-screen">  
    <el-form :model="form" class="auth-form" @submit.prevent="login">  
      <el-form-item label="用户名" label-width="80px">  
        <el-input v-model="form.username" placeholder="请输入用户名" />  
      </el-form-item>  
      <el-form-item label="密码" label-width="80px">  
        <el-input v-model="form.password" type="password" placeholder="请输入密码" />  
      </el-form-item>  
      <el-form-item>  
        <el-button type="primary" native-type="submit">登录</el-button>  
      </el-form-item>  
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

const login = async () => {
  try {
    await authStore.login(form.value.username, form.value.password);
    router.push({ name: 'News' });
  } catch {
    ElMessage.error('登录失败，请检查用户名和密码。');
  }
};
</script>
  
<style scoped>
@keyframes gradientBackground {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes movingLine {
  0% { left: 0%; }
  50% { left: 50%; }
  100% { left: 100%; }
}

.auth-container {  
  display: flex;  
  justify-content: center;  
  align-items: center;  
  height: 100vh; 
  width: 100vw;
  background: linear-gradient(135deg, #3a8edb, #1e90ff, #00bfff, #ffa07a, #ff7f50);
  background-size: 300% 300%;
  animation: gradientBackground 10s ease infinite;
  padding: 20px;  
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}  

.auth-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
  animation: movingLine 5s linear infinite;
}  
  
.auth-form {  
  width: 100%;  
  max-width: 400px; /* 略微增大表单宽度 */
  padding: 30px;  /* 增加内边距，改善视觉效果 */
  background: rgba(255, 255, 255, 0.9);  /* 半透明白色背景 */
  border-radius: 12px;  /* 更大的圆角使视觉更柔和 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);  /* 增强的阴影效果 */
  backdrop-filter: blur(8px); /* 增加模糊效果，提升背景的立体感 */
  position: relative;
  z-index: 1;
}  

.el-form-item label {
  color: #1e3a8a; /* 使用深蓝色的标签文字 */
  font-weight: bold;
}

.el-button {
  background-color: #3a8edb;
  border-color: #3a8edb;
}

.el-button:hover {
  background-color: #1e3a8a;
  border-color: #1e3a8a;
}

.el-input__inner {
  border-radius: 8px; /* 输入框圆角 */
}

.el-input__inner::placeholder {
  color: #b0c4de; /* 调整占位符颜色，显得柔和些 */
}
</style>
