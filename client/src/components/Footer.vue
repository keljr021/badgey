<script setup>

</script>

<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="./../assets/img/logo_full_white.png" />
    </div>
    <div class="footer-links">
      <ULink class="footer-links-item hover:text-white mx-4" activeClass="text-white" target="_top" to="/about">About</ULink>
      <ULink class="footer-links-item hover:text-white mx-4" activeClass="text-white" target="_top" to="/terms">Terms and Conditions</ULink>
      <ULink class="footer-links-item hover:text-white mx-4" activeClass="text-white" target="_top" to="/privacy">Privacy Policy</ULink>
      <ULink class="footer-links-item hover:text-white mx-4" activeClass="text-white" target="_top" to="/release">Release Notes</ULink>
      <ULink class="footer-links-item hover:text-white mx-4" activeClass="text-white" target="_top" to="/contact">Contact</ULink>
    </div>
    <div class="footer-copy">
      Copyright 2025. Website done by <a href="https://kelvin-m.com/#/">Kelvin Morrisey Jr</a>.
    </div>
  </div>
</template>

<style scoped>
.footer {
  background: var(--badgey-black);
  width: 100%;
  min-height: 100px;
  padding: 30px 50px 0 50px;
  display: flex;
  flex-wrap: wrap;
  z-index: 2;
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
  z-index: 2;
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

@media all and (max-width: 1023px) {
  .footer {
    padding-top: 25px;
    flex-direction: column;
    align-items: center;
  }

  .footer-links {
    flex-direction: column;
  }

  .footer-links a {
    padding: 10px 0;
    text-align: right;
  }

}
</style>