<script setup>

</script>

<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="./../assets/img/logo_full_white.png" />
    </div>
    <div class="footer-links">
      <ULink class="footer-links-item hover:text-white mx-4" to="/about">About</ULink>
      <ULink class="footer-links-item hover:text-white mx-4">Terms and Conditions</ULink>
      <ULink class="footer-links-item hover:text-white mx-4">Privacy Policy</ULink>
      <ULink class="footer-links-item hover:text-white mx-4">Release Notes</ULink>
      <ULink class="footer-links-item hover:text-white mx-4">Contact</ULink>
    </div>
    <div class="footer-copy">
      Copyright 2025. Website done by <a href="https://kelvin-m.com/#/">Kelvin Morrisey Jr</a>.
    </div>
  </div>
</template>

<style scoped>
.footer {
  background: var(--badgey-green);
  width: 100%;
  min-height: 100px;
  padding: 30px 50px 0 50px;
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
}

.footer-logo {
  flex: 1;
  flex-basis: 50%;
}

.footer-logo img {
  height: 60px;
  opacity: 0.5;
}

.footer-links {
  flex: 1;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-basis: 50%;
}

.footer-copy {
  flex: 1;
  flex-basis: 100%;
  margin: 10px 0;
  font-size: 12px;
  font-style: italic;
  color: var(--badgey-white);
  opacity: 0.5;
}

.footer-copy a {
  text-decoration: underline;
}
</style>