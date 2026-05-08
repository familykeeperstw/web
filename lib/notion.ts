// ./lib/notion.ts 修正建議
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getLatestNews() {
  const databaseId = process.env.NOTION_NEWS_DB_ID;
  if (!databaseId) {
    console.error("Missing NOTION_NEWS_DB_ID");
    return [];
  }

  // 加上 try-catch 確保 build 過程不會因 API 報錯而中斷
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "✅ 狀態",
        status: { // 若 Notion 欄位是「狀態」類型，請使用 status
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