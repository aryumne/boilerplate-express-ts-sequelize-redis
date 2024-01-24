import Database from "./src/configs/database.config";

const db = new Database();
// use { force: true } to drop all existing table and recreate all tables.
// use { alter: true } to sync new tables or new fields on existing tables.
db.initDb?.sync({ force: true });
