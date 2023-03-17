<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input class="fix-auto-fill" size="large" v-model:value="formData.account" :placeholder="t('sys.login.userName')" />
      </FormItem>
      <FormItem name="address" class="enter-x">
        <Cascader size="large" v-model:value="formData.address" :showSearch="true" dropdownClassName="h-160 city" expandTrigger="hover" :options="cityOptions" />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter size="large" v-model:value="formData.password" :placeholder="t('sys.login.password')" />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword size="large" visibilityToggle v-model:value="formData.confirmPassword" :placeholder="t('sys.login.confirmPassword')" />
      </FormItem>

      <Button type="primary" class="enter-x" size="large" block @click="handleRegister" :loading="loading">
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Cascader, message } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { addNewUser } from '/@/api/union/index';
  import { cityList } from '/@/views/setting/cityList';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);
  const cityOptions = cityList.map((city) => {
    return {
      value: city.name,
      label: city.name,
      children: city.children.map((c) => ({ label: c.name, value: c.name })),
    };
  });
  const formData = reactive({
    account: '',
    password: '',
    confirmPassword: '',
    address: [] as string[],
    sms: '',
    policy: false,
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    const position = [
      {
        province: formData.address[0],
        city: [{ cityName: formData.address[1] }],
      },
    ];
    console.log(position, 'position');
    try {
      await addNewUser({
        userName: formData.account,
        password: formData.password,
        position,
      });
      message.success('注册成功');
    } catch (error) {}
  }
</script>
<style lang="css">
  .city .ant-cascader-menu {
    height: 40rem;
  }
</style>
