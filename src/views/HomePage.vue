<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from 'vue'
import axios from 'axios'
import HeaderComponent from '../components/HeaderComponent.vue'
import BaseInput from '../components/BaseInput.vue'
import QRCodeModal from '../components/QRCodeModal.vue'
import VideoModal from '../components/VideoModal.vue'
import EmailModal from '../components/EmailModal.vue'

    const isVisible = ref(true);
    const index = ref(0);
    const shortUrl = ref("");
    const url = ref("");
    const message = ref("");
    const qrImage = ref("");
    const buttonText = ref("Shorten Link");
    const isMessage = ref(false);
    const showQRCodeModal = ref(false);
    const showVideoModal = ref(false);
    const showEmailModal = ref(false);

    onMounted(() => {
      const interval = setInterval(() => {
        isVisible.value = false;
        setTimeout(() => (isVisible.value = true), 2000);
      }, 4000);
      
      onUnmounted(() => clearInterval(interval));

      index.value = 1;

    });

    const shortenLink = async() => {
      if (url.value !== "") {
        buttonText.value = "Please wait.......";
        const params = {
          longUrl: url.value
        }
        await axios.post("http://localhost:9000/freeshorturl", params)
        .then((response) => {
          url.value = response.data.data.url.shortUrl;
          shortUrl.value = response.data.data.url.shortUrl;
          qrImage.value = response.data.data.qrImage;
        }).catch((error) => {
          console.log(error.response);
        }).finally(() => {
          buttonText.value = "Another Link";
        })
      } else {
        message.value = "URL field cannot be empty!";
        isMessage.value = true;
        setTimeout(() => isMessage.value = false, 2000);
      }
    }

    const anotherLink = () => {
      url.value = "";
      shortUrl.value = "";
      qrImage.value = "";
    }

    const copyURL = async() => {
      if(shortUrl.value !==""){
        message.value = "Please wait .....";
        try {
          await navigator.clipboard.writeText(url.value);
          message.value = "Link copied successfully!";
          isMessage.value = true;
          setTimeout(() => isMessage.value = false, 2000);
        } catch (error) {
          message.value = "Link copied fail!";
          isMessage.value = true;
          setTimeout(() => isMessage.value = false, 2000);
        }
      }else{
        message.value = "Short URL/Link not generated!";
        isMessage.value = true;
        setTimeout(() => isMessage.value = false, 2000);
      }
    }

    const visitURL = () => {
      if (shortUrl.value !=="") {
        const newWindow = window.open(url.value, '_blank', 'noopener, noreferrer');
        if(newWindow) newWindow.opener = null;
      } else {
        message.value = "Short URL/Link not generated!";
        isMessage.value = true;
        setTimeout(() => isMessage.value = false, 2000);
      }
    }

    const openEmailModal = () => {
      if (shortUrl.value !=="") {
        showEmailModal.value = true;
      } else {
        message.value = "Short URL/Link not generated!";
        isMessage.value = true;
        setTimeout(() => isMessage.value = false, 2000);
      }
    }

    const openQRCodeModal = () => {
      if (shortUrl.value !=="") {
        showQRCodeModal.value = true;
      } else {
        message.value = "Short URL/Link not generated!";
        isMessage.value = true;
        setTimeout(() => isMessage.value = false, 2000);
      }
    }
    
</script>


