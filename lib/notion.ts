// ./lib/notion.ts
import { Client } from "@notionhq/client";

// 初始化 Notion Client，確保環境變數已在 Vercel 後台設定
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getLatestNews() {
  const databaseId = process.env.NOTION_NEWS_DB_ID;
  if (!databaseId) {
    console.warn("⚠️ 找不到 NOTION_NEWS_DB_ID 環境變數");
    return [];
  }

  try {
    // 解決 Type Error 的關鍵：使用明確的呼叫路徑
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "✅ 狀態",
        status: { // 如果您的欄位類型是「狀態(Status)」，請使用此語法
          equals: "已發佈",
        },
      },
      sorts: [{ property: "🗓️ 日期", direction: "descending" }],
    });
    
    return response.results;
  } catch (error) {
    console.error("❌ Notion API 請求失敗:", error);
    return [];
  }
}