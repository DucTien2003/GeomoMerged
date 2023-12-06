<template>
  <div
    class="bg-image flex flex-col items-center justify-center lg:h-screen"
    id="webcam-app"
  >
    <!-- Download -->
    <a ref="downloadElement" href="#" download="user.png" target="_blank"> </a>

    <!-- Camera -->
    <div class="flex items-center justify-center">
      <div class="h-screen">
        <video ref="webcamElement" id="webcam" autoplay playsinline></video>
        <canvas ref="canvasElement" id="canvas" class="hidden"></canvas>
        <audio ref="snapSoundElement" src="/snap.wav" preload="auto"></audio>
      </div>
    </div>

    <!-- Actions -->
    <div class="absolute lg:top-5 lg:left-8 lg:px-28 top-5 left-5 z-50">
      <router-link :to="{ name: 'home' }">
        <a-button class="btn-webcam" type="primary" @click="exit" title="Exit">
          <img
            class="icon-webcam"
            src="../../assets/images/webcam/exit.svg"
            alt="Exit"
          />
        </a-button>
      </router-link>
    </div>

    <!-- Controls -->
    <div class="control-group flex items-center absolute lg:bottom-5 z-50">
      <a-button
        class="btn-webcam"
        type="primary"
        @click="toggleCamera"
        :title="isOnCamera ? 'Off Camera' : 'On Camera'"
      >
        <img
          class="icon-webcam"
          v-if="isOnCamera"
          src="../../assets/images/webcam/camera-on.svg"
          alt="camera-on"
        />

        <img
          class="icon-webcam"
          v-else
          src="../../assets/images/webcam/camera-off.svg"
          alt="camera-off"
        />
      </a-button>

      <a-button
        class="btn-webcam mx-10"
        v-if="isTookPhoto"
        type="primary"
        @click="resumeCamera"
        title="Resume camera"
      >
        <img
          class="icon-webcam"
          src="../../assets/images/webcam/take-photo.svg"
          alt="camera"
        />
      </a-button>

      <a-button
        class="btn-webcam mx-10"
        v-else
        type="primary"
        @click="takePhoto"
        title="Take photo"
      >
        <img
          class="icon-webcam"
          src="../../assets/images/webcam/take-photo.svg"
          alt="camera"
        />
      </a-button>

      <a-button
        class="btn-webcam"
        type="primary"
        @click="flipCamera"
        title="Flip camera"
      >
        <img
          class="icon-webcam"
          src="../../assets/images/webcam/camera-flip.svg"
          alt="camera"
        />
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import Webcam from './webcam';
import { deviceHeight } from '@/utils';

const router = useRouter();

const webcamElement = ref();
const canvasElement = ref();
const snapSoundElement = ref();
const downloadElement = ref();
const picture = ref();

const isOnCamera = ref(true);
const isTookPhoto = ref(false);

let webcam: Webcam;
onMounted(() => {
  if (webcamElement.value && canvasElement.value && snapSoundElement.value) {
    webcam = new Webcam(
      webcamElement.value,
      'user',
      canvasElement.value,
      snapSoundElement.value,
    );
  }

  webcamElement.value.style.height = deviceHeight + 'px';

  webcam.start();
  webcam.stop();
});

onUnmounted(() => {
  webcam.stop();
});

const flipCamera = () => {
  webcam.flip();
  webcam.start();
};

const toggleCamera = () => {
  if (isOnCamera.value) {
    webcam.stop();
    isOnCamera.value = false;
  } else {
    webcam.start();
    isOnCamera.value = true;
  }
};

const beforeTakePhoto = () => {
  isTookPhoto.value = true;
};

const afterTakePhoto = async () => {
  canvasElement.value.classList.remove('hidden');
  webcamElement.value.classList.add('hidden');
  webcam.stop();

  // Handle formData
  const bodyFormData = new FormData();
  bodyFormData.append('imageUser', picture.value);

  // console.log(bodyFormData);
  // for (const pair of bodyFormData.entries()) {
  //   const [key, value] = pair;
  //   console.log(`Key: ${key}, Value: ${value}`);
  // }
  // Handle POST requests
  // await axios
  //   .post('http://127.0.0.1:6868/image', bodyFormData)
  //   .then((response) => {
  //     // Xử lý kết quả
  //     if (response.status === 200) {
  //       // const data: DataMeasurement[] = response.data.data;
  //       // dataMeasurementStore().setDataMeasurement(data);
  //       // console.log(data);
  //       router.push({ name: 'geometry' });
  //     }
  //   })
  //   .catch((error) => {
  //     // Xử lý lỗi
  //     console.log(error.message);
  //   });

  router.push({ name: 'geometry' });
};

const takePhoto = () => {
  beforeTakePhoto();
  picture.value = webcam.snap(); // Chuỗi Base64
  // console.log(picture.value);
  downloadElement.value.href = picture.value;
  afterTakePhoto();
};

const resumeCamera = () => {
  canvasElement.value.classList.add('hidden');
  webcamElement.value.classList.remove('hidden');
  webcam.start();
};

const exit = () => {
  canvasElement.value.classList.add('hidden');
  webcamElement.value.classList.remove('hidden');
  webcam.stop();
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';

#webcam-app {
  position: relative;
  background-image: url(../../assets/images/background.jpg);
  min-height: 100vh;
}

#webcam {
  // display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // height: 100vh !important;
  // min-height: 100vh !important;
  height: auto;
  width: 100%;
  // z-index: 40;
  pointer-events: none;
  margin: 0 auto;
}

#canvas {
  background-color: transparent;
  position: absolute;
  // z-index: 40;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
}

.control-group {
  @include respond-to(mobile) {
    top: 600px;
  }
}

.icon-webcam {
  display: block;
  width: 40px;
}

.btn-webcam {
  background-color: rgba($color: $color-primary-2, $alpha: 0.2) !important;
  padding: 20px;
}
</style>
