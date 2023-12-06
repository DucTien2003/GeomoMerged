import { ref } from 'vue';
import { Dayjs } from 'dayjs';

export const extend = Object.assign;

// Add zero
export const addZero = (number: number) => {
  return number < 10 ? '0' + number : number;
};

// Dayjs
export const getDate = (date: Dayjs) => {
  return date.format('YYYY-MM-DD');
};
export const getTime = (time: Dayjs) => {
  return time.format('HH:mm');
};

// Check device
export const isDesktop = ref<boolean>(window.innerWidth >= 1024);

// Size of device
export const deviceWidth = window.innerWidth;
export const deviceHeight = window.innerHeight;
