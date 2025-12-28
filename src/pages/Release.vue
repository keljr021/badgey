<script setup>
import { ref } from 'vue'

const items = ref([
  {
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
    icon: 'i-lucide-rocket'
  },
  {
    date: 'Mar 22 2025',
    title: 'Design Phase',
    description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
    icon: 'i-lucide-palette'
  },
  {
    date: 'Mar 29 2025',
    title: 'Development Sprint',
    description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
    icon: 'i-lucide-code'
  },
  {
    date: 'Apr 5 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization. Deployed the application to production.',
    icon: 'i-lucide-check-circle'
  }
])
</script>

<template>
  <div class="release">
    <div class="release-title">Release Notes</div>
    <UTimeline 
      :items="items" 
      :default-value="2" 
      size="lg"
      reverse />
  </div>
</template>

<style scoped>
.release {
  background-color: var(--badgey-white);
  width: 100%;
  padding: 50px;
}

.release-title {
  font-family: var(--badgey-text-title-font);
  font-size: var(--badgey-text-title-size);
  padding-top: 20px;
  padding-bottom: 80px;
}
</style>
