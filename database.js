const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const entryCollection = db.collection('entry');

// automatically test the connection
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
  console.log("success")
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    entries: {},
  };
  await userCollection.insertOne(user);

  return user;
}

function addEntry(entry) {
  entryCollection.insertOne(entry);
}

function getEntries(email) {
  const user = getUser(email);
  if (!user || !user.entries) {
    return [];
  }
  const entries = Object.values(user.entries);
  return entryValues;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addEntry,
  getEntries,
};