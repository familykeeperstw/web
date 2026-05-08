// ./lib/notion.ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getNotionData() {
  const databaseId = process.env.NOTION_NEWS_DB_ID;
  if (!databaseId) return [];

  try {
    // 顯式指定類型或確保 Client 初始化正確
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "✅ 狀態",
        status: { // 注意：若 Notion 欄位類型是「狀態」，請使用 status 而非 select
          equals: "已發佈",
        },
      },
    });
    return response.results;
  } catch (error) {
    console.error("Notion API Error:", error);
    return [];
  }
}