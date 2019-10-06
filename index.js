const app = require("express")();
const mongo = require("mongodb").MongoClient;

const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 27017;

const dbUrl = `mongodb://${dbHost}:${dbPort}`;
const dbName = "simple-api";
const dbCollection = "users";

let client;
async function connectDB() {
  if (!client) client = await mongo.connect(dbUrl);
  return {
    db: client.db(dbName),
    client: client
  };
}

async function close() {
  if (client) client.close();
  client = undefined;
}

async function read(name) {
  const { db, client } = await connectDB();
  const collection = db.collection(dbCollection);
  const doc = await collection.findOne({ name: name });
  return {
    count: !doc ? null : doc.count
  };
}

async function update(name, newCount) {
  const { db, client } = await connectDB();
  const collection = db.collection(dbCollection);
  let result = await collection.updateOne(
    { name: name },
    { $set: { count: newCount } }
  );
  return result;
}

async function insert(name, startingCount) {
  const { db, client } = await connectDB();
  const collection = db.collection(dbCollection);
  let result = await collection.insertOne({ name: name, count: startingCount });
  return result;
}

async function getUsersCount(name) {
  let { count } = await read(name);
  if (!count) {
    count = 0;
    let __result = await insert(name, count);
  }
  count = parseInt(count) + 1;
  let _result = await update(name, count);
  close();
  return count;
}

const nameRoute = async (req, res) => {
  const name = req.query.name;
  const nameCount = await getUsersCount(name);
  res.send(
    `Hello ${name || "stranger"}! You have been here ${nameCount} times`
  );
};

app.get("/hello", nameRoute);

const port = process.env.PORT || 3000;
if (!module.parent) {
  app.listen(port, () => console.log(`Running at ${port}`));
}

module.exports = app;
