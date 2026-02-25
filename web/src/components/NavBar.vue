<template>
    <nav class="fixed w-full border-b border-neutral-800 bg-neutral-950 text-neutral-200 font-inter z-100">
        <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="text-sm tracking-wide font-medium">Cine Estelar</div>

            <div class="hidden md:flex items-center gap-8 text-sm text-neutral-400">
                <a href="#" class="hover:text-neutral-200 transition">Em Cartaz</a>
                <a href="#" class="hover:text-neutral-200 transition">Em Breve</a>
                <a href="#" class="hover:text-neutral-200 transition">Sessões / Horários</a>
                <a href="#" class="hover:text-neutral-200 transition">Buscar</a>
            </div>

            <div class="flex items-center gap-4">
                <button
                    class="px-4 py-2 bg-red-900 rounded text-xs font-bold uppercase tracking-wider transition-colors hover:bg-red-800">Entrar</button>
                <button
                    class="px-4 py-2 border border-neutral-600 rounded text-xs font-bold uppercase tracking-wider transition-colors hover:border-neutral-400 hover:text-neutral-200">Registrar</button>
            </div>
        </div>
    </nav>

</template>

<script setup lang="ts">
</script>

<style scoped></style>
