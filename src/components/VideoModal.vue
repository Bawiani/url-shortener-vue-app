<script setup lang="ts">
import { ref } from 'vue';

const videoPlayer = ref(null);

</script>


<template>
    <div>
        <div class="bg-black/30 z-[2] flex justify-center items-center top-0 bottom-0 left-0 right-0 fixed" @click="$emit('close-modal', videoPlayer.pause(), videoPlayer.currentTime = 0)">
            <div class="bg-white w-[500px] h-[500px] text-center rounded-md" @click.stop>
                <div class="flex justify-end p-5"><button class="border-2 rounded text-center w-8 h-8" @click="$emit('close-modal', videoPlayer.pause(), videoPlayer.currentTime = 0 )">X</button></div>
                <div class="flex justify-center items-center pt-5">
                    <video controls width="420" height="540" ref="videoPlayer">
                        <source src="/video.m4v" type="video/mp4">
                    </video>
                </div>
            </div>
        </div>
    </div>
</template>