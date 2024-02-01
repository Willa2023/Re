//seed.js
const { db } = require("@vercel/postgres");
const { accounts, articles } = require("./placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedAccounts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "accounts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS accounts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL
      );
    `;

    console.log(`Created "accounts" table`);

    // Insert data into the "users" table
    const insertedAccounts = await Promise.all(
      accounts.map(async (account) => {
        const hashedPassword = await bcrypt.hash(account.password, 10);
        return client.sql`
        INSERT INTO accounts (id, username, password, email)
        VALUES (${account.id}, ${account.username}, ${hashedPassword}, ${account.email})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedAccounts.length} accounts`);

    return {
      createTable,
      accounts: insertedAccounts,
    };
  } catch (error) {
    console.error("Error seeding accounts:", error);
    throw error;
  }
}

async function seedArticles(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "accounts" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS articles (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        author VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        topic VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "articles" table`);

    // Insert data into the "users" table
    const insertedArticles = await Promise.all(
      articles.map(async (article) => {
        return client.sql`
        INSERT INTO articles (id, title, author, content, topic)
        VALUES (${article.id}, ${article.title}, ${article.author}, ${article.content}, ${article.topic})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedArticles.length} articles`);

    return {
      createTable,
      accounts: insertedArticles,
    };
  } catch (error) {
    console.error("Error seeding articles:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedAccounts(client);
  await seedArticles(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
