<template>
  <el-container>
    <el-main>
      <div v-if="articles && articles.length">
        <el-card v-for="article in articles" :key="article.ID" class="article-card">
          <h2>{{ article.Title }}</h2>
          <p>{{ article.Preview }}</p>
          <el-button text @click="viewDetail(article.ID)">阅读更多</el-button>
        </el-card>
      </div>
      <div v-else class="no-data">
        <p>您必须登录/注册才可以查看文章</p>
        <el-button type="primary" @click="redirectToLogin">立即登录</el-button>
        <el-button @click="redirectToRegister">注册新账户</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from '../axios';
import { useAuthStore } from '../store/auth';
import type { Article } from "../types/Article";

const articles = ref<Article[]>([]);
const router = useRouter();
const authStore = useAuthStore();

const fetchArticles = async () => {
  try {
    const response = await axios.get<Article[]>('/articles');
    articles.value = response.data;
  } catch (error) {
    console.error('Failed to load articles:', error);
  }
};

const viewDetail = (id: string) => {
  if (!authStore.isAuthenticated) {
    ElMessage.error('请先登录后再查看');
    return;
  }
  router.push({ name: 'NewsDetail', params: { id } });
};

const redirectToLogin = () => {
  router.push({ name: 'Login' });  // 假设你的登录页面路由名称是 Login
};

const redirectToRegister = () => {
  router.push({ name: 'Register' });  // 假设你的注册页面路由名称是 Register
};

onMounted(fetchArticles);
</script>

<style scoped>
.el-container {
  background: linear-gradient(135deg, #f0f2f5, #d0e1f9); /* 渐变背景 */
  min-height: 100vh; /* 确保背景填充 */
}

.article-card {
  margin: 20px 0;
  background-color: #ffffff; /* 白色卡片背景 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
}

.no-data {
  text-align: center;
  font-size: 1.2em;
  color: #999;
  padding: 50px 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.no-data p {
  font-size: 1.4em;
  color: #666;
}

.el-button {
  margin-top: 20px;
}

.no-data .el-button {
  margin-right: 10px;
}
</style>
