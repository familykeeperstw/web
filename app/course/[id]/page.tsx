import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `課程詳情 - 台灣真愛家庭協會`,
    description: '專業家庭教育課程與協談輔導服務',
  };
}

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <main className="bg-[#F9F2F4] min-h-screen pb-24 font-sans">
      <section className="bg-white py-20 px-8 border-b border-[#E8668E]/5">
        <div className="max-w-4xl mx-auto text-left">
          {/* 承襲 html 0412 的內容 */}
        </div>
      </section>
    </main>
  );
}
