import firebase from 'firebase';
import 'firebase/firestore';

// firebase init goes here
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const { currentUser } = auth;

// date issue fix according to firebase
const settings = {};
db.settings(settings);

// firebase collections
const usersCollection = db.collection('users');
const postsCollection = db.collection('posts');
const commentsCollection = db.collection('comments');
const likesCollection = db.collection('likes');
const schedulesCollection = db.collection('schedules');


export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
  schedulesCollection,
};
