import { Client } from "@notionhq/client";

// 確保 notion 客戶端被正確初始化
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getLatestNews() {
  const databaseId = process.env.NOTION_NEWS_DB_ID;
  if (!databaseId) {
    console.error("Missing NOTION_NEWS_DB_ID");
    return [];
  }

  try {
    // 使用 (notion.databases as any).query 強制通過 TypeScript 檢查
    // 這是針對 SDK 類型不匹配最直接的解決方案
    const response = await (notion.databases as any).query({
      database_id: databaseId,
      filter: {
        property: "✅ 狀態",
        status: {
          equals: "已發佈",
        },
      },
      sorts: [
        {
          property: "🗓️ 日期",
          direction: "descending",
        },
      ],
    });

    return response.results;
  } catch (error) {
    console.error("Notion API Error:", error);
    return [];
  }
}