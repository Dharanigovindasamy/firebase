<template>
  <div class="home-page" v-if="authStore.isAuthentication">
    <!-- <h2 class="title">Welcome to the Home Page</h2> -->

    <Carousel
      ref="carousel"
      :autoplay="false"
      :autoplayTimeout="10000"
      :wrapAround="true"
      :showArrows="true"
      :showIndicators="false"
      :slidesToScroll="1"
      :mouseDrag="true"
      :touchDrag="true"
      :snapAlign="'center'"
      class="carousel-container"
    >
      <Slide v-for="(image, index) in images" :key="index">
        <img :src="image" class="carousel-img" />
      </Slide>

      <template #addons>
      <CarouselNavigation />
      <Pagination />
    </template>
    </Carousel>
  </div>
</template>

<script setup>
import {
  Navigation as CarouselNavigation,
  Carousel,
  Pagination,
  Slide
} from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import 'vue3-carousel/carousel.css';
import { useAuthStore } from "@/store/authStore";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onBeforeMount } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const images = ref([
  "https://picsum.photos/1024/480?random=1",
  "https://picsum.photos/1024/480?random=2",
  "https://picsum.photos/1024/480?random=3",
  "https://picsum.photos/1024/480?random=4"
]);

// onMounted(() => {
//   if (!authStore.isAuthenticated) {
//     console.log("User is not authenticated!", authStore.isAuthentication);
//     alert("You are not authenticated! in home page");
//     router.push("/");
//   }
// });

onBeforeMount(() => {
  // Initialize and check auth state
  authStore.initializeAuth();
  
  const jwt = sessionStorage.getItem('jwt');
  console.log('JWT exists:', !!jwt);
  console.log('Auth state:', authStore.isAuthentication);

  if (!authStore.checkAuthStatus()) {
    console.log("User is not authenticated!");
    alert("You are not authenticated! in home page");
    router.push('/');
  }
});

</script>

<style scoped>
.home-page {
  text-align: center;
  padding: 20px;
  width: 1400px;
    margin: 0 auto;
    padding: 2px !important;

}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.carousel-container {
  max-width: 1024px;
  margin: 0 auto;
  position: relative;
}

.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
}
/* 
.arrows {
  max-width: 40px;
  max-height: 40px;
  cursor: pointer;
} */

/* Customize indicators */
.carousel__indicators {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 8px;
  max-height: 800px;
  max-width: 80px;
  background-color: #d3d3d3;
}

.carousel__indicator {
  background-color: #d3d3d3;
  width: 20px;
  height: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.carousel__pagination {
  display: flex;
    background-color: #d3d3d3;
  justify-content: center;
  margin-top: 15px;
  gap: 10px;
}

.carousel__pagination-button {
  background-color: #d3d3d3;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.carousel__pagination-button--active {
  background-color: #f7efef; /* change to any color you like */
}
</style>
