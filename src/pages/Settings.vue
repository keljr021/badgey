<script setup>
import { ref } from 'vue'
 
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

</script>

<template>
  <div class="settings">
    <div class="settings-title">Settings</div>
    <div class="settings-body">
      <div class="settings-body-account">
        <div class="settings-body-account-title">Account settings</div>
        <div class="settings-body-account-form">
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
      </div>
    </div>
    <div class="settings-body-profile">
      <div class="settings-body-profile-title">Profile settings</div>
      <div class="settings-body-profile-form">
        <UFormField class="w-100 py-4" :ui="inputStyling">
          <UButton @click="handleRegister()" color="neutral" variant="outline" icon="i-lucide-save" class="text-[var(--badgey-black)] hover:text-white">Save settings</UButton>
        </UFormField>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.settings {
  background-color: var(--badgey-white);
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
}

.settings-title {
  flex: 1;
  font-family: var(--badgey-text-title-font);
  font-size: var(--badgey-text-title-size);
  padding-top: 20px;
  padding-bottom: 80px;
}

.settings-body {
  flex: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.settings-body-account,
.settings-body-profile {
  flex: 1;
  flex-basis: 50%;
  text-align: left;
}

.settings-body-account-title,
.settings-body-profile-title {
  font-size: var(--badgey-text-subheader-size);
  padding-bottom: 40px;
}

.settings-body-account-form,
.settings-body-profile-form {
  padding: 10px 20px;
}
</style>
