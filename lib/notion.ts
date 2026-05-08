// ./lib/notion.ts 修正建議
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getLatestNews() {
  const databaseId = process.env.NOTION_NEWS_DB_ID;
  if (!databaseId) return [];

  try {
    // 確保這裡的呼叫符合 @notionhq/client 的最新 API
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "✅ 狀態",
        status: { // 注意：若 Notion 欄位是「狀態」類型，請使用 status 而非 select
          equals: "已發佈",
        },
      },
      sorts: [{ property: "🗓️ 日期", direction: "descending" }],
    });
    return response.results;
  } catch (error) {
    console.error("Notion API Error:", error);
    return [];
  }
}