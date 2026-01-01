<script setup>
import { ref, defineEmits, defineProps, toRefs } from 'vue'

const userType = ref([
  {
    label: 'Attendee',
    description: 'User who attends events.',
    value: 'attendee'
  },
  {
    label: 'Host',
    description: 'User who creates and host events.',
    value: 'host'
  }
]);

const type = ref('');
const name = ref('');
const username = ref('');
const email = ref('');
const dob = ref('');
const password = ref('');
const confirm = ref('');

const inputStyling = {
  borderColor: 'bg-[var(--badgey-black)]',
  color: 'text-[var(--badgey-black)]'
}


const emit = defineEmits(['register', 'toggle-login', 'toggle-register']);

const props = defineProps({
    openRegister: Boolean
});

const { openRegister } = toRefs(props);

defineShortcuts({
  o: () => toggleRegister()
});

function toggleLogin() {
    emit('toggle-login');
}

function toggleRegister() {
    emit('toggle-register');
}

function handleRegister() {
    emit('register')
}
</script>

<template>
    <UModal v-model:open="openRegister" close="true" dismissable scrollable fullscreen>
        <UButton color="neutral" variant="outline" size="xl" class="text-[var(--badgey-black)] hover:text-white p-3"  @click="toggleRegister()">
            Need an account?
        </UButton>

        <template #content>
            <div class="p-8">
                <div class="flex justify-end">
                    <UButton icon="i-lucide-x" variant="ghost" @click="toggleRegister()" />
                </div>
                <UFormField label="I am a(n)..." size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                    <URadioGroup v-model="type" orientation="vertical" :items="userType" class="py-2 my-2" />
                </UFormField>
                <UFormField label="Name" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                    <UInput v-model="name" class="w-full" />
                </UFormField>
                <UFormField label="Username" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                    <UInput v-model="username" class="w-full" />
                </UFormField>
                <UFormField label="Email" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                    <UInput v-model="email" class="w-full" />
                </UFormField>
                <UFormField label="Date of birth" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                    <UInput v-model="dob" class="w-full" />
                </UFormField>
                <UFormField label="Password" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                    <UInput v-model="password" class="w-full" />
                </UFormField>
                <UFormField label="Confirm password" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
                    <UInput v-model="confirm" class="w-full" />
                </UFormField>

                <UFormField class="w-100 py-4" :ui="inputStyling">
                    <UButton label="Register" @click="handleRegister()" size="xl" color="neutral" variant="outline" class="text-[var(--badgey-black)] hover:text-white mr-4" />
                    <UButton label="Close" @click="toggleRegister()" size="xl" color="neutral" variant="outline" class="mr-4" />
                </UFormField>
                <UFormField class="w-100 py-4" :ui="inputStyling">
                    <UButton @click="toggleRegister();toggleLogin()" size="lg" variant="link" class="text-[var(--badgey-black)] hover:text-white" icon="i-lucide-chevron-right">Login with existing account here</UButton>
                </UFormField>
            </div>
        </template>

    </UModal>
</template>
