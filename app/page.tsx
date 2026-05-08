"use client";

import Link from "next/link";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const lifeStages = [
  {
    title: "婚前預備",
    description: "進入關係前預備更好的自己",
    href: "/pre-marital",
    tags: ["# 單身成長", "# 戀愛交友", "# 婚前輔導"],
  },
  {
    title: "婚姻成長",
    description: "讓家成為愛與支持的避風港",
    href: "/marriage",
    tags: ["# 婚姻經營", "# 親密關係", "# 危機處理"],
  },
  {
    title: "親職陪伴",
    description: "陪伴您解決教養路上的挑戰",
    href: "/parenting",
    tags: ["# 分齡教養", "# 親子溝通", "# 情緒教育"],
  },
];

const slides = [
  {
    label: "最新消息",
    title: "2026 婚姻成長營：重新定義愛的深度",
    description: "給彼此一個週末，找回心靈連結的初衷。",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=2000",
    href: "/marriage",
  },
  {
    label: "活動預告",
    title: "數位時代的親子溝通：建立信任橋樑",
    description: "當螢幕成為隔閡，我們如何進行有溫度的對話？",
    image:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=2000",
    href: "/parenting",
  },
];

const aboutLinks = [
  { title: "異象使命", href: "/about" },
  { title: "師資團隊", href: "/about" },
  { title: "真愛月刊", href: "/resources" },
  { title: "代禱信", href: "/resources" },
];

