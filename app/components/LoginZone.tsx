"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginZone() {
  const { data: session, status } = useSession();

  // 偵錯用：可按 F12 查看 Console 確認資料
  console.log("Session Data:", session);

  if (status === "loading") {
    return <div className="h-10 w-24 bg-gray-100 rounded-full animate-pulse" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#A4C34A]/10 rounded-full border border-[#A4C34A]/20">
          {session.user.image ? (
            <img 
              src={session.user.image} 
              alt="Avatar" 
              className="w-6 h-6 rounded-full border border-white"
            />
          ) : (
            <div className="w-1.5 h-1.5 bg-[#A4C34A] rounded-full animate-pulse" />
          )}
          <span className="text-xs font-black tracking-widest text-[#2D3748] uppercase">
            HI, {session.user.name}
          </span>
        </div>
        <button 
          onClick={() => signOut()} 
          className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => signIn("google")}
      style={{ backgroundColor: '#A4C34A' }} 
      className="text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
    > 
      登入 
    </button>
  );
}