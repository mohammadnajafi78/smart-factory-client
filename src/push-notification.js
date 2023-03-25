import firebase from 'firebase/app';
import 'firebase/messaging';
import { osName } from 'react-device-detect';
import httpService from './utils/httpService';
import { API_BASE_URL } from './utils/urls';
// import {notificationUrls} from "./helpers/urls";

export const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDhfNMLezUaekqfIbzSsv9XKo1kMJVQZTg',
    authDomain: 'bts-app-5f7da.firebaseapp.com',
    projectId: 'bts-app-5f7da',
    storageBucket: 'bts-app-5f7da.appspot.com',
    messagingSenderId: '37597576269',
    appId: '1:37597576269:web:63568d216975849da1b004',
    measurementId: 'G-R1JKRXJTS6'
  };
  firebase.initializeApp(firebaseConfig);
  // navigator.serviceWorker.register("/service-worker.js").then(registration => {
  //   firebase.messaging().useServiceWorker(registration);
  // });
};
export const askForPermissionToReceiveNotifications = async () => {
  console.log('save device');
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    localStorage.setItem('notification-token', token);
    let os = '';
    if (osName === 'iOS') os = 'ios';
    else if (osName === 'Android') os = 'android';
    else os = 'others';
    let data = {
      device_id: {
        id: token,
        os: os
      }
    };
    console.log('set device id', data);
    httpService
      .post(`${API_BASE_URL}/api/users/set_device_id/`, data)
      .then(res => {
        console.log('notification info saved');
      });
    return token;
  } catch (error) {
    console.error(error);
  }
};
