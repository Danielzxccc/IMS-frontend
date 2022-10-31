import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyCX-CoHCHMaDFP-u6BNh5kkvyZ5_QlKCSU',
  authDomain: 'ims101.firebaseapp.com',
  projectId: 'ims101',
  storageBucket: 'ims101.appspot.com',
  messagingSenderId: '17961048201',
  appId: '1:17961048201:web:681639cfebfd476ccc8e58',
}
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
