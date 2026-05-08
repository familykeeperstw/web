// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCabgAn6KpC7R_wo5PWLSdVSc_j-uEdTG8",
  authDomain: "familykeeperstw-5993a.firebaseapp.com",
  projectId: "familykeeperstw-5993a",
  storageBucket: "familykeeperstw-5993a.firebasestorage.app",
  messagingSenderId: "1005684904319",
  appId: "1:1005684904319:web:256a918444ad3a12364a4a"
};

// 防止 Next.js 在開發模式下重複初始化
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);