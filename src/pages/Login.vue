<script setup>
import LoginForm from './../components/login/LoginForm.vue'
import RegisterForm from './../components/login/RegisterForm.vue'
</script>

<template>
  <div class="login">
    <div class="login-form">
      <LoginForm />
    </div>
    <div class="login-form">
      <RegisterForm />
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
