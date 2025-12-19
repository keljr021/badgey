<script setup>
import { getImageSrc } from '../assets/js/imgHelpers.js'
import AboutSection from '../components/AboutSection.vue'

</script>

<template>
  <div class="about">
    <div class="about-header">
      
      <div class="about-header-image">
        <img :src="getImageSrc('about-header.jpg')" />
      </div>
      <div class="about-header-title">We want to be an enjoyable resource for others to share moments and show off their journey.</div>
    </div>
    <div class="about-idea">
      <AboutSection title="One Idea - Short and Sweet" image="user-interface-73.png">
        <p>Badgey was created in 2025; started by one web developer with an idea.</p>
        <p>The idea was to give users a simple solution to create, customize, and share badges among one another. A simple badge that share a convention they've attended; or a proud achievement at a local event. We want our users to share those badges proudly!</p>
      </AboutSection>
    </div>
    <div class="about-who">
      <AboutSection title="Who is Badgey for?" image="allura-celebrations.png">
        <ul>
          <li>Got a local sports team that just won the playoffs?</li> 
          <li>An annual event with a cook-off?</li>
          <li>Attendees hosting the next comic-con?</li>
          <li>Your favorite band hosting a nearby show?</li>
        </ul>
        <p>Badgey was created in 2025; started by one web developer with an idea.</p>
      </AboutSection>
    </div>
    <div class="about-brad">
      <AboutSection title="Who's Brad B. Badger?" image="badgey_brad.png">
        <p>Brad is our local badger mascot that eagerly wants to help folks along the way. Brad's an easygoing and carefree guy that helps with his local comic conventions every year. He's not afraid to show off his own badges; rather it be digital or real-life.</p>
        <p>But thanks to Badgey, he has the option of creating a new badge each year; and give attendees another amazing piece to connect with one another!</p>
        <p>If you see him around, feel free to say hello!</p>
      </AboutSection>
    </div>
  </div>
</template>

<style scoped>
.about {
  background-color: var(--badgey-white);
  width: 100%;
}

.about-header {
  position: relative;
  background: #333333;
  height: 500px;
}

.about-header-title {
  position: absolute;
  width: 75%;
  left: 12.5%;
  bottom: 50%;
  font-family: var(--badgey-text-header-font);
  font-size: var(--badgey-text-header-size);
  color: white;
  text-align: center;
}

.about-header-image {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.about-header-image img {
  position: relative;
  left: 0;
  top: 0;
  opacity: 0.05;
  width: 100%;
  
}

.about-idea {
  padding: 50px;

}

.about-who {
  background-color: var(--badgey-light-green);
  padding: 50px;

}

.about-brad {
  padding: 50px;
}
</style>
