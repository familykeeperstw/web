// lib/notion.ts
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const notionNewsDatabaseId = process.env.NOTION_NEWS_DB_ID || "";

export async function getLatestNews() {
  // 確保 database_id 存在，並使用正確的 query 語法
  if (!notionNewsDatabaseId) return [];

  const response = await notion.databases.query({
    database_id: notionNewsDatabaseId,
    filter: {
      property: "✅ 狀態",
      select: {
        equals: "已發佈", // 請確保 Notion 中的屬性與此一致
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
}