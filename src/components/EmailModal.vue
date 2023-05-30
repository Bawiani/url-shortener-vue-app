<script setup lang="ts">
    import { ref } from "vue";
    import axios from "axios";
    import BaseInput from "./BaseInput.vue";

    const props = defineProps(['shortUrl']);
    console.log(props.shortUrl);

    const emailInput = ref("");
    const message = ref("");
    const isMessage = ref(false);

    const emailURL = async() => {
        if(emailInput.value !==""){
            const params = {
                email: emailInput.value,
                shortUrl: props.shortUrl
            }
            
            await axios.post("http://localhost:9000/sendemail", params)
            .then((response) => {
                message.value = response.data.message;
            }).catch((error) => {
                message.value = error.response.message;
            })
        }else{
            message.value = 'Email Address field cannot be empty!';
            isMessage.value = true;
            setTimeout(()=>(isMessage.value = false), 2000);
        }
    }
</script>
<template>
    <div>
        <div class="bg-black/30 z-[2] top-0 bottom-0 left-0 right-0 flex justify-center items-center fixed" @click="$emit('close-modal')">
            <div class="w-[500px] h-[500px] bg-white rounded-md text-center" @click.stop>
                <div class="flex justify-end p-5"><button class="border-2 rounded w-8 h-8 text-center" @click="$emit('close-modal')">X</button></div>
                <div class="mt-16">
                    <h5>Send an email of short URL</h5>
                    <div v-if="isMessage" class="mt-5">{{message}}</div> 
                    <form @submit.prevent="emailURL">
                        <BaseInput type="email" name="email" placeholder="Enter Email Address" v-model="emailInput" className="border rounded-md w-80 h-10 pl-2 mt-7" />
                        <input type="text" name="shortUrl" :value="`${shortUrl}`" class="border rounded-md w-80 h-10 pl-2 mt-7" readonly />
                        <div class="mt-7"><button class="bg-green-500/20 border-2 w-40 h-10 rounded-md">Email URL</button></div>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
</template>