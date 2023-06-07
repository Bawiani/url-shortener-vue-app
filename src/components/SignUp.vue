<script setup lang="ts">
    //import { ref } from 'vue'

    // const showCreateAccountModal = ref(false);

    // import LogIn from './LogIn.vue'

    // const emit = defineEmits(['close-modal']);
    // const showLogInModal = ref(false);

    // const logInModal = () => {
        
    //     emit('close-modal');
    //     showLogInModal.value = true
    // }
</script>
<template>
    <div>
        <div class="flex justify-center items-center bg-black/30 z-[2] top-0 bottom-0 right-0 left-0 fixed" @click="$emit('close-modal')">
            <div class="bg-white rounded-md w-[500px] h-[500px]">
                <div class="flex justify-end p-5"><button class="border rounded w-8 h-8" @click="$emit('close-modal')">X</button></div>
                <div class='mt-5'>
                    <div class="flex flex-col items-center justify-center">
                        <div class="w-7 h-7 bg-gray-400 rounded-full hover:border-2 hover:border-purple-600"></div>
                        <div class="text-xl font-medium mt-3">Create an account</div>
                        <div class="flex space-x-1"><span>Already have an account?</span> <button class="underline" @click="$emit('open-login-modal')">Log in</button></div>
                        <button class="w-[350px] h-[35px] border flex items-center justify-center space-x-5 mt-9 rounded-full" ><font-awesome-icon icon="fa-brands fa-facebook" style="color: blue" /> <span>Continue with facebook</span>
                        
                        </button>
                        
                        <button class="w-[350px] h-[35px] border flex items-center justify-center space-x-5 mt-3 rounded-full" ><font-awesome-icon icon="fa-brands fa-google" /> <span>Continue with Google</span>
                            
                        </button>
                       
                        <div class="flex items-center justify-center space-x-4 mt-4">
                            <hr class="w-[150px] border-1" /> <span>OR</span> <hr class="w-[150px] border-1" />
                        </div>
                        <div class="mt-8">Click on the button to create an account.</div>
                        
                        <button class="w-[350px] h-[40px] border flex items-center justify-center mt-4 rounded-full bg-blue-600 text-white" @click="$emit('open-account-modal')">Create an account</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>