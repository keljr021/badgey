<script setup>
import { ref } from 'vue';

const user = ref();
const password = ref();

const inputStyling = {
  borderColor: 'bg-[var(--badgey-black)]',
  color: 'text-[var(--badgey-black)]'
}

function handleLogin() {
  console.log('login button clicked.');
}

function handleForgotPassword() {
  console.log('forgot password button clicked.');
}
</script>

<template>
    <UPageCard
        variant="solid"
        class="card border-none ring-0 bg-white text-[var(--badgey-black)]"
        reverse
    >
        <div class="card-title">Have an account?</div>
        <div class="card-form">
          <UFormField label="Username or email" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <UInput v-model="user" class="w-full"/>
          </UFormField>
          <UFormField label="Password" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <UInput v-model="password" class="w-full" />
          </UFormField>
          
          <UFormField class="w-100 py-4" :ui="inputStyling">
            <UButton @click="handleLogin()" color="neutral" variant="outline" class="text-[var(--badgey-black)] hover:text-white">Continue</UButton>
          </UFormField>

          <UFormField class="w-100 py-4" :ui="inputStyling">
            <UButton @click="handleForgotPassword()" size="sm" variant="link" class="text-[var(--badgey-black)] hover:text-white">Forgot password?</UButton>
          </UFormField>
        </div>
    </UPageCard>
</template>

<style scoped>
.card {
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}
.card-title {
  font-family: var(--badgey-text-header-font);
  font-size: var(--badgey-text-header-size);
}

.card-form {
  padding: 15px 25px;
}
</style>
