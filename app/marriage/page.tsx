const focusAreas = [
  ["日常經營", "溝通、親密、分工、財務與生活節奏，讓關係有穩定成長的空間。"],
  ["關係修復", "當衝突、冷淡或危機出現時，陪伴夫妻重新理解彼此並找回方向。"],
  ["家庭支持", "從夫妻關係延伸到原生家庭、教養與家庭系統中的互動。"],
];

const resourceTypes = [
  "課程(實體)",
  "課程(線上)",
  "課程(錄影)",
  "讀書會(實體)",
  "讀書會(線上)",
  "讀書會(錄影)",
  "講座(實體)",
  "講座(線上)",
  "講座(錄影)",
  "Podcast",
  "真愛TV",
  "協談輔導",
];

export default function MarriagePage() {
  return (
    <main className="home-2026 min-h-screen bg-[#FCF8F5] text-[#3D2E1F]">
      <section className="px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-[#D1739C]">
            For Couples and Families
          </p>
          <h1 className="mb-6 text-5xl font-black text-[#B5548A]">婚姻成長</h1>
          <p className="max-w-3xl text-xl font-bold leading-relaxed text-[#4A3C32]/75">
            給想經營婚姻、修復關係，或在家庭生活中尋找支持的夫妻。這裡會把婚姻相關商品與內容集中整理。
          </p>
        </div>
      </section>

      <section className="px-8 py-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {focusAreas.map(([title, body]) => (
            <article key={title} className="glass-card rounded-[2.5rem] p-8">
              <h2 className="mb-4 text-2xl font-black text-[#B5548A]">{title}</h2>
              <p className="font-bold leading-relaxed text-slate-500">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-8 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 border-l-8 border-[#D1739C] pl-6 text-3xl font-black text-[#B5548A]">
            適合放入的資源類型
          </h2>
          <div className="flex flex-wrap gap-3">
            {resourceTypes.map((type) => (
              <span key={type} className="tag-pill rounded-full">
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
