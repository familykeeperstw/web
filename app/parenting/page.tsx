const parentingNeeds = [
  ["理解孩子", "依照孩子不同階段的發展需求，整理父母需要的知識與陪伴方式。"],
  ["親子溝通", "練習聽見彼此、表達需求，讓家裡的對話更有安全感。"],
  ["情緒與界線", "協助父母面對衝突、情緒與規範，建立穩定的教養節奏。"],
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

export default function ParentingPage() {
  return (
    <main className="home-2026 min-h-screen bg-[#FCF8F5] text-[#3D2E1F]">
      <section className="px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-[#D1739C]">
            For Parents and Caregivers
          </p>
          <h1 className="mb-6 text-5xl font-black text-[#B5548A]">親職陪伴</h1>
          <p className="max-w-3xl text-xl font-bold leading-relaxed text-[#4A3C32]/75">
            給正在陪伴孩子長大的父母與照顧者。這裡會整理親職教養、親子溝通、情緒教育與家庭支持相關資源。
          </p>
        </div>
      </section>

      <section className="px-8 py-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {parentingNeeds.map(([title, body]) => (
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
