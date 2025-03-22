/* __placeholder__ */
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth'; // 确保路径正确
import Chart from 'chart.js/auto';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const showMenu = ref(false);
const activeIndex = ref(route.name || 'home'); // 定义 activeIndex 并根据当前路由设置初始值
let myChart = null; // 为 myChart 指定明确的类型
onMounted(() => {
    const ctx = document.getElementById('exchangeRateChart');
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
const __VLS_fnComponent = (await import('vue')).defineComponent({});
let __VLS_functionalComponentProps;
let __VLS_modelEmitsType;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    const __VLS_0 = {}.ElContainer;
    ({}.ElContainer);
    ({}.ElContainer);
    __VLS_components.ElContainer;
    __VLS_components.elContainer;
    __VLS_components.ElContainer;
    __VLS_components.elContainer;
    // @ts-ignore
    [ElContainer, ElContainer,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onMouseover': {} }, ...{ 'onMouseleave': {} }, ...{ class: ("home-container") }, }));
    const __VLS_2 = __VLS_1({ ...{ 'onMouseover': {} }, ...{ 'onMouseleave': {} }, ...{ class: ("home-container") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ 'onMouseover': {} }, ...{ 'onMouseleave': {} }, ...{ class: ("home-container") }, }));
    let __VLS_6;
    const __VLS_7 = {
        onMouseover: (...[$event]) => {
            __VLS_ctx.showMenu = true;
            // @ts-ignore
            [showMenu,];
        }
    };
    const __VLS_8 = {
        onMouseleave: (...[$event]) => {
            __VLS_ctx.showMenu = false;
            // @ts-ignore
            [showMenu,];
        }
    };
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("content-wrapper") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("description") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onMouseover: (__VLS_ctx.growChart) }, ...{ onMouseleave: (__VLS_ctx.shrinkChart) }, ...{ class: ("chart-wrapper enlarged") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({ id: ("exchangeRateChart"), });
    // @ts-ignore
    [growChart, shrinkChart,];
    const __VLS_9 = {}.transition;
    ({}.transition);
    ({}.transition);
    __VLS_components.Transition;
    __VLS_components.transition;
    __VLS_components.Transition;
    __VLS_components.transition;
    // @ts-ignore
    [Transition, Transition,];
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({ name: ("fade"), }));
    const __VLS_11 = __VLS_10({ name: ("fade"), }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    ({}({ name: ("fade"), }));
    if (__VLS_ctx.showMenu) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("menu-container") }, });
        const __VLS_15 = {}.ElMenu;
        ({}.ElMenu);
        ({}.ElMenu);
        __VLS_components.ElMenu;
        __VLS_components.elMenu;
        __VLS_components.ElMenu;
        __VLS_components.elMenu;
        // @ts-ignore
        [ElMenu, ElMenu,];
        const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({ defaultActive: ((__VLS_ctx.activeIndex)), ...{ class: ("menu") }, mode: ("horizontal"), ellipsis: ((true)), }));
        const __VLS_17 = __VLS_16({ defaultActive: ((__VLS_ctx.activeIndex)), ...{ class: ("menu") }, mode: ("horizontal"), ellipsis: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
        ({}({ defaultActive: ((__VLS_ctx.activeIndex)), ...{ class: ("menu") }, mode: ("horizontal"), ellipsis: ((true)), }));
        const __VLS_21 = {}.ElMenuItem;
        ({}.ElMenuItem);
        ({}.ElMenuItem);
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        // @ts-ignore
        [ElMenuItem, ElMenuItem,];
        const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({ index: ("home"), }));
        const __VLS_23 = __VLS_22({ index: ("home"), }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        ({}({ index: ("home"), }));
        // @ts-ignore
        [showMenu, activeIndex,];
        (__VLS_26.slots).default;
        const __VLS_26 = __VLS_pickFunctionalComponentCtx(__VLS_21, __VLS_23);
        const __VLS_27 = {}.ElMenuItem;
        ({}.ElMenuItem);
        ({}.ElMenuItem);
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        // @ts-ignore
        [ElMenuItem, ElMenuItem,];
        const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({ index: ("currencyExchange"), }));
        const __VLS_29 = __VLS_28({ index: ("currencyExchange"), }, ...__VLS_functionalComponentArgsRest(__VLS_28));
        ({}({ index: ("currencyExchange"), }));
        (__VLS_32.slots).default;
        const __VLS_32 = __VLS_pickFunctionalComponentCtx(__VLS_27, __VLS_29);
        const __VLS_33 = {}.ElMenuItem;
        ({}.ElMenuItem);
        ({}.ElMenuItem);
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        // @ts-ignore
        [ElMenuItem, ElMenuItem,];
        const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({ index: ("news"), }));
        const __VLS_35 = __VLS_34({ index: ("news"), }, ...__VLS_functionalComponentArgsRest(__VLS_34));
        ({}({ index: ("news"), }));
        (__VLS_38.slots).default;
        const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_33, __VLS_35);
        if (!__VLS_ctx.authStore.isAuthenticated) {
            const __VLS_39 = {}.ElMenuItem;
            ({}.ElMenuItem);
            ({}.ElMenuItem);
            __VLS_components.ElMenuItem;
            __VLS_components.elMenuItem;
            __VLS_components.ElMenuItem;
            __VLS_components.elMenuItem;
            // @ts-ignore
            [ElMenuItem, ElMenuItem,];
            const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({ index: ("login"), }));
            const __VLS_41 = __VLS_40({ index: ("login"), }, ...__VLS_functionalComponentArgsRest(__VLS_40));
            ({}({ index: ("login"), }));
            // @ts-ignore
            [authStore,];
            (__VLS_44.slots).default;
            const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_39, __VLS_41);
        }
        if (!__VLS_ctx.authStore.isAuthenticated) {
            const __VLS_45 = {}.ElMenuItem;
            ({}.ElMenuItem);
            ({}.ElMenuItem);
            __VLS_components.ElMenuItem;
            __VLS_components.elMenuItem;
            __VLS_components.ElMenuItem;
            __VLS_components.elMenuItem;
            // @ts-ignore
            [ElMenuItem, ElMenuItem,];
            const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({ index: ("register"), }));
            const __VLS_47 = __VLS_46({ index: ("register"), }, ...__VLS_functionalComponentArgsRest(__VLS_46));
            ({}({ index: ("register"), }));
            // @ts-ignore
            [authStore,];
            (__VLS_50.slots).default;
            const __VLS_50 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47);
        }
        if (__VLS_ctx.authStore.isAuthenticated) {
            const __VLS_51 = {}.ElMenuItem;
            ({}.ElMenuItem);
            ({}.ElMenuItem);
            __VLS_components.ElMenuItem;
            __VLS_components.elMenuItem;
            __VLS_components.ElMenuItem;
            __VLS_components.elMenuItem;
            // @ts-ignore
            [ElMenuItem, ElMenuItem,];
            const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({ index: ("logout"), }));
            const __VLS_53 = __VLS_52({ index: ("logout"), }, ...__VLS_functionalComponentArgsRest(__VLS_52));
            ({}({ index: ("logout"), }));
            // @ts-ignore
            [authStore,];
            (__VLS_56.slots).default;
            const __VLS_56 = __VLS_pickFunctionalComponentCtx(__VLS_51, __VLS_53);
        }
        (__VLS_20.slots).default;
        const __VLS_20 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
    }
    (__VLS_14.slots).default;
    const __VLS_14 = __VLS_pickFunctionalComponentCtx(__VLS_9, __VLS_11);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    let __VLS_3;
    let __VLS_4;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['home-container'];
        __VLS_styleScopedClasses['content-wrapper'];
        __VLS_styleScopedClasses['title'];
        __VLS_styleScopedClasses['description'];
        __VLS_styleScopedClasses['chart-wrapper'];
        __VLS_styleScopedClasses['enlarged'];
        __VLS_styleScopedClasses['menu-container'];
        __VLS_styleScopedClasses['menu'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                authStore: authStore,
                showMenu: showMenu,
                activeIndex: activeIndex,
                growChart: growChart,
                shrinkChart: shrinkChart,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
