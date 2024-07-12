importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

var firebaseConfig = {
  apiKey: 'AIzaSyDhfNMLezUaekqfIbzSsv9XKo1kMJVQZTg',
  authDomain: 'bts-app-5f7da.firebaseapp.com',
  projectId: 'bts-app-5f7da',
  storageBucket: 'bts-app-5f7da.appspot.com',
  messagingSenderId: '37597576269',
  appId: '1:37597576269:web:63568d216975849da1b004',
  measurementId: 'G-R1JKRXJTS6'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
// Customize notification here
// const notificationTitle = "Background Message Title";
// const notificationOptions = {
//   body: "Background Message body.",
//   icon: "/firebase-logo.png"
// };

// self.registration.showNotification(notificationTitle, notificationOptions);
// });
