import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getLatestNews() {
  const databaseId = process.env.NOTION_NEWS_DB_ID;
  if (!databaseId) return [];

  // 確保使用正確的 query 方法
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "✅ 狀態",
      select: { // 假設您的狀態是 select 類型
        equals: "已發佈",
      },
    },
  });
  return response.results;
}