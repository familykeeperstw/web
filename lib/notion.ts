// ./lib/notion.ts 修正代碼
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getLatestNews() {
  const databaseId = process.env.NOTION_NEWS_DB_ID;
  if (!databaseId) return [];

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "✅ 狀態",
        // 注意：若您的 Notion 欄位是「狀態」類型而非「選取」，語法如下
        status: {
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