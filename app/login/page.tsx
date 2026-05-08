"use client";
import { useState } from 'react';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      alert("登入失敗，請檢查帳號密碼");
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">會員登入</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" placeholder="Email" className="w-full p-3 border rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="密碼" className="w-full p-3 border rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">登入</button>
        </form>
        <div className="mt-4 border-t pt-4">
          <button onClick={loginWithGoogle} className="w-full bg-white border border-gray-300 py-3 rounded-xl font-bold flex items-center justify-center">
            使用 Google 登入
          </button>
        </div>
      </div>
    </div>
  );
}