<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from './../components/login/LoginForm.vue'
import LoginFormMobile from './../components/login/LoginFormMobile.vue'
import RegisterForm from './../components/login/RegisterForm.vue'
import RegisterFormMobile from './../components/login/RegisterFormMobile.vue'


const router = useRouter();

const openLogin = ref(false);
const openRegister = ref(false);

function login() {
  router.push('/dashboard');
}

function register() {
  router.push('/dashboard');
}

function toggleLoginModal() {
  openLogin.value = !openLogin.value;
}

function toggleRegisterModal() {
  openRegister.value = !openRegister.value;
}
</script>

<template>
  <div class="green login">
    <div class="login-form">
      <LoginForm class="desktop" @login="login"/>
      <LoginFormMobile class="mobile" @login="login" :openLogin="openLogin" @toggle-login="toggleLoginModal" @toggle-register="toggleRegisterModal" />
    </div>
    <div class="login-form">
      <RegisterForm class="desktop" @register="register" />
      <RegisterFormMobile class="mobile" @register="register" :openRegister="openRegister" @toggle-login="toggleLoginModal" @toggle-register="toggleRegisterModal" />
    </div>
  </div>
</template>

<style scoped>
.login {
  width: 100%;
  padding: 50px;
  display: flex;
}

.login-form {
  flex: 1;
  flex-basis: 50%;
  padding: 50px;
}

@media all and (max-width: 1023px) {
  .login {
    flex-direction: column;
    text-align: center;
  }
}
</style>
