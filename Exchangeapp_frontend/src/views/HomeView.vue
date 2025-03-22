<template>
  <el-container class="home-container" @mouseover="showMenu = true" @mouseleave="showMenu = false">
    <div class="content-wrapper">
      <h1 class="title">欢迎使用货币兑换平台</h1>
      <p class="description">请选择上方的功能进行操作。</p>
      <div class="chart-wrapper enlarged" @mouseover="growChart" @mouseleave="shrinkChart">
        <canvas id="exchangeRateChart"></canvas>
      </div>
      <transition name="fade">
        <div class="menu-container" v-if="showMenu">
          <el-menu :default-active="activeIndex" class="menu" mode="horizontal" :ellipsis="true">
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="currencyExchange">兑换货币</el-menu-item>
            <el-menu-item index="news">查看新闻</el-menu-item>
            <el-menu-item index="login" v-if="!authStore.isAuthenticated">登录</el-menu-item>
            <el-menu-item index="register" v-if="!authStore.isAuthenticated">注册</el-menu-item>
            <el-menu-item index="logout" v-if="authStore.isAuthenticated">退出</el-menu-item>
          </el-menu>
        </div>
      </transition>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth'; // 确保路径正确
import Chart from 'chart.js/auto';
import type { Chart as ChartJSChart } from 'chart.js'; // 导入 Chart 类型

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const showMenu = ref(false);
const activeIndex = ref(route.name || 'home'); // 定义 activeIndex 并根据当前路由设置初始值

let myChart: ChartJSChart | null = null; // 为 myChart 指定明确的类型

onMounted(() => {
  const ctx = document.getElementById('exchangeRateChart') as HTMLCanvasElement;
  if (ctx) {
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['美元', '欧元', '英镑', '加元', '新加坡币', '港币'],
        datasets: [{
          label: '汇率 (基准: 100 人民币)',
          data: [0, 0, 0, 0, 0, 0], // Initial values set to 0
          backgroundColor: ['#3a8edb', '#ff6b6b', '#ffa500', '#32cd32', '#ff69b4', '#8a2be2'],
          borderColor: ['#3a8edb', '#ff6b6b', '#ffa500', '#32cd32', '#ff69b4', '#8a2be2'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 10000, // Increased duration to slow down the animation (0.5x original speed)
          easing: 'easeInOutBounce'
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#ffffff'
            }
          }
        }
      }
    });
  }
});

watch(route, (newRoute) => {
  activeIndex.value = newRoute.name || 'home'; // 监听路由变化并更新 activeIndex
});

const growChart = () => {
  if (myChart) {
    myChart.options.animation = {
      duration: 6000, // Increased duration to slow down the animation (0.5x original speed)
      easing: 'easeOutElastic'
    };
    myChart.data.datasets[0].data = [15.36, 14.10, 11.95, 12.50, 19.30, 12.85];
    myChart.update();
  }
};

const shrinkChart = () => {
  if (myChart) {
    myChart.options.animation = {
      duration: 6000, // Increased duration to slow down the animation (0.5x original speed)
      easing: 'easeOutElastic'
    };
    myChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0];
    myChart.update();
  }
};
</script> 


<style scoped>  
@keyframes gradientBackground {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.home-container {  
  display: flex;  
  justify-content: center;  
  align-items: center;  
  height: 100vh; 
  background: linear-gradient(135deg, #00c6ff, #0072ff, #00ffcc, #ff7e5f, #ff6b6b);
  background-size: 400% 400%;
  animation: gradientBackground 8s ease infinite;
  padding: 20px;  
  box-sizing: border-box;
  position: relative;
}  
  
.content-wrapper {  
  text-align: center;  
  max-width: 100%; 
  position: relative;
}  
  
.title {  
  font-size: 64px;  
  font-weight: bold;  
  margin-bottom: 20px;   
  background-image: linear-gradient(45deg, #ff0000, #ff8c00, #ffd700, #008000, #00ced1, #1e90ff, #8a2be2);
  -webkit-background-clip: text;
  color: transparent;
  background-size: 200% 200%;
  animation: rainbowText 6s linear infinite;
}  
  
.description {  
  color: #f0f0f0;  
  font-size: 18px;  
  line-height: 1.5;  
  margin-bottom: 30px;
}  

.chart-wrapper {
  width: 100%;
  max-width: 750px; /* Increased to 1.5 times the original size */
  height: 450px; /* Increased to 1.5 times the original size */
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-wrapper canvas {
  width: 90% !important;
  max-width: 600px; /* Adjusted for the new size */
}

.exchange-rate-wrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.exchange-rate {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 20px;
}

.el-icon {
  font-size: 24px;
}

.menu-container {
  display: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
