<script setup>
import { ref, defineEmits, defineProps, toRefs } from 'vue';

const user = ref('');
const password = ref('');
const showPassword = ref(false);
const alertDescription = ref('');
const allValuesFilled = ref(false);

const inputStyling = {
  borderColor: 'bg-[var(--badgey-black)]',
  color: 'text-[var(--badgey-black)]'
}

const emit = defineEmits(['login', 'toggle-login', 'toggle-register']);

const props = defineProps({
    openLogin: Boolean,
    loginAlertType: String,
});

const { openLogin, loginAlertType } = toRefs(props);

defineShortcuts({
  o: () => toggleLogin()
});

function setAlertDescription() {
  if (loginAlertType.value === 'invalid-login')
    alertDescription.value = "This username/password is incorrect. Please try again.";
}

function toggleSubmit() {
  allValuesFilled.value = (user.value !== '' && password.value !== '');
}


function toggleLogin() {
    emit('toggle-login');
}

function toggleRegister() {
    emit('toggle-register');
}

function handleLogin() {
  emit('login');
  setAlertDescription();
}

function handleForgotPassword() {
  console.log('forgot password button clicked.');
}
</script>

<template>
    <UModal v-model:open="openLogin" close="true" dismissable scrollable fullscreen>
        <UButton color="neutral" variant="outline" size="xl" class="text-[var(--badgey-black)] hover:text-white p-3" @click="toggleLogin()">
            Already have an account?
        </UButton>

        <template #content>
            <UAlert
                v-if="alertDescription !== ''"
                :description="alertDescription"
                icon="i-lucide-ban"
                color="error"
                variant="soft"
            />
            <div class="p-8">
                <div class="flex justify-end">
                    <UButton icon="i-lucide-x" variant="ghost" @click="toggleLogin()" />
                </div>

                <UFormField label="Username or email" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                  <UInput v-model="user" @blur="toggleSubmit" class="w-full"/>
                </UFormField>
                <UFormField label="Password" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                  <UInput :type="showPassword ? 'text' : 'password'" @blur="toggleSubmit" v-model="password" class="w-full">
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
                    <UButton label="Continue" @click="handleLogin()" :disabled="!allValuesFilled" size="xl" color="neutral" :variant="!allValuesFilled ? 'soft' : 'outline'" class="text-[var(--badgey-black)] hover:text-white mr-4" />
                    <UButton label="Close" @click="toggleLogin()" size="xl" color="neutral" variant="outline" class="mr-4" />
                </UFormField>

                <div v-if="!allValuesFilled" class="px-4 text-error">*Required fields must have a value.</div>

                <UFormField class="w-100 py-4" :ui="inputStyling">
                    <UButton @click="handleForgotPassword()" size="lg" variant="link" class="text-[var(--badgey-black)] hover:text-white">Forgot password?</UButton>
                </UFormField>
                <UFormField class="w-100 py-4" :ui="inputStyling">
                    <UButton @click="toggleLogin();toggleRegister()" size="lg" variant="link" class="text-[var(--badgey-black)] hover:text-white" icon="i-lucide-chevron-right">Create a new account here</UButton>
                </UFormField>
          </div>
        </template>

    </UModal>
</template>

