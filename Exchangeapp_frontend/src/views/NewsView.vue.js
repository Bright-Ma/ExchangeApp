/* __placeholder__ */
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from '../axios';
import { useAuthStore } from '../store/auth';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const articles = ref([]);
const router = useRouter();
const authStore = useAuthStore();
const fetchArticles = async () => {
    try {
        const response = await axios.get('/articles');
        articles.value = response.data;
    }
    catch (error) {
        console.error('Failed to load articles:', error);
    }
};
const viewDetail = (id) => {
    if (!authStore.isAuthenticated) {
        ElMessage.error('请先登录后再查看');
        return;
    }
    router.push({ name: 'NewsDetail', params: { id } });
};
const redirectToLogin = () => {
    router.push({ name: 'Login' }); // 假设你的登录页面路由名称是 Login
};
const redirectToRegister = () => {
    router.push({ name: 'Register' }); // 假设你的注册页面路由名称是 Register
};
onMounted(fetchArticles);
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
    const __VLS_6 = {}.ElMain;
    ({}.ElMain);
    ({}.ElMain);
    __VLS_components.ElMain;
    __VLS_components.elMain;
    __VLS_components.ElMain;
    __VLS_components.elMain;
    // @ts-ignore
    [ElMain, ElMain,];
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({}));
    if (__VLS_ctx.articles && __VLS_ctx.articles.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        for (const [article] of __VLS_getVForSourceType((__VLS_ctx.articles))) {
            const __VLS_12 = {}.ElCard;
            ({}.ElCard);
            ({}.ElCard);
            __VLS_components.ElCard;
            __VLS_components.elCard;
            __VLS_components.ElCard;
            __VLS_components.elCard;
            // @ts-ignore
            [ElCard, ElCard,];
            const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ key: ((article.ID)), ...{ class: ("article-card") }, }));
            const __VLS_14 = __VLS_13({ key: ((article.ID)), ...{ class: ("article-card") }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
            ({}({ key: ((article.ID)), ...{ class: ("article-card") }, }));
            __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
            (article.Title);
            // @ts-ignore
            [articles, articles, articles,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (article.Preview);
            const __VLS_18 = {}.ElButton;
            ({}.ElButton);
            ({}.ElButton);
            __VLS_components.ElButton;
            __VLS_components.elButton;
            __VLS_components.ElButton;
            __VLS_components.elButton;
            // @ts-ignore
            [ElButton, ElButton,];
            const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ 'onClick': {} }, text: (true), }));
            const __VLS_20 = __VLS_19({ ...{ 'onClick': {} }, text: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
            ({}({ ...{ 'onClick': {} }, text: (true), }));
            let __VLS_24;
            const __VLS_25 = {
                onClick: (...[$event]) => {
                    if (!((__VLS_ctx.articles && __VLS_ctx.articles.length)))
                        return;
                    __VLS_ctx.viewDetail(article.ID);
                    // @ts-ignore
                    [viewDetail,];
                }
            };
            (__VLS_23.slots).default;
            const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
            let __VLS_21;
            let __VLS_22;
            (__VLS_17.slots).default;
            const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("no-data") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        const __VLS_26 = {}.ElButton;
        ({}.ElButton);
        ({}.ElButton);
        __VLS_components.ElButton;
        __VLS_components.elButton;
        __VLS_components.ElButton;
        __VLS_components.elButton;
        // @ts-ignore
        [ElButton, ElButton,];
        const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({ ...{ 'onClick': {} }, type: ("primary"), }));
        const __VLS_28 = __VLS_27({ ...{ 'onClick': {} }, type: ("primary"), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
        ({}({ ...{ 'onClick': {} }, type: ("primary"), }));
        let __VLS_32;
        const __VLS_33 = {
            onClick: (__VLS_ctx.redirectToLogin)
        };
        // @ts-ignore
        [redirectToLogin,];
        (__VLS_31.slots).default;
        const __VLS_31 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28);
        let __VLS_29;
        let __VLS_30;
        const __VLS_34 = {}.ElButton;
        ({}.ElButton);
        ({}.ElButton);
        __VLS_components.ElButton;
        __VLS_components.elButton;
        __VLS_components.ElButton;
        __VLS_components.elButton;
        // @ts-ignore
        [ElButton, ElButton,];
        const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({ ...{ 'onClick': {} }, }));
        const __VLS_36 = __VLS_35({ ...{ 'onClick': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_35));
        ({}({ ...{ 'onClick': {} }, }));
        let __VLS_40;
        const __VLS_41 = {
            onClick: (__VLS_ctx.redirectToRegister)
        };
        // @ts-ignore
        [redirectToRegister,];
        (__VLS_39.slots).default;
        const __VLS_39 = __VLS_pickFunctionalComponentCtx(__VLS_34, __VLS_36);
        let __VLS_37;
        let __VLS_38;
    }
    (__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['article-card'];
        __VLS_styleScopedClasses['no-data'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                articles: articles,
                viewDetail: viewDetail,
                redirectToLogin: redirectToLogin,
                redirectToRegister: redirectToRegister,
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
