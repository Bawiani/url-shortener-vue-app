<script setup lang="ts">
    import { ref } from 'vue'
    import axios from 'axios'
    import BaseInput from './BaseInput.vue'

    const isMessage = ref(false);
    const message = ref("");
    const firstname = ref("");
    const lastname = ref("");
    const email = ref("");
    const password = ref("");
    const confirmpassword = ref("");
    const passwordShown = ref(true);

    const togglePasswordCharacters = () => {
        if(passwordShown.value === true){
            passwordShown.value = false;
        }else{
            passwordShown.value = true;
        }
    }

    const submitData = async() => {
        if(firstname.value !=="" && lastname.value !=="" && email.value !=="" && password.value !=="" && confirmpassword.value !==""){
            const params = {
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                password: password.value,
                confirmpassword: confirmpassword.value
            }
            await axios.post("http://localhost:9000/register", params)
            .then((response) => {
                // console.log(response.data);
                message.value = response.data.message;
                isMessage.value = true;
                setTimeout(() => isMessage.value = false, 2000);
            }).catch((error) => {
                console.log(error.response);
            })
        }else{
            message.value = "field is empty!";
            isMessage.value = true;
            setTimeout(() => isMessage.value = false, 2000);
        }
        
    }

</script>
<template>
    <div>
        <div class="flex justify-center items-center bg-black/30 z-[2] top-0 bottom-0 right-0 left-0 fixed" @click="$emit('close-modal')">
            <div class="bg-white rounded-md w-[500px] h-[580px]" @click.stop>
                <div class="flex justify-end p-5"><button class="border rounded-md w-8 h-8" @click="$emit('close-modal')">X</button></div>
                <div class='pt-1'>
                    <div class="flex flex-col items-center justify-center">
                        <div class="w-7 h-7 bg-gray-400 rounded-full hover:border-2 hover:border-purple-600"></div>
                        <div class="text-xl font-medium mt-1">Create an account</div>
                        <div class="flex space-x-1"><span>Already have an account?</span> <button class="underline" title="" @click="$emit('open-login-modal')">Log in</button></div>
                        <div class="mt-2">
                            <div v-if="isMessage" class="flex items-center justify-center"><p>{{message}}</p></div>
                            <form action="" @submit.prevent="submitData">
                                <div class="flex space-x-4">
                                    <div>
                                        <div>First name</div>
                                        <div><BaseInput className="rounded-md border h-10 w-[183px] pl-3" type="text" name="firstname" v-model="firstname" /></div>
                                    </div>
                                    <div>
                                        <div>Last name</div>
                                        <div><BaseInput className="rounded-md border h-10 w-[183px] pl-3" type="text" name="lastname" v-model="lastname"  /></div>
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <div>Email address</div>
                                    <div><BaseInput className="rounded-md border h-10 w-[380px] pl-3" type="email" name="email" placeholder="testemail@tiawa.com" v-model="email" /></div>
                                </div>
                                <div class="flex space-x-4 mt-2">
                                    <div>
                                        <div>Password</div>
                                        <div><BaseInput className="rounded-md border h-10 w-[183px] pl-3" :type="passwordShown ? 'password' : 'text'" name="password" v-model="password"  minLength={8} /></div>
                                    </div>
                                    <div>
                                        <div>Confirm your password</div>
                                        <div><BaseInput className="rounded-md border h-10 w-[183px] pl-3" :type="passwordShown ? 'password' : 'text'" name="confirmpassword" v-model="confirmpassword"  minLength={8} /></div>
                                    </div>
                                </div>
                                <div class="text-[13px]">Use 8 or more characters with a mix of letters, numbers & symbols</div>
                                <div class="flex items-center"><BaseInput className="w-3 h-3" type="checkbox" name="showpassword" @click="togglePasswordCharacters" /> &nbsp;<span class="pt-1 text-xs">Show password</span></div>
                                <div class="flex items-center mt-1 w-[320px]"><BaseInput className="w-3 h-3" type="checkbox" name="showpassword" /> &nbsp;<span class="pt-1 text-xs">By creating an account, I agree to our <span class='underline'>Terms of use</span> and <span class='underline'>Privacy Policy</span> </span></div>
                                <div class="flex items-center justify-center mt-2"><button type="submit" class="w-[350px] h-[40px] border rounded-full bg-blue-600 text-white" title="">Create an account</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>