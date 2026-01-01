<script setup>
import { ref, defineEmits, defineProps, toRefs } from 'vue';

const user = ref('');
const password = ref('');

const inputStyling = {
  borderColor: 'bg-[var(--badgey-black)]',
  color: 'text-[var(--badgey-black)]'
}

const emit = defineEmits(['login', 'toggle-login', 'toggle-register']);

const props = defineProps({
    openLogin: Boolean
});

const { openLogin } = toRefs(props);

defineShortcuts({
  o: () => toggleLogin()
});

function toggleLogin() {
    emit('toggle-login');
}

function toggleRegister() {
    emit('toggle-register');
}

function handleLogin() {
  emit('login');
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
            <div class="p-8">
                <div class="flex justify-end">
                    <UButton icon="i-lucide-x" variant="ghost" @click="toggleLogin()" />
                </div>

                <UFormField label="Username or email" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                  <UInput v-model="user" class="w-full"/>
                </UFormField>
                <UFormField label="Password" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                  <UInput v-model="password" class="w-full" />
                </UFormField>
        
                <UFormField class="w-100 py-4" :ui="inputStyling">
                    <UButton label="Continue" @click="handleLogin()" size="xl" color="neutral" variant="outline" class="text-[var(--badgey-black)] hover:text-white mr-4" />
                    <UButton label="Close" @click="toggleLogin()" size="xl" color="neutral" variant="outline" class="mr-4" />
                </UFormField>

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

