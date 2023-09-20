import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, type User } from 'firebase/auth'
import { ref } from 'vue'

// Shared state
const app = initializeApp({
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
})

const auth = getAuth(app)
const firebaseUser = ref<User | null>(auth.currentUser)

const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        firebaseUser.value = userCredential.user
        resolve(userCredential.user)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default () => {
  // State for each composable

  return {
    login,
    firebaseUser,
  }
}