export default function HomePage() {
  return (
    <div className="home-2026 bg-[#FCF8F5] text-[#3D2E1F]">
      <section className="mb-12">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="home-swiper h-[75vh] w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className="relative h-full w-full">
                <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
                <div className="absolute bottom-[10%] left-[5%] right-[5%] mx-auto max-w-[850px] rounded-[2.5rem] border border-white/20 bg-white/15 p-10 text-white backdrop-blur-xl">
                    <span className="mb-4 inline-block rounded-full bg-[#D1739C] px-4 py-1 text-sm font-black">
                    {slide.label}
                  </span>
                  <h2 className="mb-4 text-3xl font-black text-white md:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="mb-6 text-lg opacity-90">{slide.description}</p>
                  <Link
                    href={slide.href}
                    className="inline-flex rounded-full border-2 border-white px-8 py-2 font-black transition hover:bg-white hover:text-black"
                  >
                    查看詳情
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section id="stages" className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="mb-14 border-l-8 border-[#D1739C] pl-6 text-left">
          <h2 className="text-3xl font-black tracking-tight text-[#B5548A] md:text-5xl">
            探索您的生命階段
          </h2>
        </div>

        <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-12 md:overflow-x-visible md:px-0">
          {lifeStages.map((stage) => (
            <Link
              key={stage.href}
              href={stage.href}
              className="glass-card hover-purple flex w-[85%] shrink-0 snap-start flex-col items-center rounded-[3.5rem] p-10 text-center md:w-full md:p-14"
            >
              <h3 className="mb-4 text-3xl font-black text-[#B5548A]">{stage.title}</h3>
              <p className="mb-8 whitespace-nowrap text-lg font-bold text-slate-400">
                {stage.description}
              </p>
              <div className="mb-10 flex w-full flex-col gap-3">
                {stage.tags.map((tag) => (
                  <span key={tag} className="tag-pill rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="cta-link-wrapper stage-cta-link mt-auto">
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12 border-l-8 border-slate-200 pl-6 text-left">
          <h2 className="text-3xl font-black tracking-tight text-[#3D2E1F] md:text-5xl">
            選擇您需要的專業支持
          </h2>
        </div>

        <div className="mb-10 rounded-[3.5rem] border-2 border-[#D1739C] bg-white p-10 text-center shadow-xl md:p-20">
          <div className="mb-12">
            <h3 className="mb-8 text-4xl font-black italic text-[#B5548A] md:text-6xl">
              輔導協談
            </h3>
            <p className="text-2xl font-black leading-tight tracking-tight text-slate-400 md:text-4xl">
              解開關係中的難題
              <span className="mx-4 hidden opacity-20 md:inline">|</span>
              <span className="block md:inline">找回幸福的方向</span>
            </p>
          </div>

          <div className="mx-auto mb-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {["# 婚前輔導", "# 婚姻議題", "# 親子溝通", "# 個人協談"].map((tag) => (
              <span key={tag} className="tag-pill rounded-2xl py-4">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/counseling"
              className="btn-cta-main w-full max-w-lg rounded-full px-10 py-7 text-2xl font-black uppercase tracking-widest text-white shadow-2xl md:w-3/4 md:text-3xl"
            >
              立即預約諮詢
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          <div className="glass-card flex flex-col rounded-[3.5rem] p-10 md:p-14">
            <h4 className="mb-4 text-3xl font-black italic text-[#B5548A]">學習資源</h4>
            <p className="mb-8 text-xl font-bold text-slate-400">
              滿足您在不同情境下的學習需求
            </p>
            <div className="mb-12 space-y-6 text-left">
              <ResourceTags title="# 實體互動" tags={["課程", "講座", "讀書會"]} />
              <ResourceTags title="# 數位學習" tags={["Podcast", "影音資源", "線上研習"]} />
            </div>
            <Link href="/resources" className="cta-link-wrapper b-cta-link mt-auto w-fit">
              了解更多 <span>→</span>
            </Link>
          </div>

          <div className="glass-card flex flex-col rounded-[3.5rem] p-10 md:p-14">
            <h4 className="mb-4 text-3xl font-black italic text-[#B5548A]">策略夥伴</h4>
            <p className="mb-8 text-xl font-bold text-slate-400">
              從教會到職場的全方位專業賦能
            </p>
            <div className="mb-7 flex flex-wrap gap-3">
              {["# 婚姻導師培訓", "# 家庭事工建立"].map((tag) => (
                <span key={tag} className="tag-pill rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mb-7 flex flex-wrap gap-3">
              {["# 企業文化打造", "# 團體會員方案"].map((tag) => (
                <span key={tag} className="tag-pill rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/partnership" className="cta-link-wrapper b-cta-link mt-auto w-fit">
              了解更多 <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl space-y-12 px-6 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex h-full flex-col">
            <h3 className="mb-10 border-l-8 border-[#D1739C] pl-6 text-left text-2xl font-black text-[#3D2E1F] md:text-3xl">
              認識真愛
            </h3>
            <div className="grid flex-grow grid-cols-2 gap-4">
              {aboutLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="glass-card hover-purple flex items-center justify-center rounded-[2.5rem] p-8 text-center text-xl font-black text-slate-600 shadow-sm"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col">
            <h3 className="mb-10 border-l-8 border-slate-200 pl-6 text-left text-2xl font-black uppercase tracking-widest text-[#3D2E1F] md:text-3xl">
              支持我們
            </h3>
            <div className="flex-grow space-y-4">
              <SupportCard title="參與志工服務" body="投入時間才幹，共同守護家庭" />
              <SupportCard title="了解培訓計劃" body="專業人才養成，傳承真愛使命" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-12 rounded-[4.5rem] bg-[#4A3C32] p-12 text-white shadow-2xl md:flex-row md:p-20">
          <div className="text-center md:w-2/3 md:text-left">
            <p className="text-2xl font-black italic leading-tight text-pink-50 md:text-4xl">
              「您的每一分投入，
              <br className="hidden md:block" />
              都是守護家庭的重要動力。」
            </p>
          </div>
          <div className="w-full text-center md:w-1/3">
            <Link
              href="/support"
              className="block w-full rounded-full bg-[#B5548A] py-6 text-2xl font-black tracking-[0.2em] text-white shadow-lg transition hover:brightness-110 active:scale-95"
            >
              奉獻支持
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ResourceTags({ title, tags }: { title: string; tags: string[] }) {
  return (
    <div>
      <p className="mb-3 text-sm font-black uppercase tracking-widest text-[#8C7C6D]">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="tag-pill rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function SupportCard({ title, body }: { title: string; body: string }) {
  return (
    <Link
      href="/support"
      className="support-action-card glass-card block rounded-[2.5rem] p-8 text-left md:p-10"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <h4 className="shrink-0 text-xl font-black italic text-[#A64B7D]">{title}</h4>
        <p className="text-lg font-bold text-slate-600 opacity-80">{body}</p>
      </div>
    </Link>
  );
}
