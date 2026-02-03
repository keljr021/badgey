<script setup>
import { ref, defineProps, toRefs, defineEmits } from 'vue'

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
const company = ref('');
const name = ref('');
const username = ref('');
const email = ref('');
const dob = ref('');
const password = ref('');
const confirm = ref('');
const alertDescription = ref('');

const showPassword = ref(false);
const allValuesFilled = ref(false);
const doesPasswordsMatch = ref(false);

const inputStyling = {
  borderColor: 'bg-[var(--badgey-black)]',
  color: 'text-[var(--badgey-black)]'
}

const props = defineProps({
  registerAlertType: String
});

const { registerAlertType } = toRefs(props);

const emit = defineEmits(['register']);

function setAlertDescription() {
  if (registerAlertType === 'already registered')
    alertDescription.value = 'This email has already been registered to another account. Please use the login form.';

  if (registerAlertType !== '')
    alertDescription.value = registerAlertType;
}

function validateForm() {
  if (type.value !== null && 
      name.value !== null && 
      username.value !== null && 
      email.value !== null && 
      dob.value !== null && 
      password.value !== null) {
    allValuesFilled.value = true;
  }
  else {
    allValuesFilled.value = false;
  }

  if (password.value === confirm.value)
    doesPasswordsMatch.value = true;
  else 
    doesPasswordsMatch.value = false;
}

function handleRegister() {
  const payload = {
    userType: type.value,
    company: company.value,
    name: name.value,
    username: username.value,
    email: email.value,
    dob: dob.value,
    description: '',
    password: password.value,
  }
  emit('register', payload);
  setAlertDescription();
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

          <UAlert
            v-if="alertDescription !== ''"
            :description="alertDescription"
            icon="i-lucide-ban"
            color="error"
            variant="soft"
          />

          <UFormField label="I am a(n)..." size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <URadioGroup @change="validateForm" v-model="type" orientation="horizontal" :items="userType" class="py-2" />
          </UFormField>
          <UFormField v-if="type === '2'" label="Event Name" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <UInput @input="validateForm" v-model="company" class="w-full" />
          </UFormField>
          <UFormField label="Name" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <UInput @input="validateForm" v-model="name" class="w-full" />
          </UFormField>
          <UFormField label="Username" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <UInput @input="validateForm" v-model="username" class="w-full" />
          </UFormField>
          <UFormField label="Email" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <UInput @input="validateForm" v-model="email" class="w-full" />
          </UFormField>
          <UFormField label="Date of birth" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <UInput @input="validateForm" type="date" v-model="dob" class="w-full" />
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
          <UFormField label="Confirm password" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <UInput @input="validateForm" :type="showPassword ? 'text' : 'password'" v-model="confirm" class="w-full">
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
            <UButton @click="handleRegister()" color="neutral" variant="outline" class="text-[var(--badgey-black)] hover:text-white">Register</UButton>
          </UFormField>

          <div v-if="!allValuesFilled" class="px-4 text-error">*Required fields must have a value.</div>
          <div v-if="!doesPasswordsMatch" class="px-4 text-error">*Password and confirmation doesn't match.</div>
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
