<script setup lang="ts">
    
    import { saveAs } from "file-saver";

    const props = defineProps(['qrImage']);
    const downloadQRCode = () => {
        saveAs(props.qrImage, 'image.jpg');
    }
</script>
<template>
    <div>
        <div class="bg-black/30 z-[2] flex justify-center items-center top-0 bottom-0 right-0 left-0 fixed" @click="$emit('close-modal')">
            <div class="bg-white h-[500px] w-[500px] text-center rounded-md" @click.stop>
                <div class="flex justify-end p-5"><button class="border-2 rounded w-8 h-8 text-center" @click="$emit('close-modal')">X</button></div>
                <div class="mt-5">
                    <h6>QR Code For Short URL</h6>
                    <div class="flex items-center justify-center mt-6">
                        <img :src="qrImage" />
                    </div>
                    <div class="mt-4"><button class="border-2 w-40 h-10 bg-green-500/20 rounded-md" @click="downloadQRCode">Download QR Code</button></div>
                </div>
            </div>
        </div>
    </div>
</template>