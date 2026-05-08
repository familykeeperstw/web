"use client";

import { Suspense, useMemo, useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filters = {
  audience: [
    { value: "preparing", label: "預備幸福" },
    { value: "marriage", label: "婚姻成長" },
    { value: "parenting", label: "親職陪伴" },
    { value: "volunteer", label: "志工培訓" },
    { value: "partner", label: "策略夥伴" },
  ],
  issue: [
    { value: "single-dating", label: "單身交友" },
    { value: "self-growth", label: "自我成長" },
    { value: "marriage-care", label: "婚姻經營" },
    { value: "parenting-care", label: "親職教養" },
    { value: "helping-skills", label: "助人技巧" },
  ],
  type: [
    { value: "podcast", label: "Podcast" },
    { value: "tv", label: "真愛TV" },
    { value: "talk", label: "講座" },
    { value: "book-club", label: "讀書會" },
    { value: "course", label: "課程" },
  ],
  format: [
    { value: "physical", label: "實體" },
    { value: "online", label: "線上" },
    { value: "recorded", label: "錄影" },
  ],
};

type FilterKey = keyof typeof filters;

const filterLabels: Record<FilterKey, string> = {
  audience: "族群",
  issue: "議題",
  type: "類型",
  format: "形式",
};

const filterIcons: Record<FilterKey, string> = {
  audience: "groups",
  issue: "label",
  type: "play_circle",
  format: "devices",
};

type ResourceItem = {
  id: string;
  title: string;
  description: string;
  audiences: string[];
  issueTags: string[];
  type: string;
  format: string;
  status: "available" | "draft";
  priority: number;
};

const resources: ResourceItem[] = [
  {
    id: "preparing-course-001",
    title: "單身交友戀愛方程式",
    description: "給正在學習認識自己與健康交往的人，整理關係中的期待、界線與互動方式。",
    audiences: ["preparing"],
    issueTags: ["single-dating", "self-growth"],
    type: "course",
    format: "online",
    status: "available",
    priority: 1,
  },
  {
    id: "preparing-book-001",
    title: "為約會立界線讀書會",
    description: "透過小群體閱讀與討論，練習在關係中辨識自己的需要與界線。",
    audiences: ["preparing"],
    issueTags: ["single-dating"],
    type: "book-club",
    format: "physical",
    status: "available",
    priority: 2,
  },
  {
    id: "marriage-course-001",
    title: "親密之旅",
    description: "陪伴夫妻練習表達、聆聽與修復，讓婚姻關係重新有連結與安全感。",
    audiences: ["marriage"],
    issueTags: ["marriage-care"],
    type: "course",
    format: "physical",
    status: "available",
    priority: 1,
  },
  {
    id: "parenting-talk-001",
    title: "數位時代的親子溝通",
    description: "面對手機、社群與螢幕使用，父母如何建立信任並保有溫度的對話。",
    audiences: ["parenting"],
    issueTags: ["parenting-care"],
    type: "talk",
    format: "online",
    status: "available",
    priority: 1,
  },
  {
    id: "volunteer-course-001",
    title: "陪伴者基礎訓練",
    description: "給想投入家庭事工與陪伴服務的人，建立助人界線與基礎回應能力。",
    audiences: ["volunteer", "partner"],
    issueTags: ["helping-skills"],
    type: "course",
    format: "recorded",
    status: "draft",
    priority: 3,
  },
  {
    id: "family-podcast-001",
    title: "關係日常 Podcast",
    description: "用短音頻談關係、家庭與自我整理，適合還在探索階段的使用者。",
    audiences: ["preparing", "marriage", "parenting"],
    issueTags: ["self-growth", "marriage-care", "parenting-care"],
    type: "podcast",
    format: "online",
    status: "available",
    priority: 4,
  },
];

export default function ResourcesPage() {
  return (
    <Suspense fallback={<ResourcesShell />}>
      <ResourcesContent />
    </Suspense>
  );
}

function ResourcesContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected = {
    audience: getParam(searchParams, "audience"),
    issue: getParam(searchParams, "issue"),
    type: getParam(searchParams, "type"),
    format: getParam(searchParams, "format"),
  };

  const filteredResources = useMemo(() => {
    return resources
      .filter((item) => {
        const audienceMatch = selected.audience === "all" || item.audiences.includes(selected.audience);
        const issueMatch = selected.issue === "all" || item.issueTags.includes(selected.issue);
        const typeMatch = selected.type === "all" || item.type === selected.type;
        const formatMatch = selected.format === "all" || item.format === selected.format;
        return audienceMatch && issueMatch && typeMatch && formatMatch;
      })
      .sort((a, b) => a.priority - b.priority);
  }, [selected.audience, selected.format, selected.issue, selected.type]);

  const activeFilters = (Object.keys(selected) as FilterKey[])
    .filter((key) => selected[key] !== "all")
    .map((key) => ({
      key,
      value: selected[key],
      label: getLabel(key, selected[key]),
    }));

  function updateFilter(key: FilterKey, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clearFilters() {
    router.replace(pathname, { scroll: false });
  }

  const [filterOpen, setFilterOpen] = useState(false);
  const filterBodyRef = useRef<HTMLDivElement>(null);
  const [filterHeight, setFilterHeight] = useState(0);

  useEffect(() => {
    if (filterBodyRef.current) {
      setFilterHeight(filterBodyRef.current.scrollHeight);
    }
  }, [filterOpen, selected.issue, selected.type, selected.format]);

  return (
    <main className="home-2026 resources-refresh min-h-screen bg-[var(--fk-bg)] pb-24 text-[var(--fk-text)]">
      <section className="px-6 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-slate-400">
              Resource Finder
            </p>
            <h1 className="mb-5 text-5xl font-black leading-tight text-[var(--fk-primary-deep)] md:text-7xl">
              學習資源
            </h1>
            <p className="max-w-3xl text-xl font-bold leading-relaxed text-[var(--fk-text)] md:text-2xl">
              找到適合你現在階段的課程、講座、讀書會與影音內容。先從族群或議題開始，也可以直接瀏覽全部資源。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-8 border-b border-[#E8DCD6] pb-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-black text-[var(--fk-primary-deep)] md:text-2xl">族群分類</h2>
            <span className="shrink-0 text-sm font-black text-[var(--fk-text-hover)]">
              {filteredResources.length} 項結果
            </span>
          </div>
          <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0">
            <CategoryButton label="全部資源" count={resources.length} active={selected.audience === "all"} onClick={() => updateFilter("audience", "all")} />
            {filters.audience.map((option) => (
              <CategoryButton
                key={option.value}
                label={option.label}
                count={countBy("audience", option.value)}
                active={selected.audience === option.value}
                onClick={() => updateFilter("audience", option.value)}
              />
            ))}
          </div>
        </div>

        {/* -- 篩選面板：手機可收合，桌面常駐展開 -- */}
        <div className="filter-panel mb-8 rounded-[2rem] p-5 md:p-6">
          {/* 手機版 toggle 按鈕列 */}
          <div className="flex items-center justify-between gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setFilterOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--fk-primary-deep)]/20 bg-white px-4 py-2.5 text-sm font-black text-[var(--fk-primary-deep)] shadow-sm transition active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              篩選條件
              {activeFilters.length > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--fk-primary-deep)] px-1.5 text-[11px] font-black text-white">
                  {activeFilters.length}
                </span>
              )}
              <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${filterOpen ? "rotate-180" : ""}`}>
                expand_more
              </span>
            </button>
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-bold text-[var(--fk-text-hover)] underline decoration-dotted underline-offset-4 transition hover:text-[var(--fk-primary-deep)]"
              >
                清除全部
              </button>
            )}
          </div>

          {/* 手機版：收合狀態下的已選 chip 預覽 */}
          {!filterOpen && activeFilters.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 md:hidden">
              {activeFilters.map((filter) => (
                <button
                  key={`mobile-${filter.key}-${filter.value}`}
                  type="button"
                  onClick={() => updateFilter(filter.key, "all")}
                  className="active-chip group/chip inline-flex items-center gap-1 rounded-full py-1 pl-2.5 pr-1.5 text-xs font-bold transition"
                >
                  <span className="opacity-60">{filterLabels[filter.key]}</span>
                  <span className="font-black">{filter.label}</span>
                  <span className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* 篩選器本體：手機版用 max-height 動畫收合，桌面版始終展開 */}
          <div
            ref={filterBodyRef}
            className="filter-body overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] md:!max-h-none md:!opacity-100"
            style={{
              maxHeight: filterOpen ? `${filterHeight}px` : "0px",
              opacity: filterOpen ? 1 : 0,
            }}
          >
            <div className="pt-4 md:pt-0">
              <div className="grid gap-4 lg:grid-cols-3">
                <FilterGroup filterKey="issue" options={filters.issue} value={selected.issue} onChange={updateFilter} />
                <FilterGroup filterKey="type" options={filters.type} value={selected.type} onChange={updateFilter} />
                <FilterGroup filterKey="format" options={filters.format} value={selected.format} onChange={updateFilter} />
              </div>

              {/* 桌面版的已選標籤列 */}
              <div className="mt-5 hidden flex-col gap-3 border-t border-white/70 pt-5 md:flex md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {activeFilters.length > 0 ? (
                    <>
                      <span className="mr-1 text-xs font-bold tracking-wide text-[var(--fk-text-hover)]">已選擇</span>
                      {activeFilters.map((filter) => (
                        <button
                          key={`${filter.key}-${filter.value}`}
                          type="button"
                          onClick={() => updateFilter(filter.key, "all")}
                          className="active-chip group/chip inline-flex items-center gap-1.5 rounded-full py-1.5 pl-3 pr-2 text-sm font-bold transition hover:shadow-md"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{filterLabels[filter.key]}</span>
                          <span className="font-black">{filter.label}</span>
                          <span className="ml-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[12px] leading-none transition group-hover/chip:bg-white/40">
                            <span className="material-symbols-outlined text-[14px]">close</span>
                          </span>
                        </button>
                      ))}
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--fk-text-hover)]">
                      <span className="material-symbols-outlined text-[16px]">filter_list_off</span>
                      目前顯示全部分類
                    </span>
                  )}
                </div>
                {activeFilters.length > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--fk-primary-deep)]/15 bg-white px-4 py-2 text-sm font-black text-[var(--fk-primary-deep)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    清除全部
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="border-l-8 border-[#64748B] pl-6">
            <h2 className="text-3xl font-black text-[var(--fk-primary-deep)] md:text-5xl">
              推薦內容
            </h2>
            <p className="mt-2 text-lg font-bold text-[var(--fk-text-hover)]">
              依照目前條件排序，之後會接上正式資料庫。
            </p>
          </div>
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredResources.map((item) => (
              <ResourceCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-[3.5rem] px-8 py-16 text-center text-xl font-black text-[var(--fk-primary-deep)]/40">
            目前這組條件尚無內容。
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
        <div className="rounded-[4rem] bg-[var(--fk-soft-brown)] p-10 text-white shadow-2xl md:p-16">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-white/55">
            Coming Next
          </p>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <h2 className="text-3xl font-black leading-tight text-pink-50 md:text-5xl">
              接上資料後，這裡會成為所有內容的入口。
            </h2>
            <p className="text-lg font-bold leading-relaxed text-white/75">
              婚前預備、婚姻成長、親職陪伴等頁面都可以帶著條件進來，使用者看到的是同一套資源庫中最適合自己的內容。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ResourcesShell() {
  return <main className="home-2026 min-h-screen bg-[var(--fk-bg)]" />;
}

function FilterGroup({
  filterKey,
  options,
  value,
  onChange,
}: {
  filterKey: FilterKey;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (key: FilterKey, value: string) => void;
}) {
  const icon = filterIcons[filterKey];
  const title = filterLabels[filterKey];
  const allOptions = [{ value: "all", label: "全部" }, ...options];

  return (
    <div className="filter-group rounded-2xl bg-white/50 p-4 backdrop-blur-sm">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-black tracking-wide text-[var(--fk-primary-deep)]">
        <span className="material-symbols-outlined text-[18px] opacity-60">{icon}</span>
        {title}
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {allOptions.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(filterKey, option.value)}
              className={`filter-tag rounded-full px-3.5 py-1.5 text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "bg-[var(--fk-primary-deep)] text-white shadow-[0_2px_8px_rgba(181,84,138,0.25)]"
                  : "bg-white/80 text-[var(--fk-text-hover)] ring-1 ring-inset ring-[#e8dcd6] hover:bg-white hover:text-[var(--fk-primary-deep)] hover:ring-[var(--fk-primary)]/40"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CategoryButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-3 rounded-full border px-5 py-3 text-sm font-black transition md:text-base ${
        active
          ? "border-[var(--fk-primary-deep)] bg-[var(--fk-primary-deep)] text-white shadow-[0_12px_24px_rgba(143,63,112,0.14)]"
          : "border-[#EADFDA] bg-white text-[var(--fk-text)] hover:border-[var(--fk-primary)] hover:text-[var(--fk-primary-deep)]"
      }`}
    >
      <span>{label}</span>
      <span className={`rounded-full px-2.5 py-0.5 text-xs ${active ? "bg-white/15 text-white" : "bg-slate-100 text-[var(--fk-support)]"}`}>
        {count}
      </span>
    </button>
  );
}

function ResourceCard({ item }: { item: ResourceItem }) {
  return (
    <article className="glass-card group flex min-h-[300px] flex-col overflow-hidden rounded-[2.5rem] p-0 transition hover:-translate-y-1 hover:bg-white">
      <div className="h-2 bg-gradient-to-r from-[var(--fk-support)] via-[var(--fk-primary)] to-[var(--fk-primary-deep)]" />
      <div className="flex flex-1 flex-col p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="rounded-full bg-[var(--fk-primary)] px-4 py-1.5 text-xs font-black text-white">
          {getLabel("type", item.type)}
        </span>
        <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--fk-text-hover)]">
          {item.status === "draft" ? "整理中" : "可上架"}
        </span>
      </div>
      <h3 className="mb-4 text-2xl font-black text-[var(--fk-primary-deep)]">{item.title}</h3>
      <p className="mb-6 font-bold leading-relaxed text-slate-400">{item.description}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {item.audiences.map((audience) => (
          <span key={audience} className="tag-pill rounded-full text-sm">
            {getLabel("audience", audience)}
          </span>
        ))}
        {item.issueTags.map((issue) => (
          <span key={issue} className="tag-pill rounded-full text-sm">
            {getLabel("issue", issue)}
          </span>
        ))}
        <span className="tag-pill rounded-full text-sm">{getLabel("format", item.format)}</span>
      </div>
      <div className="mt-7 flex items-center justify-between border-t border-[var(--fk-primary)]/10 pt-5">
        <span className="text-sm font-black text-[var(--fk-primary-deep)]/45">#{item.id}</span>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-black text-[var(--fk-text-hover)] transition group-hover:text-[var(--fk-primary-deep)]"
        >
          查看內容
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
      </div>
    </article>
  );
}

function getParam(searchParams: URLSearchParams, key: FilterKey) {
  const value = searchParams.get(key);
  const isValid = filters[key].some((option) => option.value === value);
  return isValid && value ? value : "all";
}

function getLabel(key: FilterKey, value: string) {
  return filters[key].find((option) => option.value === value)?.label ?? value;
}

function countBy(key: FilterKey, value: string) {
  return resources.filter((item) => {
    if (key === "audience") return item.audiences.includes(value);
    if (key === "issue") return item.issueTags.includes(value);
    return item[key] === value;
  }).length;
}
