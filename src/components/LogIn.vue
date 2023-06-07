<script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import BaseInput from './BaseInput.vue'
    import axios from 'axios'

    const passwordShown = ref(true);
    const isMessage = ref(false);
    const message = ref("");
    const email = ref("");
    const password = ref("");

    const route = useRouter();

    const togglePasswordCharacters = () => {
        if(passwordShown.value === true){
            passwordShown.value = false
        }else(
            passwordShown.value = true
        )
    }

    const onLogIn = async() => {
        if (email.value !== "" && password.value !=="") {
            const params = {
                email: email.value,
                password: password.value
            }
            await axios.post("http://localhost:9000/login", params)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                route.push({name: 'CreatingLink'});
                // console.log(response.data);
            }).catch((error) => {
                message.value = error.response.data.message;
                isMessage.value = true;
                setTimeout(() => isMessage.value = false, 2000);
            })
        }else{
            message.value = 'Please fields cannot be empty!'
            isMessage.value = true;
            setTimeout(() => isMessage.value = false, 2000);
        }
    }

</script>
<template>
    <div>
        <div class="bg-black/30 flex items-center justify-center top-0 bottom-0 right-0 left-0 fixed" @click="$emit('close-modal')">
            <div class="bg-white w-[500px] h-[550px] rounded-md" @click.stop>
                <div class=" flex justify-end p-5"><button class="border w-8 h-8 rounded" @click="$emit('close-modal')">X</button></div>
                <div class="flex flex-col items-center justify-center">
                    <div class="w-7 h-7 bg-gray-400 rounded-full hover:border-2 hover:border-purple-600"></div>
                    <div class="text-xl font-medium mt-2">Sign in to Tiawa.io</div>
                    <div class="text-xs">Enjoy a new experience!</div>
                        <div v-if="isMessage" class='flex items-center justify-center mt-3 pb-0'>{{message}}</div>
                        <form @submit.prevent="onLogIn">
                            <div  class="mt-5">
                                <div>Email</div>
                                <div><BaseInput type="email" name="email" className="w-[310px] pl-3 border rounded-md h-9" v-model="email" /></div>
                            </div>
                            <div class="mt-3">
                                <div class="flex justify-between w-[310px]"><span>Password</span><button class="flex items-center justify-center space-x-3" @click.prevent="togglePasswordCharacters"><font-awesome-icon icon="fa-solid fa-eye-slash" /> <span>Hide</span></button></div>
                                <div><BaseInput :type="passwordShown ? 'password' : 'text'" name="password" className="w-[310px] pl-3 border rounded-md h-9" v-model="password" /></div>
                            </div>
                            <div class="flex items-center justify-center mt-4"><button type="submit" class="bg-blue-500 text-white rounded-full w-[305px] h-10">Log in</button></div>
                        </form>
                    <button class="w-[350px] h-[35px] border flex items-center justify-center space-x-5 mt-6 rounded-full" ><font-awesome-icon icon="fa-brands fa-facebook" style="color: blue" /> <span>Continue with facebook</span></button>
                    
                    <button class="w-[350px] h-[35px] border flex items-center justify-center space-x-5 mt-2 rounded-full" ><font-awesome-icon icon="fa-brands fa-google" /> <span>Continue with Google</span></button>
                    
                    <div class="mt-5 text-xs flex space-x-1"><span>Don't have an account yet?</span> <button class="underline text-blue-500" @click="$emit('open-signup-modal')">Sign up </button></div>
                </div>
            </div>
        </div>
    </div>
</template>