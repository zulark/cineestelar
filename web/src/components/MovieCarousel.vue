<template>
  <section v-if="featuredMovies.length" class="relative w-full h-[85vh] overflow-hidden bg-[#0a0a0a] group font-inter">
    <div v-for="(movie, index) in featuredMovies" :key="movie.id"
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      :class="index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'">

      <div class="absolute inset-0 bg-black/30 z-10"></div>
      <img :src="getImageUrl(movie.backdrop_path)" class="absolute w-full h-full object-cover opacity-80 scale-105"
        alt="Backdrop">
      <div class="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
      <div class="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/80 via-transparent to-transparent z-10"></div>

      <div
        class="absolute inset-0 z-20 grid grid-cols-12 grid-rows-6 px-8 md:px-16 pb-12 pt-24 h-full pointer-events-none">

        <div class="col-span-12 md:col-span-9 row-start-3 md:row-start-3 flex items-end">
          <h1 style="font-family: 'Bebas Neue', cursive;"
            class="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] uppercase mix-blend-overlay opacity-90">
            {{ movie.title }}
          </h1>
        </div>

        <div
          class="col-span-12 md:col-span-4 row-start-5 md:row-start-5 flex flex-col justify-end items-start gap-8 pointer-events-auto mt-8 md:mt-0">
          <p class="text-xs text-neutral-400 pl-2">
            {{ getGenreNames(movie.genre_ids).join(' · ') }}
          </p>
          <p class="text-neutral-400 text-sm tracking-widest border-neutral-600 pl-2 h-full flex items-center">
            {{ movie.overview.length > 500 ? movie.overview.slice(0, 500) + '...' : movie.overview }}
          </p>

          <button
            class="pl-2 group/btn flex items-center gap-4 text-neutral-300 hover:text-white transition-all duration-300">
            <span class="text-lg font-medium tracking-wide  group-hover/btn:border-neutral-300 pb-1">Comprar
              Ingresso</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-6 h-6 transform group-hover/btn:translate-x-2 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <div class="absolute bottom-12 right-12 z-30 flex items-center gap-8">
      <div class="flex gap-1">
        <span class="text-white font-medium text-lg">{{ String(currentSlide + 1).padStart(2, '0') }}</span>
        <span class="text-neutral-600 text-lg">/</span>
        <span class="text-neutral-600 text-lg">{{ String(featuredMovies.length).padStart(2, '0') }}</span>
      </div>

      <div class="flex gap-2">
        <button @click="prevSlide"
          class="p-4 border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all duration-300 rounded-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

        <button @click="nextSlide"
          class="p-4 border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all duration-300 rounded-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>

  </section>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import getGenreNames from "@/utils/genres";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  genre_ids: number[];
  duration?: number;
}

const props = defineProps<{
  movies: Movie[]
}>()

const currentSlide = ref(0)
let carouselInterval: ReturnType<typeof setInterval> | null = null

const featuredMovies = computed(() => props.movies.slice(0, 3))

const startAutoplay = () => {
  carouselInterval = setInterval(nextSlide, 5000)
}

const resetAutoplay = () => {
  if (carouselInterval) clearInterval(carouselInterval)
  startAutoplay()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % featuredMovies.value.length
  resetAutoplay()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + featuredMovies.value.length) % featuredMovies.value.length
  resetAutoplay()
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  if (carouselInterval) clearInterval(carouselInterval)
})

const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/w1280${path}`
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;700;900&display=swap');

</style>