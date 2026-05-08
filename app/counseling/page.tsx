const counselingTopics = ["個人協談", "婚前輔導", "婚姻議題", "親子溝通", "家庭關係"];

export default function CounselingPage() {
  return (
    <main className="home-2026 min-h-screen bg-[#FCF8F5] px-8 py-20 text-[#3D2E1F]">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-[#D1739C]">
          Counseling Intake
        </p>
        <h1 className="mb-6 text-5xl font-black text-[#B5548A]">輔導協談</h1>
        <p className="mb-12 max-w-3xl text-xl font-bold leading-relaxed text-[#4A3C32]/75">
          這一頁會作為協談前的資料填寫入口，協助同工先了解來談者的狀態、期待與可聯絡方式。正式欄位內容可以再一起整理。
        </p>

        <section className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <aside className="glass-card rounded-[2.5rem] p-8">
            <h2 className="mb-5 text-2xl font-black text-[#B5548A]">可先分類的需求</h2>
            <div className="flex flex-wrap gap-3">
              {counselingTopics.map((topic) => (
                <span key={topic} className="tag-pill rounded-full">
                  {topic}
                </span>
              ))}
            </div>
          </aside>

          <form className="glass-card rounded-[2.5rem] p-8">
            <h2 className="mb-8 text-2xl font-black text-[#B5548A]">資料填寫架構</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-black text-[#B5548A]/80">
                姓名
                <input className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 font-bold text-[#3D2E1F] outline-none focus:border-[#D1739C]" placeholder="請填寫姓名" />
              </label>
              <label className="flex flex-col gap-2 text-sm font-black text-[#B5548A]/80">
                聯絡電話
                <input className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 font-bold text-[#3D2E1F] outline-none focus:border-[#D1739C]" placeholder="請填寫電話" />
              </label>
              <label className="flex flex-col gap-2 text-sm font-black text-[#B5548A]/80">
                Email
                <input className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 font-bold text-[#3D2E1F] outline-none focus:border-[#D1739C]" placeholder="name@example.com" />
              </label>
              <label className="flex flex-col gap-2 text-sm font-black text-[#B5548A]/80">
                想談的主題
                <select className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 font-bold text-[#3D2E1F] outline-none focus:border-[#D1739C]">
                  <option>請選擇</option>
                  {counselingTopics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-black text-[#B5548A]/80 md:col-span-2">
                簡述目前狀況
                <textarea className="min-h-36 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 font-bold text-[#3D2E1F] outline-none focus:border-[#D1739C]" placeholder="可以先簡單描述想尋求協助的原因" />
              </label>
            </div>
            <button type="button" className="btn-cta-main mt-8 rounded-full px-10 py-4 font-black text-white">
              送出資料
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