<template>

  <div class="w-full h-full md:px-28">
    <div class="bg-gray-100 pl-2 md:h-[700px]">
      <HeaderComponent />
      <div class="relative justify-between md:top-8 md:flex">
        <div class="max-w-md pl-2 md:pl-8">
          <div :class="isVisible ? 'block' : 'hidden'">
            <p class='text-base font-extrabold text-cyan-900 md:font-extrabold md:text-4xl'>Link shortening</p> 
            <p class='md:mt-1 md:mb-1'><span class='absolute -skew-y-6 border border-red-600 rounded-[50%/60%_60%_40%_40%] h-6 md:h-14 bg-gray-100/5 w-[97px] md:w-[215px] left-0 md:left-3 top-6 md:top-10'></span><span class='text-base font-extrabold text-blue-600 md:font-extrabold md:text-4xl'>made easy </span><span class='text-base font-extrabold text-cyan-900 md:font-extrabold md:text-4xl'>with</span></p> 
            <p class='text-base font-extrabold text-cyan-900 md:font-extrabold md:text-4xl'>just a click</p>
          </div>
          <div :class="isVisible ? 'hidden' : 'block'">
            <p class='text-base font-extrabold text-cyan-900 md:font-extrabold md:text-4xl'>Making life a lot</p> 
            <p class='md:mt-1 md:mb-1'><span class='absolute -skew-y-6 border border-red-600 rounded-[50%/60%_60%_40%_40%] h-8 md:h-14 bg-gray-100/5 w-[140px] md:w-[350px] left-1 md:left-3 top-4 md:top-8'></span><span class='text-base font-extrabold text-blue-600 md:font-extrabold md:text-4xl'>less complicated</span></p> 
            <p class='text-base font-extrabold text-cyan-900 md:font-extrabold md:text-4xl'>with just a click</p>
          </div>
          <p class='mt-3 text-xs md:mt-9 md:font-extralight md:text-base md:w-96'>The easiest and fastest way to shorten your long and complex URL into concise and memorable links</p>
          <div class='flex items-center justify-center mt-3 md:mt-9 '>
            <button class='bg-blue-600 text-white rounded-full p-2 text-xs mr-4 md:mr-14 md:text-sm' title="">Create Free Account</button>
            <button class='flex items-center justify-center space-x-2' @click="showVideoModal = true"><font-awesome-icon icon="fa-regular fa-circle-play" size="xl" /><span class='text-xs md:text-sm'>Watch Demo</span></button>
            <VideoModal v-show="showVideoModal" @close-modal="showVideoModal = false" />
          </div>
        </div>
        <div class="flex w-auto md:w-1/2 pt-6 md:pt-0">
          <div class="pl-12 pt-12 md:pt-12 md:pl-0">
            <div class="space-x-4" v-for="index in 10" :key="index">
              <span v-for="index in 5" :key="index"><button class="rounded-full border-2"></button></span>
            </div>
          </div>
          <div class='w-40 md:w-[420px] md:h-64 md:pt-2'>
            <div class='ml-12 md:ml-16 relative
              after:w-[165px] after:h-[95px]  after:rounded-[50%/38%_37%_5%_20%] after:bg-transparent after:border-none after:hover:border-blue-800 after:absolute after:right-[-10px] after:z-[1]
              odd:after:border-t-2 odd:after:border-dashed odd:after:border-black odd:after:rotate-[-90deg] odd:after:absolute odd:after:left-[-45px] after:bottom-[-128px]
              '>
              <div class='flex items-center justify-center bg-cyan-900 rounded-full w-10 h-8 md:w-12 md:h-10 ml-3'><font-awesome-icon icon="fa-solid fa-chart-simple" size="xl"  /></div>
              <div class='text-xs'>Deep Analytics</div>
            </div>
            <div class='flex items-center ml-48 md:ml-80 md:mt-[18px] mt-14'>
              <div class='relative
                  after:w-[150px] md:after:w-[277px] after:h-[85px] md:after:h-[150px]  after:rounded-[60%/1%_31%_87%_50%] after:bg-transparent after:border-none after:hover:border-blue-800 after:absolute after:right-[0px] after:z-[1] after:bottom-[-40px] md:after:bottom-[-145px]
                  odd:after:border-t-2 odd:after:border-dashed odd:after:border-black odd:after:rotate-[-50deg] md:odd:after:rotate-[-40deg] odd:after:absolute odd:after:left-[-110px] md:odd:after:left-[-200px] '>
                <div class='flex items-center justify-center bg-blue-600 rounded-full w-10 h-8 md:w-12 md:h-10 md:ml-4'><font-awesome-icon icon="fa-solid fa-clock-rotate-left" /></div>
                <div class='text-xs'>Full Link History</div>
              </div>
            </div>
            <div class='flex items-center justify-start mt-6 ml-10 md:space-x-6 md:mt-[87px] md:ml-14'>
              <div class='flex items-center justify-center bg-red-600 rounded-full w-10 h-8 md:w-12 md:h-10'><font-awesome-icon icon="fa-solid fa-shield" size="xl" /></div>
              <div class='text-xs'>Secured Links</div>
            </div>
          </div>
        </div>
        <div class="absolute right-0 z-0 h-72 rounded-l-full md:w-1/2 md:h-screen w-80 bg-blue-600/20 top-40 md:-top-72 md:left-1/2 hover:border-4 hover:border-blue-500 mt-3 md:mt-0"></div>
      </div>
      <div class="pb-5 mr-2 md:mr-0">
        <form class="w-full mt-5 md:px-60 md:mt-32" @submit.prevent="buttonText ==='Shorten Link' ? shortenLink() : anotherLink()">
          <div v-if="isMessage" class="text-center">{{message}}</div>
          <div class='relative'>
              <BaseInput type="text" name="url" placeholder="Paste Your Long URL Here" v-model="url" className="block w-full h-9 md:h-11 pl-5 md:p-3 md:pl-6 md:pr-36 rounded-full bg-blue-100 text-sm" />
              <button type="submit" class="absolute right-1 bottom-1 px-5 py-1 md:px-7 md:py-2 rounded-full text-white text-sm" :class="buttonText === 'Shorten Link' ? 'bg-blue-700/70' : 'bg-red-700/70' ">{{buttonText}}</button>
          </div>
        </form>
      </div>
      <div class="flex items-center justify-center space-x-10 md:mb-5">
        <div>
          <button class="flex items-center justify-center bg-red-600 rounded-md md:w-10 md:h-[38px]" @click="copyURL"><font-awesome-icon icon="fa-regular fa-copy" size="xl" color="white" /></button>
          <span class="text-center text-[9px] font-bold">Copy URL</span>
        </div>
        <div>
          <button class="flex items-center justify-center bg-red-600 rounded-md md:w-10 md:h-[38px]" @click="visitURL"><font-awesome-icon icon="fa-solid fa-share-from-square" size="xl" color="white" /></button>
          <span class="text-center text-[9px] font-bold">Visit URL</span>
        </div>
        <div>
          <button class="flex items-center justify-center bg-blue-600 rounded-md md:w-10 md:h-[38px]" @click="openEmailModal"><font-awesome-icon icon="fa-solid fa-envelope" size="xl" color="white" /></button>
            <EmailModal v-show="showEmailModal" @close-modal="showEmailModal = false" v-bind:shortUrl="shortUrl" />
          <span class="text-center text-[9px] font-bold">Email URL</span>
        </div>
        <div>
          <button class="flex items-center justify-center bg-cyan-900 rounded-md md:w-10 md:h-[38px]" @click="openQRCodeModal"><font-awesome-icon icon="fa-solid fa-qrcode fa-beat-fade" size="xl" color="white" /></button>
            <QRCodeModal v-show="showQRCodeModal" @close-modal="showQRCodeModal = false" v-bind:qrImage="qrImage" />
          <span class="text-center text-[9px] font-bold">QR Code</span>
        </div>
      </div>
    </div>
    <div id='about' class="bg-white md:h-[500px]">
      <div class='md:mt-28' >
        <p class='flex items-center justify-center mt-10'><span class='w-[215px] h-14 bg-gray-100/5 rounded-[50%/60%_60%_40%_40%] border-red-700 border absolute -skew-y-6 left-[90px] top-[689px] md:left-[570px] md:top-[799px]'></span><span class='text-2xl font-extrabold text-center text-cyan-900'>About tiawa.io</span></p>
        <h1 class='font-extrabold text-center text-purple-900'>________</h1>
      </div>
      <div class='mt-5'>
        <div class="text-center md:px-56">
          <p class='text-sm md:text-base'>Tiawa.io is an indigenous SaaS company that specializes in making life easier with just a click. Let's start with our URL shortener website. Our platform is fast, reliable, and easy-to-use solution created by a dedicated team of developers.</p>
        </div>
      </div>
      <div class='mt-5 mb-10'>
        <div class="text-center md:px-60">
          <p class='text-sm md:text-base'>tiawa.io is constantly updated to reflect the most recent technology and trends, and we provide advanced analytics to track and analyze link performance. We respect your privacy and security, and all links generated by our platform are safe and secure.</p>
        </div>
      </div>
      <div class='flex items-center justify-center mt-10 '>
        <button class='bg-blue-600 text-white rounded-full p-2 text-sm mr-0 mb-10'>Create Free Account</button>
      </div>
    </div>
    <div class="bg-gray-100 md:h-[650px]">
      <div>
        <div class=''>&nbsp;</div>
          <p class='text-2xl font-extrabold text-center text-cyan-900 md:mt-28'>tiawa.io provides you with more</p>
          <h1 class='font-extrabold text-center text-purple-900'>________</h1>
      </div>
      <div class='items-center justify-center px-8 md:flex md:px-0 md:space-x-3 md:mt-5'>
        <div class='w-56 bg-white rounded-lg md:h-72 h-60'>
          <div class='flex items-center justify-center mt-5'><font-awesome-icon icon="fa-solid fa-truck" size="2xl" /></div>
          <p class='flex items-center justify-center mx-10 mt-5 font-extrabold text-center text-cyan-900'>Create Branded Short Link</p>
          <p class='mx-5 mt-2 text-sm text-center'>Increase the impact of your brand by creating custom short links that are as unique as your company.</p>
        </div>
        <div class='w-56 bg-white rounded-lg md:h-72 h-60'>
          <div class='flex items-center justify-center mt-5'><font-awesome-icon icon="fa-solid fa-cart-shopping" size="2xl" /></div>
          <p class='flex items-center justify-center mx-12 mt-5 font-extrabold text-center text-cyan-900'>Deep Analytics on Links</p>
          <p class='mx-5 mt-2 text-sm text-center'>Unlock valuable insights and make data-driven decisions with powerful analytics on your links.</p>
        </div>
        <div class='w-56 bg-white rounded-lg md:h-72 h-60'>
          <div class='flex items-center justify-center mt-5'><font-awesome-icon icon="fa-solid fa-user" size="2xl" /></div>
          <p class='flex items-center justify-center mx-12 mt-5 font-extrabold text-center text-cyan-900'>QR Codes Enabled</p>
          <p class='mx-5 mt-2 text-sm text-center'>QR codes, the simplest way to connect the physical and digital worlds, can help you up your marketing game.</p>
        </div>
        <div class='w-56 bg-white rounded-lg md:h-72 h-60'>
          <div class='flex items-center justify-center mt-5'><font-awesome-icon icon="fa-solid fa-truck-moving" size="2xl" /></div>
          <p class='flex items-center justify-center mx-12 mt-5 font-extrabold text-center text-cyan-900'>Team Collaboration</p>
          <p class='mx-6 mt-2 text-sm text-center'>Get more done, together - streamline your workflows and boost productivity with seamless team collaboration.</p>
        </div>
      </div>
      <div class='flex items-center justify-center mt-10 '>
        <button class='bg-blue-600 text-white rounded-full p-2 text-sm mr-0 mb-10'>Create Free Account</button>
      </div>
    </div>
    <div id='work' class='bg-gray-100 h-[550px]'>
      <div class='bg-[rgb(87,82,218)] h-auto w-auto -skew-y-6 transition md:h-[600px]'>
        <div class='flex items-center justify-center w-full skew-y-6'>
          <div class='mt-10 text-2xl font-extrabold text-center text-white w-60 md:mt-28'>All in one proof for final mile delivery so<span className='line-through'>lutio</span>ns</div>
        </div>
        <div class='flex skew-y-6'>
          <div class='hidden w-auto mt-5 md:w-56 md:block pl-3'>
            <div class="space-x-4" v-for="index in 10" :key="index">
              <span v-for="index in 3" :key="index"><button class="rounded-full border-2"></button></span>
            </div>
          </div>
          <div class='flex items-center justify-center md:mt-10 md:space-x-5'>
            <div class='md:w-56'>
              <div class='flex items-center justify-center relative
                after:w-[200px] after:h-[95px]  after:rounded-[50%/32%_40%_5%_20%] after:bg-transparent after:border-none after:absolute after:right-[-10px] after:z-[1]
                odd:after:border-t-2 odd:after:border-dashed odd:after:border-[rgba(255,255,255,0.4)] odd:after:rotate-[-0deg] odd:after:absolute odd:after:left-[140px] after:bottom-[-32px]
                '>
                <div class='w-0 h-0
                  border-t-[35px] border-t-transparent
                  border-l-[65px] border-l-[rgba(255,255,255,0.2)]
                  border-b-[35px] border-b-transparent'>
                </div>
              </div>
              <p class='flex items-center justify-center mt-5 text-sm font-bold text-center text-white md:font-extrabold md:text-xl md:mx-5'>Real-time tracking</p>
              <p class='mt-5 text-sm text-center text-white md:mx-3'>By adopting real time delivery tracking software, final mile delivery management has become easier.</p>
            </div>
            <div class='md:w-56'>
              <div class='flex items-center justify-center'>
                <div class='w-0 h-0 -skew-y-6
                  border-t-[50px] border-t-transparent
                  border-r-[75px] border-r-[rgba(255,255,255,0.2)]
                  border-b-[20px] border-b-transparent flex items-center justify-center relative'>
                    
                </div>
                <div class="absolute pt-3 pl-7"><font-awesome-icon icon="fa-solid fa-user" size="2xl" color="rgba(255,255,255,0.2)" /></div>
              </div>
              <p class='flex items-center justify-center mt-5 text-sm font-bold text-center text-white md:font-extrabold md:text-xl md:mx-5'>Proof of Delivery</p>
              <p class='mt-5 text-sm text-center text-white md:mx-3'>The system works with the electronic and digital signatures of the recipient on receiving the delivery item</p>
            </div>
            <div class='md:w-56'>
              <div class='flex items-center justify-center relative
                after:w-[190px] after:h-[95px]  after:rounded-[50%/18%_18%_5%_20%] after:bg-transparent after:border-none after:absolute after:right-[-10px] after:z-[1]
                odd:after:border-t-2 odd:after:border-dashed odd:after:border-[rgba(255,255,255,0.4)] odd:after:rotate-[-180deg] odd:after:absolute odd:after:left-[-95px] after:bottom-[5px] 
              '>
                <div class='w-0 h-0 -skew-y-12 skew-x-12
                  border-l-[40px] border-l-transparent
                  border-b-[65px] border-b-[rgba(255,255,255,0.2)]
                  border-r-[40px] border-r-transparent flex items-center justify-center relative'>
                    
                </div>
                <div class='absolute pt-5'><font-awesome-icon icon="fa-solid fa-bell" size="2xl" color="rgba(255,255,255,0.2)" /></div>
              </div>
              <p class='flex items-center justify-center mt-5 text-sm font-bold text-center text-white md:font-extrabold md:text-xl md:mx-5'>Real-time tracking</p>
              <p class='mt-5 text-sm text-center text-white md:mx-3'>By adopting real time delivery tracking software, final mile delivery management has become easier.</p>
            </div>
          </div>
        </div>

        <div>&nbsp;</div> 
      </div>
      <div class='transition-all -skew-y-6 bg-gradient-to-br from-indigo-700 to-purple-600 opacity-50'>&nbsp;</div>
    </div>
    <div class='bg-gray-100'>
      <div class='grid items-center justify-center grid-cols-3 gap-3 px-2 mt-30 md:flex md:space-x-4 md:mt-40 md:px-28'>
        <div class='md:w-72 md:mt-16'>
          <button class='w-24 text-lg font-bold text-center transition border rounded-full border-cyan-900 text-cyan-900'>tiawa.io</button>
          <div class='mt-1 space-y-2'>
            <div class='hidden text-sm md:block'>&nbsp;</div>
            <div class='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
            <div>&nbsp;</div>
          </div>
        </div>
        <div class='mt-2 md:w-56 md:mt-16'>
          <div>Product</div>
          <div class='mt-4 space-y-2'>
            <div>Features</div>
            <div>API</div>
            <div>Solutions</div>
          </div>
        </div>
        <div class='mt-2 md:w-56 md:mt-16'>
          <div>Company</div>
          <div class='mt-4 space-y-2'>
            <div>About Us</div>
            <div>Blogs</div>
            <div>Contact Us</div>
          </div>
        </div>
        <div class='md:w-56 md:mt-16 w-36'>
          <div>Support</div>
          <div class='mt-4 space-y-2'>
            <div>Support center</div>
            <div>System status</div>
            <div>Languages</div>
          </div>
        </div>
        <div class='pl-10 md:w-56 md:mt-16 md:pl-0 w-36'>
          <div>Follow Us</div>
          <div class='mt-4 space-y-2'>
            <div class='flex space-x-5'><font-awesome-icon icon="fa-brands fa-facebook" size="2xl" color="blue" /><div class='flex items-center justify-center'><font-awesome-icon icon="fa-brands fa-twitter" size="2xl" /></div><div className='flex items-center justify-center'><font-awesome-icon icon="fa-brands fa-instagram" size="2xl" /></div></div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>
