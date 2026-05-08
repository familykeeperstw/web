import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug: true, // 🚀 啟動偵錯模式，錯誤會印在終端機
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("嘗試登入的使用者:", user.email);
      return true; // 如果這裡印不出來，代表根本沒連到 Google
    },
    async session({ session, token }) {
      console.log("目前 Session 內容:", session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };