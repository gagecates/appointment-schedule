import firebase from "firebase/app"
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyC5Bh-ixZFXwnfA6PzBXQn8gDSulZBwOpM",
    authDomain: "pocket-rn-7b032.firebaseapp.com",
    projectId: "pocket-rn-7b032",
    storageBucket: "pocket-rn-7b032.appspot.com",
    messagingSenderId: "1015467175985",
    appId: "1:1015467175985:web:4f0dba57b29619ce102510",
    measurementId: "G-RBXPWC4T3F"
})

export const auth = app.auth()
export default app