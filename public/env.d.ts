declare namespace NodeJS {
  interface ProcessEnv {
    NOTION_TOKEN: string;
    NOTION_NEWS_DB_ID: string; // 這是您在 Vercel 設定的新名稱
  }
}