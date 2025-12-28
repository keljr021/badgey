<script setup>
import TextSection from '../components/TextSection.vue'
</script>

<template>
  <div class="terms">
    <div class="terms-title">Terms and Conditions</div>
    <div class="terms-updated">Last updated December 23, 2025</div>
    <TextSection>
      <template #header>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et interdum arcu. Etiam neque purus, facilisis non nisl et, facilisis egestas lorem. Donec sed eros eget ipsum euismod fringilla interdum a risus. Duis dapibus id ex at mollis. Quisque sed rutrum risus, ut dignissim erat. Nunc sodales lorem nec purus facilisis, eget finibus felis molestie. Integer elementum tincidunt quam vitae tempor. Suspendisse sed pretium nunc. Vestibulum at est placerat sem maximus sodales. Pellentesque nec diam sit amet nulla placerat elementum egestas vel turpis. Phasellus eget odio et ante sagittis interdum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus porta volutpat nibh. Mauris accumsan dui hendrerit volutpat gravida.
    </TextSection>

    <TextSection>
      <template #subheader>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et interdum arcu. Etiam neque purus, facilisis non nisl et, facilisis egestas lorem. Donec sed eros eget ipsum euismod fringilla interdum a risus. Duis dapibus id ex at mollis. Quisque sed rutrum risus, ut dignissim erat. Nunc sodales lorem nec purus facilisis, eget finibus felis molestie. Integer elementum tincidunt quam vitae tempor. Suspendisse sed pretium nunc. Vestibulum at est placerat sem maximus sodales. Pellentesque nec diam sit amet nulla placerat elementum egestas vel turpis. Phasellus eget odio et ante sagittis interdum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus porta volutpat nibh. Mauris accumsan dui hendrerit volutpat gravida.
    </TextSection>
  </div>
</template>

<style scoped>
.terms {
  background-color: var(--badgey-white);
  width: 100%;
  padding: 50px 20px;
}

.terms-title {
  font-family: var(--badgey-text-title-font);
  font-size: var(--badgey-text-title-size);
  padding-top: 20px;
  padding-bottom: 10px;
}

.terms-updated {
  padding-top: 20px;
  padding-bottom: 80px;
}
</style>
