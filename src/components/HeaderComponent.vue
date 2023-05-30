<script setup lang="ts">

    import { ref } from 'vue'
    import { RouterLink, RouterView } from 'vue-router'
    
        const navbar = ref(false);

</script>

<template>
  <div>
    <nav class="relative z-50 md:pt-5">
        <div class="justify-between px-4 mx-auto md:items-center md:flex md:px-10 lg:max-w-7xl">
            <div class="flex items-center justify-between py-3 md:py-5 md:pl-7">
                <a href="">
                    <h2 class="w-24 text-xl font-bold text-center border-2 text-cyan-900 rounded-3xl border-cyan-900">tiawa.io</h2>
                </a>
                <div class="md:hidden">
                    <button class="p-2 text-gray-700 rounded-md focus:border focus:border-gray-400" @click="navbar = !navbar">
                        <div v-if="navbar">
                            <svg  fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    
                        <div v-else>
                            <svg  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <div>
                <div class="md:block" :class=" navbar ? 'block' : 'hidden'">
                    <ul class="md:flex md:space-x-5 md:space-y-0 space-y-2 items-center justify-end">
                        <li class="md:text-lg md:font-bold text-sm font-semibold text-cyan-900"><RouterLink to="/">Home</RouterLink></li>
                        <li class="md:text-lg md:font-bold text-sm font-semibold text-cyan-900"><a href="#about">About Us</a></li>
                        <li class="md:text-lg md:font-bold text-sm font-semibold text-cyan-900"><a href="#work">How it works</a></li>
                        <li class="md:text-lg md:font-bold text-sm font-semibold text-cyan-900"><a href="">Contact Us</a></li>
                        <div class="flex space-x-4">
                            <li class="md:text-lg md:font-bold text-sm font-semibold text-cyan-900"><a href="">Login</a></li>
                            <li class="w-32 space-y-5 text-center text-blue-700 border-2 border-blue-700 rounded-3xl"><a href="">Sign Up Free</a></li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
  </div>
</template>



<style scoped>

</style>