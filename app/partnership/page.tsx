export default function PartnershipPage() {
  const b2bItems = [
    { t: "活力婚姻夫妻營", d: "為會友舉辦婚姻成長活動，完整課程設計" },
    { t: "婚姻導友培訓", d: "培訓同工成為導友，建立婚姻關顧團隊" },
    { t: "講師邀約", d: "主日、特會、退修會家庭主題講師" },
    { t: "事工培訓", d: "系統性發展家庭事工（詳情待確認）" },
  ];
  return (
    <main className="bg-surface min-h-screen py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif font-black text-primary mb-16">策略夥伴</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {b2bItems.map(item => (
            <div key={item.t} className="bg-surface-high p-10 rounded-round-16 hover:-translate-y-2 transition-all">
              <h3 className="text-2xl font-bold text-primary mb-4">{item.t}</h3>
              <p className="opacity-70 mb-8">{item.d}</p>
              <a href="mailto:service@example.com" className="font-black text-primary underline underline-offset-4">聯繫我們</a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
