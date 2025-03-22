/* __placeholder__ */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { ElMessage } from 'element-plus';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
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
    }
    catch {
        ElMessage.error('注册失败，请重试。');
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-container") }, });
    const __VLS_0 = {}.ElForm;
    ({}.ElForm);
    ({}.ElForm);
    __VLS_components.ElForm;
    __VLS_components.elForm;
    __VLS_components.ElForm;
    __VLS_components.elForm;
    // @ts-ignore
    [ElForm, ElForm,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onSubmit': {} }, model: ((__VLS_ctx.form)), ...{ class: ("auth-form") }, }));
    const __VLS_2 = __VLS_1({ ...{ 'onSubmit': {} }, model: ((__VLS_ctx.form)), ...{ class: ("auth-form") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ 'onSubmit': {} }, model: ((__VLS_ctx.form)), ...{ class: ("auth-form") }, }));
    let __VLS_6;
    const __VLS_7 = {
        onSubmit: (__VLS_ctx.register)
    };
    const __VLS_8 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ label: ("用户名"), labelWidth: ("80px"), }));
    const __VLS_10 = __VLS_9({ label: ("用户名"), labelWidth: ("80px"), }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    ({}({ label: ("用户名"), labelWidth: ("80px"), }));
    const __VLS_14 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({ modelValue: ((__VLS_ctx.form.username)), placeholder: ("请输入用户名"), }));
    const __VLS_16 = __VLS_15({ modelValue: ((__VLS_ctx.form.username)), placeholder: ("请输入用户名"), }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    ({}({ modelValue: ((__VLS_ctx.form.username)), placeholder: ("请输入用户名"), }));
    // @ts-ignore
    [form, form, register,];
    const __VLS_19 = __VLS_pickFunctionalComponentCtx(__VLS_14, __VLS_16);
    (__VLS_13.slots).default;
    const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_8, __VLS_10);
    const __VLS_20 = {}.ElFormItem;
    ({}.ElFormItem);
    ({}.ElFormItem);
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    __VLS_components.ElFormItem;
    __VLS_components.elFormItem;
    // @ts-ignore
    [ElFormItem, ElFormItem,];
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ label: ("密码"), labelWidth: ("80px"), }));
    const __VLS_22 = __VLS_21({ label: ("密码"), labelWidth: ("80px"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    ({}({ label: ("密码"), labelWidth: ("80px"), }));
    const __VLS_26 = {}.ElInput;
    ({}.ElInput);
    __VLS_components.ElInput;
    __VLS_components.elInput;
    // @ts-ignore
    [ElInput,];
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({ modelValue: ((__VLS_ctx.form.password)), type: ("password"), placeholder: ("请输入密码"), }));
    const __VLS_28 = __VLS_27({ modelValue: ((__VLS_ctx.form.password)), type: ("password"), placeholder: ("请输入密码"), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    ({}({ modelValue: ((__VLS_ctx.form.password)), type: ("password"), placeholder: ("请输入密码"), }));
    // @ts-ignore
    [form,];
    const __VLS_31 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28);
    (__VLS_25.slots).default;
    const __VLS_25 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
    const __VLS_32 = {}.ElButton;
    ({}.ElButton);
    ({}.ElButton);
    __VLS_components.ElButton;
    __VLS_components.elButton;
    __VLS_components.ElButton;
    __VLS_components.elButton;
    // @ts-ignore
    [ElButton, ElButton,];
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ type: ("primary"), nativeType: ("submit"), }));
    const __VLS_34 = __VLS_33({ type: ("primary"), nativeType: ("submit"), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    ({}({ type: ("primary"), nativeType: ("submit"), }));
    (__VLS_37.slots).default;
    const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    let __VLS_3;
    let __VLS_4;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['auth-container'];
        __VLS_styleScopedClasses['auth-form'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                form: form,
                register: register,
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
