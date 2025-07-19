const fs = require('fs');

const dbPath = './db.json';

function readDB() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data) || {};
  } catch {
    return {};
  }
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function getGuildData(guildId) {
  const db = readDB();
  if (!db[guildId]) db[guildId] = {};
  return db[guildId];
}

function setGuildData(guildId, newData) {
  const db = readDB();
  db[guildId] = {
    ...db[guildId],
    ...newData
  };
  writeDB(db);
}

module.exports = {
  getGuildData,
  setGuildData
};
