"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  content: string;
  price: string;
  imageurl: string;
  dateinfo: string;
  location: string;
  cta_link: string;
  cta_text: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // 請確保這是你最新的部署網址
  const GAS_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnQEWNjG_joHt_JPKmEHBro-V176ALY4a0itE8FCAwlCbExczVydj95293pUOWUeiMpRVNjKmlRiXhQcrjqvvTv0ffzbf9230JmxA45tb6kCXG7s3lDY-Vt2eigV_fzI_FLqz_JKBPk_tNpk2ZW7zYYcS70E2v7fIzD1AjM3StPYHzvmM0u3eog2YzS9eB8FLBT1FmrDokZdh-B963JctkaBAz9IcYi6wvWfbZMuF3yvGXTZBb-Y8o4Zx1nizyEYObu3ql7IzYflr61o2i5_kYUSwJ67PxhJlfR1mF-DyEj-vfoh6mI&lib=Mp05ygjjS-fAEOQ_bgXydRY4KLeFAllLe";

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await fetch(`${GAS_URL}?action=getCourses`);
        const data = await response.json();
        if (Array.isArray(data)) {
          // 尋找對應 ID 的課程
          const found = data.find((item: any) => String(item.id).trim() === String(params.id).trim());
          setCourse(found || null);
        }
      } catch (error) {
        console.error("抓取失敗:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchCourseDetail();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
  );

  if (!course) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-8 text-center">
      <h1 className="text-2xl font-serif mb-4 text-primary">內容靜待開啟</h1>
      <Link href="/resources" className="text-primary/60 underline font-bold">返回資源列表</Link>
    </div>
  );

return (
    <Head>
      <title>{course?.title ? `${course.title} - 課程詳情` : "課程詳情"}</title>
      <meta name="description" content={course?.description || "深入了解精彩課程，註冊參與更多！"} />
      <meta property="og:title" content={course?.title || "課程詳情"} />
      <meta property="og:description" content={course?.description || "深入了解精彩課程內容"} />
      <meta property="og:image" content={course?.imageurl || "/default-image.jpg"} />
      <meta property="og:url" content={course ? `https://yourwebsite.com/course/${course.id}` : "https://yourwebsite.com/course/"} />
      <meta name="robots" content="index, follow" />
    </Head>
    <main className="bg-surface min-h-screen pb-24 font-sans">
      {/* 頂部 Hero 區域 */}
      <section className="bg-white py-20 px-8 border-b border-primary/5">
        <div className="max-w-4xl mx-auto text-left">
          <Link href="/resources" className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] mb-12 block hover:text-primary transition-all">
            ← Back to Resources
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-secondary-container text-primary px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
              {course.location}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-primary mb-8 leading-[1.1] tracking-tight">
            {course.title}
          </h1>
          <p className="text-xl text-on-surface/60 font-serif italic leading-relaxed max-w-2xl">
            「{course.description}」
          </p>
        </div>
      </section>

      {/* 內容區域 */}
      <section className="max-w-7xl mx-auto px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* 左側：主文內容 (Markdown) */}
        <div className="lg:col-span-2 space-y-12">
          <div className="aspect-[16/9] bg-surface-dim rounded-[32px] overflow-hidden shadow-xl">
            <img 
              src={course.imageurl} 
              alt={course.title} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <article className="bg-white p-10 md:p-16 rounded-[32px] border border-primary/5">
            <div className="prose prose-lg max-w-none prose-serif text-on-surface/80 leading-[2]">
              <ReactMarkdown
                components={{
                  h2: ({...props}) => <h2 className="text-3xl font-black text-primary mt-12 mb-6" {...props} />,
                  p: ({...props}) => <p className="mb-6 whitespace-pre-wrap" {...props} />,
                  ul: ({...props}) => <ul className="list-disc pl-6 space-y-4 mb-8" {...props} />,
                  strong: ({...props}) => <strong className="font-black text-primary underline decoration-secondary-container decoration-4 underline-offset-4" {...props} />,
                  blockquote: ({...props}) => <blockquote className="border-l-4 border-secondary-container pl-6 italic my-8 text-on-surface/60" {...props} />,
                }}
              >
                {course.content || "正在準備介紹內容..."}
              </ReactMarkdown>
            </div>
          </article>
        </div>

        {/* 右側：桌面版報名卡片 */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 bg-primary text-white p-10 rounded-[40px] shadow-2xl">
            <h2 className="text-4xl font-serif font-black mb-10">NT$ {course.price}</h2>
            <div className="space-y-8 mb-12 border-t border-white/10 pt-8">
              <div className="flex items-start gap-5">
                <span className="material-symbols-outlined opacity-50">calendar_today</span>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-40 mb-1 tracking-widest">Time</p>
                  <p className="font-bold">{course.dateinfo}</p>
                </div>
              </div>
            </div>
            <a 
              href={course.cta_link} 
              target="_blank"
              className="block w-full bg-white text-primary text-center py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-secondary-container transition-all shadow-xl"
            >
              {course.cta_text || "立即參加"}
            </a>
          </div>
        </div>
      </section>

      {/* 🚀 手機版底部懸浮條 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-primary/5 p-5 z-50 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div>
          <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest block">Investment</span>
          <span className="text-2xl font-serif font-black text-primary">NT$ {course.price}</span>
        </div>
        <a 
          href={course.cta_link} 
          className="bg-primary text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl"
        >
          {course.cta_text || "立即參加"}
        </a>
      </div>
    </main>
  );
}