//data.js
const { sql } = require("@vercel/postgres");

export async function fetchArticleByTopic(topic) {
  try {
    const data = await sql`
      SELECT *
      FROM articles
      WHERE topic = ${topic};
    `;
    console.log("Article Data fetch.");
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch article.");
  }
}
