<script setup>
import { getImageSrc } from '../assets/js/imgHelpers.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useUserStore } from './../store/user.js'

const userStore = useUserStore();

const { loggedInUser } = storeToRefs(userStore);


const userType = [
  {
    label: 'Attendee',
    description: 'User who attends events.',
    value: "1"
  },
  {
    label: 'Host',
    description: 'User who creates and host events.',
    value: "2"
  }
];

const selectedUserType = loggedInUser.value.userType || "1";
const name = loggedInUser.value.name || '';
const username = loggedInUser.value.username || '';
const email = loggedInUser.value.email || '';
const dob = loggedInUser.value.dob || '';
const password = '*********';
const description = loggedInUser.value.description || '';


onMounted(() => {
  console.log('loggedInUser: ', loggedInUser.value);
});
</script>

<template>
  <div class="settings">
    <div class="settings-title">Settings</div>
    <div class="settings-body">
      <div class="settings-body-account">
        <div class="settings-body-account-title">Account settings</div>
        <div class="settings-body-account-form">
          <UFormField label="I am a(n)..." size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
            <URadioGroup v-model="selectedUserType" :orientation="'mobile' ? 'vertical':'horizontal'" :items="userType" class="py-2" />
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
            <UInput v-model="password" class="w-full" disabled />
          </UFormField>
      </div>
    </div>
    <div class="settings-body-profile">
      <div class="settings-body-profile-title">Profile settings</div>
      <div class="settings-body-profile-form">
        <UFormField label="Profile image" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
          <div class="settings-body-profile-form-image py-3">
            <img class="my-3" :src="getImageSrc('badgey_brad.png')" />
          </div>
        </UFormField>
        <UFormField size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
          <UButton @click="handleRegister()" color="neutral" variant="outline" icon="i-lucide-upload" class="text-[var(--badgey-black)] hover:text-white">Upload image</UButton>
        </UFormField>
        <UFormField label="Description" size="lg" class="py-4 text-[var(--badgey-black)]" :ui="inputStyling" required>
          <UTextarea v-model="description" rows="4" :class="'py-2 ' + ('mobile' ? 'w-full' : 'w-100')" />
        </UFormField>
        <UFormField class="w-100 pt-22" :ui="inputStyling">
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

.settings-body-profile-form-image {
  flex: 1;
  width: 200px;
  height: 200px;
  margin: 20px 0;
}

.settings-body-profile-form-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top center;
  border-radius: 50%;
}

@media all and (max-width: 1023px) {
  .settings {
    justify-content: center;
    padding: 50px 20px;
    width: calc(100% - 40px);
  }

  .settings-body {
    padding: initial;
    flex-direction: column;
  }

  .settings-body-account,
  .settings-body-profile {
    flex-basis: 100%;
  }

  .settings-body-account-form,
  .settings-body-profile-form {
    padding: 20px;
  }
}
</style>
