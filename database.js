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

async function addEntry(user, entry) {
  try {
    console.log("user in addEntry: ", user);
    const filter = { email: user.email };
    const update = { $set: { [`entries.${entry.name}`]: entry } };
    await userCollection.updateOne(filter, update);
    console.log("Entry added successfully");
} catch (error) {
    console.error("Error adding entry:", error);
    throw error;
}
}

async function getEntries(user) {
  if (!user || !user.entries) {
    console.log("user or user.entries doesn't exist")
    return [];
  }
  const entriesArray = Object.values(user.entries);
  console.log("entriesArray: ", entriesArray);
  return entriesArray;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addEntry,
  getEntries,
};