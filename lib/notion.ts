// ./lib/notion.ts 修正建議
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// 確保函式名稱為 getLatestNews，以符合 page.tsx 的導入
export async function getLatestNews() {
  const databaseId = process.env.NOTION_NEWS_DB_ID;
  if (!databaseId) return [];

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "✅ 狀態",
        status: { equals: "已發佈" },
      },
      sorts: [{ property: "🗓️ 日期", direction: "descending" }],
    });
    return response.results;
  } catch (error) {
    console.error("Notion API Error:", error);
    return [];
  }
}