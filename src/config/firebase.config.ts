import { initializeApp } from "firebase/app"
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCTBSld9FLRk-Dit1ShJpOFyVvHTwNfHLw",
  authDomain: "collecticus-dbb8a.firebaseapp.com",
  projectId: "collecticus-dbb8a",
  storageBucket: "collecticus-dbb8a.appspot.com",
  messagingSenderId: "368684502594",
  appId: "1:368684502594:web:fab466fb38c2a5a1fee7db"
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)