// lib/notion.ts
import { Client } from "@notionhq/client";

// 這個檔案目前只處理「最新消息」Notion 資料庫
const notionToken = process.env.NOTION_TOKEN;
const notionNewsDatabaseId = process.env.NOTION_NEWS_DB_ID;

if (!notionToken) {
  throw new Error("Missing NOTION_TOKEN environment variable.");
}

if (!notionNewsDatabaseId) {
  throw new Error("Missing NOTION_NEWS_DB_ID environment variable.");
}

const notion = new Client({ auth: notionToken });

export async function getLatestNews() {
  const response = await notion.databases.query({
    database_id: notionNewsDatabaseId,
    filter: {
      property: "✅ 狀態",
      select: { equals: "已發布" },
    },
    sorts: [{ property: "🗓️ 發布日期", direction: "descending" }],
    page_size: 5,
  });

  return response.results;
}