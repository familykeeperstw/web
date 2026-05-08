"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: '婚前預備', href: '/pre-marital' },
    { name: '婚姻成長', href: '/marriage' },
    { name: '親職教養', href: '/parenting' },
    { name: '學習資源', href: '/resources' },
    { name: '協談輔導', href: '/counseling' },
    { name: '團體合作', href: '/partnership' },
    { name: '關於我們', href: '/about' },
    { name: '支持我們', href: '/support' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 px-6">
      <div className="max-w-7xl mx-auto h-20 flex justify-between items-center">
        
        {/* Logo 區域 */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image 
              src="/FK_logo.jpg" 
              alt="Logo" 
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-serif font-black text-primary tracking-tight">
            真愛家庭協會
          </span>
        </Link>
        
        {/* 8 個導航項目 */}
        <div className="hidden xl:flex items-center gap-6">
          {navItems.map(item => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`text-sm font-bold transition-colors hover:text-[#A4C34A] ${
                pathname === item.href ? "text-[#A4C34A]" : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* 恢復原始草綠色按鈕 */}
        <Link 
          href="/login"
          style={{ backgroundColor: '#A4C34A' }}
          className="text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-md hover:scale-105 transition-all"
        >
          登入
        </Link>
      </div>
    </nav>
  );
}