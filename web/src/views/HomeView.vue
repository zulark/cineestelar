<template>
    <main class="min-h-screen bg-[#0f1014] text-[#e0e0e0] selection:bg-red-500/30">
        <MovieCarousel :movies="onScreenMovies" />


        <section class="max-w-7xl mx-auto py-16">
            <h1 class="text-center text-3xl font-bold mb-6">Em Breve</h1>

            <div v-if="loading && upComingMovies.length > 0"
                class="flex justify-center items-center h-64 text-neutral-500">
                <div class="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
            </div>

            <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px]">

                <div v-for="(movie, index) in upComingMovies.slice(0, 5)" :key="movie.id"
                    class="group relative cursor-pointer overflow-hidden rounded-xs bg-[#1a1b20] border border-white/5 transition-all duration-50"
                    :class="{ 'md:col-span-2 md:row-span-1': index === 0 }">

                    <div
                        class="absolute inset-0 z-10 bg-linear-to-t from-[#0f1014] via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80">
                    </div>

                    <img :src="`https://image.tmdb.org/t/p/w780${index === 0 ? movie.backdrop_path : movie.poster_path}`"
                        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy">

                    <div
                        class="absolute bottom-0 left-0 w-full p-6 z-20  transition-transform duration-300 group-hover:translate-y-0">
                        <span
                            class="text-xs font-medium tracking-tighter uppercase text-red-400 mb-2 block opacity-0 - transition-all duration-300 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                            {{ movie.release_date.split('-')[0] }}
                        </span>
                        <h3 class="text-lg md:text-xl font-bold text-white tracking-wide leading-tight drop-shadow-lg">
                            {{ movie.title }}
                        </h3>
                    </div>
                </div>
            </div>
        </section>

        <div class="flex items-center justify-center w-full">
            <hr class="w-1/2 border-t border-white/20 self-center">
        </div>

        <section class="max-w-7xl mx-auto py-16">

            <h2 class="text-center text-3xl font-bold mb-6">
                Em cartaz
            </h2>

            <div v-if="loading && onScreenMovies.length > 0"
                class="flex justify-center items-center h-64 text-neutral-500">
                <div class="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
            </div>

            <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div v-for="movie in onScreenMovies.slice(0, 10)" :key="movie.id"
                    class="group relative cursor-pointer rounded-xs overflow-hidden transition-all duration-500">

                    <div class="aspect-2/3 overflow-hidden relative">
                        <div
                            class="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20 z-10">
                        </div>
                        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                            :alt="movie.title" loading="lazy">

                        <div
                            class="absolute inset-x-0 bottom-0 p-4 bg-black/40 border-t border-white/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-20">
                            <!-- <p class="text-lg text-gray-300 mb-1">Assista agora</p> -->
                            <button
                                class="w-full py-2 bg-red-900 rounded text-xs font-bold uppercase tracking-wider transition-colors">Comprar
                                Ingresso</button>
                        </div>
                    </div>

                    <div class="py-4">
                        <h3 class="font-medium text-white truncate tracking-wide">{{ movie.title }}</h3>

                        <p class="text-xs text-gray-500 mt-1">{{ movie.release_date.split('-')[0] }}</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'
import MovieCarousel from '@/components/MovieCarousel.vue'

interface Movie {
    id: number;
    title: string;
    release_date: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    genre_ids: number[];
}

const onScreenMovies = ref<Movie[]>([])
const upComingMovies = ref<Movie[]>([])

const loading = ref(true)

const getOnScreenMovies = async () => {
    try {
        const response = await api.get('/filmes/em-cartaz')
        onScreenMovies.value = response.data.results
    } catch (error) {
        console.error('Erro ao buscar filmes:', error)
    } finally {
        loading.value = false
    }
}

const getUpComingMovies = async () => {
    try {
        const response = await api.get('/filmes/em-breve')
        upComingMovies.value = response.data.results
    } catch (error) {
        console.error('Erro ao buscar filmes:', error)
    } finally {
        loading.value = false
    }
}


onMounted(async () => {
    getOnScreenMovies()
    getUpComingMovies()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;700;900&display=swap');

body {
    font-family: 'Outfit', sans-serif;
}

.font-display,
h1,
h2, h3 {
    font-family: 'Bebas Neue', cursive;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

p {
    font-family: 'Outfit', sans-serif;
}
</style>