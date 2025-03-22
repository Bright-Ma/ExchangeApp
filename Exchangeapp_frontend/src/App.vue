<template>
  <el-container>
    <el-header class="custom-header">
      <div class="header-content">
        <!-- 首页与Logo在同一行 -->
        <el-menu
          :default-active="activeIndex"
          class="menu-left"
          mode="horizontal"
          :ellipsis="true"
          @select="handleSelect"
        >
          <el-menu-item index="home">
            <img :src="logo" alt="Logo" class="logo-small" /> 首页
          </el-menu-item>
        </el-menu>
        <!-- 右侧菜单项 -->
        <el-menu
          :default-active="activeIndex"
          class="menu-right"
          mode="horizontal"
          :ellipsis="true"
          @select="handleSelect"
        >
          <el-menu-item index="currencyExchange">💱 兑换货币</el-menu-item>
          <el-menu-item index="news">📰 查看新闻</el-menu-item>
          <el-menu-item index="login" v-if="!authStore.isAuthenticated">🔑 登录</el-menu-item>
          <el-menu-item index="register" v-if="!authStore.isAuthenticated">✍️ 注册</el-menu-item>
          <el-menu-item index="logout" v-if="authStore.isAuthenticated">🚪 退出</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main class="main-content">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from './store/auth';
import logo from '@/assets/logo.png'; // 确保图片路径正确

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const activeIndex = ref(route.name?.toString() || 'home');

// 监听路由变化
watch(route, (newRoute) => {
  activeIndex.value = newRoute.name?.toString() || 'home';
});

// 处理菜单项选择
const handleSelect = (key: string) => {
  switch (key) {
    case 'logout':
      authStore.logout();
      router.push({ name: 'Home' });
      break;
    case 'login':
    case 'register':
    case 'home':
    case 'currencyExchange':
    case 'news':
      router.push({ name: key.charAt(0).toUpperCase() + key.slice(1) });
      break;
    default:
      console.warn('Unknown route:', key);
  }
};
</script>

<style scoped>
/* Header 样式 */
.custom-header {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 30px;
  display: flex;
  justify-content: space-between; /* 确保 logo 和菜单对齐 */
  align-items: center;           /* 中垂直对齐 */
}

/* Header 内部布局 */
.header-content {
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  width: 100%; /* 确保内容填满整个 Header */
}

/* 左侧菜单样式 */
.menu-left {
  flex: 1;  /* 占据剩余空间 */
  display: flex;
  align-items: center; /* 保证logo和文字垂直对齐 */
}

/* Logo 图片的具体样式 */
.logo-small {
  max-width: 2em;  /* 增大 logo 的大小 */
  height: auto;     /* 保持纵横比 */
  margin-right: 8px; /* 添加右边距，防止 logo 与菜单项挤在一起 */
}

/* 右侧菜单样式 */
.menu-right {
  display: flex;
  justify-content: flex-end; /* 将右侧菜单项靠右对齐 */
  align-items: center; /* 确保菜单垂直居中 */
}

/* 菜单项默认样式 */
.menu .el-menu-item {
  font-size: 1em; /* 设置菜单项字体大小 */
  color: #333;
  padding: 0 15px;
  transition: color 0.3s ease, background-color 0.3s ease;
}

/* 悬停时样式 */
.menu .el-menu-item:hover {
  color: #ffffff;
  background-color: #3a8edb;
  border-radius: 4px;
}

/* 激活菜单项样式 */
.menu .el-menu-item.is-active {
  color: #ffffff;
  background-color: #3a8edb;
  border-radius: 4px;
  font-weight: bold;
}

/* 点击按钮效果 */
.menu .el-menu-item:active {
  transform: scale(0.98);
}

/* 主内容样式 */
.main-content {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: calc(100vh - 60px);
}
</style>
