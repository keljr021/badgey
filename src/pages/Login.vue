<script setup>
import { useRouter } from 'vue-router'
import LoginForm from './../components/login/LoginForm.vue'
import RegisterForm from './../components/login/RegisterForm.vue'

const router = useRouter();

function login() {
  router.push('/dashboard');
}

function register() {
  router.push('/dashboard');
}
</script>

<template>
  <div class="login">
    <div class="login-form">
      <LoginForm @login="login"/>
    </div>
    <div class="login-form">
      <RegisterForm @register="register" />
    </div>
  </div>
</template>

<style scoped>
.login {
  background-color: var(--badgey-light-green);
  width: 100%;
  padding: 50px;
  display: flex;
}

.login-form {
  flex: 1;
  flex-basis: 50%;
  padding: 50px;
}
</style>
