import { initializeApp } from 'firebase/app'
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  type User,
} from 'firebase/auth'
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
setPersistence(auth, browserLocalPersistence) // Keep track of logged in user in the browser

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

const logout = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        firebaseUser.value = null
        resolve()
        console.log('logged out')
      })
      .catch(error => {
        reject(error)
        console.log(error)
      })
  })
}

const restoreUser = async (): Promise<User | null> => {
  return new Promise(resolve => {
    onAuthStateChanged(auth, user => {
      if (user) {
        firebaseUser.value = user
        resolve(user)
      } else {
        firebaseUser.value = null
        resolve(null)
      }
    })
  })
}

export default () => {
  // State for each composable

  return {
    login,
    logout,
    restoreUser,
    firebaseUser,
  }
}
