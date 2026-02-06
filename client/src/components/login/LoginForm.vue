<script setup>
import { ref, defineProps, toRefs, defineEmits, computed } from 'vue';

const user = ref('');
const password = ref('');
const showPassword = ref(false);
const alertDescription = ref('');
const allValuesFilled = ref(false);

const props = defineProps({
  loginAlertType: String
});

const { loginAlertType } = toRefs(props);

const inputStyling = {
  borderColor: 'bg-[var(--badgey-black)]',
  color: 'text-[var(--badgey-black)]'
}

const emit = defineEmits(['login']);

function setAlertDescription() {
  if (loginAlertType.value === 'invalid-login')
    alertDescription.value = "This username/password is incorrect. Please try again.";
}

function validateForm() {
  allValuesFilled.value = (user.value !== '' && password.value !== '');
}

function handleLogin() {
  emit('login', user, password);
  setAlertDescription();
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

          <UAlert
            v-if="alertDescription !== ''"
            :description="alertDescription"
            icon="i-lucide-ban"
            color="error"
            variant="soft"
          />

          <UFormField label="Username or email" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <UInput @input="validateForm" v-model="user" class="w-full"/>
          </UFormField>
          <UFormField label="Password" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <UInput @input="validateForm" :type="showPassword ? 'text' : 'password'" v-model="password" class="w-full">
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="(showPassword ? 'Hide' : 'Show') + ' password'"
                  :aria-pressed="showPassword"
                  aria-controls="password"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormField>
          
          <UFormField class="w-100 py-4" :ui="inputStyling">
            <UButton @click="handleLogin()" color="neutral" variant="outline" class="text-[var(--badgey-black)] hover:text-white">Continue</UButton>
          </UFormField>

          <div v-if="!allValuesFilled" class="px-4 text-error">*Required fields must have a value.</div>

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

/* Hide the password reveal button in Edge */
::-ms-reveal {
    display: none;
}
</style>
