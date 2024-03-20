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
  };
  await userCollection.insertOne(user);

  return user;
}

function addEntry(entry) {
  entryCollection.insertOne(entry);
}

function getEntries() {
  const query = { salary: { $exists: true } }; // finds all entries with a salary property
  const options = {
    sort: { entry: -1 },
    limit: 10,
  };
  const cursor = entryCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addEntry,
  getEntries,
};