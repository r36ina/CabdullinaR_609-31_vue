<script setup>
</script>

<template>
  <div class="home">
    <h2>Профессиональная помощь вашим питомцам в Pet's Help</h2>
    <div class="photo">
      <img src="@/assets/images/img1.jpg" alt="img1" />
      <img src="@/assets/images/img3.jpg" alt="img2" />
      <img src="@/assets/images/img5.jpg" alt="img3" />
      <img src="@/assets/images/img6.jpg" alt="img4" />
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 20px 0;
  text-align: center;
}
.photo {
  display: flex;
  gap: 12px;
}
.photo img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}
</style>