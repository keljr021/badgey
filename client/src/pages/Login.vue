<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from './../components/login/LoginForm.vue'
import LoginFormMobile from './../components/login/LoginFormMobile.vue'
import RegisterForm from './../components/login/RegisterForm.vue'
import RegisterFormMobile from './../components/login/RegisterFormMobile.vue'

import { useUserStore } from './../store/user.js'

const userStore = useUserStore();

const router = useRouter();

const openLogin = ref(false);
const openRegister = ref(false);

const loginAlertType = ref('');
const registerAlertType = ref('');

async function login(user, password) {
  const loggedInUser = await userStore.handleLogin(user.value, password.value);

  if (loggedInUser)
    router.push('/dashboard');
  else
    loginAlertType.value = 'invalid-login';
}

async function register(payload) {

  //Check if user has an account first
  const registerUser = await userStore.handleRegister(payload);

  if (registerUser === 'successful') {
    router.push('/dashboard');
  } else {
    registerAlertType.value = registerUser;
  }
}

function toggleLoginModal() {
  openLogin.value = !openLogin.value;
}

function toggleRegisterModal() {
  openRegister.value = !openRegister.value;
}
</script>

<template>
  <div class="login">
    <div class="login-form">
      <LoginForm class="desktop" @login="login" :loginAlertType="loginAlertType"/>
      <LoginFormMobile class="mobile" @login="login" :openLogin="openLogin" :loginAlertType="loginAlertType" @toggle-login="toggleLoginModal" @toggle-register="toggleRegisterModal" />
    </div>
    <div class="login-form">
      <RegisterForm class="desktop" @register="register" :registerAlertType="registerAlertType" />
      <RegisterFormMobile class="mobile" @register="register" :registerAlertType="registerAlertType" :openRegister="openRegister" @toggle-login="toggleLoginModal" @toggle-register="toggleRegisterModal" />
    </div>
  </div>
</template>

<style scoped>
.login {
  width: 100%;
  padding: 50px;
  display: flex;
  background-color: var(--badgey-light-green);
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
