<script setup>
import { ref, defineEmits } from 'vue'

const userType = ref([
  {
    label: 'Attendee',
    description: 'User who attends events.',
    value: '1'
  },
  {
    label: 'Host',
    description: 'User who creates and host events.',
    value: '2'
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

const emit = defineEmits(['register']);

function handleRegister() {
  const payload = {
    userType: type.value,
    name: name.value,
    username: username.value,
    email: email.value,
    dob: dob.value,
    description: '',
    password: password.value,
  }
  emit('register', payload);
}
</script>

<template>
  <div>
    <UPageCard
        variant="solid"
        class="card border-none ring-0 bg-white text-[var(--badgey-black)]"
        reverse
    >
        <div class="card-title">Need a new account?</div>
         <div class="card-form">
          <UFormField label="I am a(n)..." size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <URadioGroup v-model="type" orientation="horizontal" :items="userType" class="py-2" />
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
            <UButton @click="handleRegister()" color="neutral" variant="outline" class="text-[var(--badgey-black)] hover:text-white">Register</UButton>
          </UFormField>
        </div>
    </UPageCard>
  </div>
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
