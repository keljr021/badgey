<script setup>
import { ref, defineEmits, defineProps, toRefs, onMounted } from 'vue'
import { useUserStore } from './../store/user.js'
import { useRoute } from 'vue-router'

const password = ref('');
const confirm = ref('');

const userStore = useUserStore();
const route = useRoute();
const emits = defineEmits(['toggle-modal']);


const props = defineProps({
    showModal: Boolean
});

const { showModal } = toRefs(props);

async function changePassword() {
    console.log('change password button triggered.');
    await userStore.changePassword(password.value);
    togglePasswordModal(false);
}

function togglePasswordModal(input) {
    emits('toggle-modal', input);
}
</script>

<template>
  <UModal 
    v-model:open="showModal"
    :close="{ onClick: () => togglePasswordModal(false) }"
    :ui="{ 
            content: 'w-full px-2 py-2 sm:max-w-4xl sm:px-8 sm:py-4', 
            header: 'border-0 sm:px-0',
            body: 'border-0 px-8 py-4', 
            footer: 'justify-center' 
        }"> 

    <template #content>
        <div class="modal-buttons border-0">
            <UButton @click="changePassword" class="mx-2" icon="i-lucide-save" label="Update password" color="neutral" variant="outline" />
            <UButton @click=" togglePasswordModal(false)" class="mx-2" icon="i-lucide-x" label="Close" color="neutral" variant="outline" />
        </div>
        <div class="modal-header border-0">Change Password</div>
        <div class="modal-info border-0">
            <div class="modal-info-password">Password:  <UInput :type="route.name === 'settings' ? 'password' : 'text'" v-model="password" size="lg" placeholder="Password" /></div>
            <div class="modal-info-confirm">Confirm:  <UInput :type="route.name === 'settings' ? 'password' : 'text'" v-model="confirm" size="lg" placeholder="Confirm password" /></div>
        </div>
    </template>
  </UModal> 
</template>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
}

.modal-options {
  flex: 1;
  flex-basis: 100%;
  width: 100%;
  text-align: right;
}

.modal-header {
  flex: 1;
  flex-basis: 100%;
  align-items: baseline;
  padding: 20px;
  font-size: 24px;
}

.modal-info {
  flex: 2;
  flex-basis: 100%;
  padding: 10px 20px;
}

.modal-info-password,
.modal-info-confirm {
    padding: 15px 0;
}

.modal-text-view,
.modal-text-update {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.modal-text-view-text {
  padding: 20px 0;
}

.modal-text-view-text-header {
  font-weight: bold;
}

.modal-text-view-text-info {
  font-size: 16px;
}

.modal-buttons {
    text-align: right;
}
</style>