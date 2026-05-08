import "./globals.css";
import { NextAuthProvider } from "./providers";
import SiteNav from "./components/SiteNav";

export const metadata = {
  title: '台灣真愛家庭協會 | Family Keepers Taiwan',
  description: '致力於透過專業輔導與資源，協助每一位家庭成員建立健康、充滿愛的連結。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-surface text-on-surface font-sans antialiased">
        <NextAuthProvider>
          <SiteNav />

          {/* 內容區塊 */}
          <main className="min-h-screen pt-20">
            {children}
          </main>

          {/* 頁尾區塊 */}
          <footer className="bg-white border-t border-primary/5 pt-20 pb-10 px-8 text-on-surface">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <img src="/FK_logo.jpg" alt="Family Keepers Taiwan" className="h-10" />
                  <p className="opacity-60 text-sm max-w-sm leading-relaxed font-medium">
                    社團法人台灣真愛家庭協會致力於透過專業輔導與資源，協助每一位家庭成員建立健康、充滿愛的連結。
                  </p>
                </div>
                
                <div className="flex flex-col gap-3 text-sm font-bold text-primary/80">
                  <h4 className="text-primary/30 text-xs uppercase tracking-widest mb-2 font-black">快速連結</h4>
                  <a href="/resources" className="hover:text-primary">課程資源</a>
                  <a href="/counseling" className="hover:text-primary">輔導預約</a>
                  <a href="/support" className="hover:text-primary">奉獻支持</a>
                </div>

                <div className="text-sm font-bold space-y-4">
                  <h4 className="text-primary/30 text-xs uppercase tracking-widest mb-2 font-black">聯絡我們</h4>
                  <p className="opacity-60 flex items-center gap-3">
                    <span className="material-symbols-outlined text-base">call</span> (02) 2701-1000
                  </p>
                  <p className="opacity-60 flex items-center gap-3">
                    <span className="material-symbols-outlined text-base">mail</span> service@familykeepers.org.tw
                  </p>
                </div>
              </div>
              
              <div className="border-t border-primary/5 pt-8 text-center text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">
                © 2026 Family Keepers Taiwan. All rights reserved.
              </div>
            </div>
          </footer>

        </NextAuthProvider>
      </body>
    </html>
  );
}
