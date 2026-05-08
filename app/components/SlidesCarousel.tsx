"use client";

import Link from "next/link";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface Slide {
  label: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

interface SlidesCarouselProps {
  slides: Slide[];
}

export default function SlidesCarousel({ slides }: SlidesCarouselProps) {
  return (
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
  );
}
