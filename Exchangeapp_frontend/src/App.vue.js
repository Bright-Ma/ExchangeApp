/* __placeholder__ */
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from './store/auth';
import logo from '@/assets/logo.png'; // 确保图片路径正确
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const activeIndex = ref(route.name?.toString() || 'home');
// 监听路由变化
watch(route, (newRoute) => {
    activeIndex.value = newRoute.name?.toString() || 'home';
});
// 处理菜单项选择
const handleSelect = (key) => {
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
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({}));
    const __VLS_6 = {}.ElHeader;
    ({}.ElHeader);
    ({}.ElHeader);
    __VLS_components.ElHeader;
    __VLS_components.elHeader;
    __VLS_components.ElHeader;
    __VLS_components.elHeader;
    // @ts-ignore
    [ElHeader, ElHeader,];
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("custom-header") }, }));
    const __VLS_8 = __VLS_7({ ...{ class: ("custom-header") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({ ...{ class: ("custom-header") }, }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header-content") }, });
    const __VLS_12 = {}.ElMenu;
    ({}.ElMenu);
    ({}.ElMenu);
    __VLS_components.ElMenu;
    __VLS_components.elMenu;
    __VLS_components.ElMenu;
    __VLS_components.elMenu;
    // @ts-ignore
    [ElMenu, ElMenu,];
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ 'onSelect': {} }, defaultActive: ((__VLS_ctx.activeIndex)), ...{ class: ("menu-left") }, mode: ("horizontal"), ellipsis: ((true)), }));
    const __VLS_14 = __VLS_13({ ...{ 'onSelect': {} }, defaultActive: ((__VLS_ctx.activeIndex)), ...{ class: ("menu-left") }, mode: ("horizontal"), ellipsis: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    ({}({ ...{ 'onSelect': {} }, defaultActive: ((__VLS_ctx.activeIndex)), ...{ class: ("menu-left") }, mode: ("horizontal"), ellipsis: ((true)), }));
    let __VLS_18;
    const __VLS_19 = {
        onSelect: (__VLS_ctx.handleSelect)
    };
    const __VLS_20 = {}.ElMenuItem;
    ({}.ElMenuItem);
    ({}.ElMenuItem);
    __VLS_components.ElMenuItem;
    __VLS_components.elMenuItem;
    __VLS_components.ElMenuItem;
    __VLS_components.elMenuItem;
    // @ts-ignore
    [ElMenuItem, ElMenuItem,];
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ index: ("home"), }));
    const __VLS_22 = __VLS_21({ index: ("home"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    ({}({ index: ("home"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.logo)), alt: ("Logo"), ...{ class: ("logo-small") }, });
    // @ts-ignore
    [activeIndex, handleSelect, logo,];
    (__VLS_25.slots).default;
    const __VLS_25 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
    (__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    let __VLS_15;
    let __VLS_16;
    const __VLS_26 = {}.ElMenu;
    ({}.ElMenu);
    ({}.ElMenu);
    __VLS_components.ElMenu;
    __VLS_components.elMenu;
    __VLS_components.ElMenu;
    __VLS_components.elMenu;
    // @ts-ignore
    [ElMenu, ElMenu,];
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({ ...{ 'onSelect': {} }, defaultActive: ((__VLS_ctx.activeIndex)), ...{ class: ("menu-right") }, mode: ("horizontal"), ellipsis: ((true)), }));
    const __VLS_28 = __VLS_27({ ...{ 'onSelect': {} }, defaultActive: ((__VLS_ctx.activeIndex)), ...{ class: ("menu-right") }, mode: ("horizontal"), ellipsis: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    ({}({ ...{ 'onSelect': {} }, defaultActive: ((__VLS_ctx.activeIndex)), ...{ class: ("menu-right") }, mode: ("horizontal"), ellipsis: ((true)), }));
    let __VLS_32;
    const __VLS_33 = {
        onSelect: (__VLS_ctx.handleSelect)
    };
    const __VLS_34 = {}.ElMenuItem;
    ({}.ElMenuItem);
    ({}.ElMenuItem);
    __VLS_components.ElMenuItem;
    __VLS_components.elMenuItem;
    __VLS_components.ElMenuItem;
    __VLS_components.elMenuItem;
    // @ts-ignore
    [ElMenuItem, ElMenuItem,];
    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({ index: ("currencyExchange"), }));
    const __VLS_36 = __VLS_35({ index: ("currencyExchange"), }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    ({}({ index: ("currencyExchange"), }));
    // @ts-ignore
    [activeIndex, handleSelect,];
    (__VLS_39.slots).default;
    const __VLS_39 = __VLS_pickFunctionalComponentCtx(__VLS_34, __VLS_36);
    const __VLS_40 = {}.ElMenuItem;
    ({}.ElMenuItem);
    ({}.ElMenuItem);
    __VLS_components.ElMenuItem;
    __VLS_components.elMenuItem;
    __VLS_components.ElMenuItem;
    __VLS_components.elMenuItem;
    // @ts-ignore
    [ElMenuItem, ElMenuItem,];
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({ index: ("news"), }));
    const __VLS_42 = __VLS_41({ index: ("news"), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    ({}({ index: ("news"), }));
    (__VLS_45.slots).default;
    const __VLS_45 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42);
    if (!__VLS_ctx.authStore.isAuthenticated) {
        const __VLS_46 = {}.ElMenuItem;
        ({}.ElMenuItem);
        ({}.ElMenuItem);
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        // @ts-ignore
        [ElMenuItem, ElMenuItem,];
        const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({ index: ("login"), }));
        const __VLS_48 = __VLS_47({ index: ("login"), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
        ({}({ index: ("login"), }));
        // @ts-ignore
        [authStore,];
        (__VLS_51.slots).default;
        const __VLS_51 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48);
    }
    if (!__VLS_ctx.authStore.isAuthenticated) {
        const __VLS_52 = {}.ElMenuItem;
        ({}.ElMenuItem);
        ({}.ElMenuItem);
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        // @ts-ignore
        [ElMenuItem, ElMenuItem,];
        const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({ index: ("register"), }));
        const __VLS_54 = __VLS_53({ index: ("register"), }, ...__VLS_functionalComponentArgsRest(__VLS_53));
        ({}({ index: ("register"), }));
        // @ts-ignore
        [authStore,];
        (__VLS_57.slots).default;
        const __VLS_57 = __VLS_pickFunctionalComponentCtx(__VLS_52, __VLS_54);
    }
    if (__VLS_ctx.authStore.isAuthenticated) {
        const __VLS_58 = {}.ElMenuItem;
        ({}.ElMenuItem);
        ({}.ElMenuItem);
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        __VLS_components.ElMenuItem;
        __VLS_components.elMenuItem;
        // @ts-ignore
        [ElMenuItem, ElMenuItem,];
        const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({ index: ("logout"), }));
        const __VLS_60 = __VLS_59({ index: ("logout"), }, ...__VLS_functionalComponentArgsRest(__VLS_59));
        ({}({ index: ("logout"), }));
        // @ts-ignore
        [authStore,];
        (__VLS_63.slots).default;
        const __VLS_63 = __VLS_pickFunctionalComponentCtx(__VLS_58, __VLS_60);
    }
    (__VLS_31.slots).default;
    const __VLS_31 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28);
    let __VLS_29;
    let __VLS_30;
    (__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    const __VLS_64 = {}.ElMain;
    ({}.ElMain);
    ({}.ElMain);
    __VLS_components.ElMain;
    __VLS_components.elMain;
    __VLS_components.ElMain;
    __VLS_components.elMain;
    // @ts-ignore
    [ElMain, ElMain,];
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({ ...{ class: ("main-content") }, }));
    const __VLS_66 = __VLS_65({ ...{ class: ("main-content") }, }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    ({}({ ...{ class: ("main-content") }, }));
    const __VLS_70 = {}.RouterView;
    ({}.RouterView);
    ({}.RouterView);
    __VLS_components.RouterView;
    __VLS_components.routerView;
    __VLS_components.RouterView;
    __VLS_components.routerView;
    // @ts-ignore
    [RouterView, RouterView,];
    const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({}));
    const __VLS_72 = __VLS_71({}, ...__VLS_functionalComponentArgsRest(__VLS_71));
    ({}({}));
    const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_70, __VLS_72);
    (__VLS_69.slots).default;
    const __VLS_69 = __VLS_pickFunctionalComponentCtx(__VLS_64, __VLS_66);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['custom-header'];
        __VLS_styleScopedClasses['header-content'];
        __VLS_styleScopedClasses['menu-left'];
        __VLS_styleScopedClasses['logo-small'];
        __VLS_styleScopedClasses['menu-right'];
        __VLS_styleScopedClasses['main-content'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                logo: logo,
                authStore: authStore,
                activeIndex: activeIndex,
                handleSelect: handleSelect,
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
