// lib/notion.ts 修正建議
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getLatestNews() {
  const databaseId = process.env.NOTION_NEWS_DB_ID;
  if (!databaseId) return [];

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "✅ 狀態",
      select: { equals: "已發佈" }, // 需檢查 Notion 欄位類型是 select 或 status
    },
    sorts: [{ property: "🗓️ 日期", direction: "descending" }],
  });
  return response.results;
}