// lib/notion.ts
import { Client } from "@notionhq/client";

// 初始化 Notion 客戶端
const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getLatestNews() {
  const databaseId = process.env.NOTION_NEWS_DB_ID; // 建議確認 Vercel 上的 Key 名稱
  
  if (!databaseId) {
    console.error("錯誤：找不到 NOTION_NEWS_DB_ID 環境變數");
    return [];
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "✅ 狀態", // 確保這與您 Notion 欄位名稱一致
      select: { equals: "已發布" },
    },
    sorts: [{ property: "🗓️ 發布日期", direction: "descending" }],
  });

  return response.results;
}