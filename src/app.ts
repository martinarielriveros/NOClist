import mongoose from "mongoose";
import { envs } from "./config/plugins/env.plugins";
import { logModel } from "./data/mongo";
import { MongoDatabase } from "./data/mongo/init";
import { Server } from "./presentation/server";
import { PrismaClient } from "@prisma/client";

(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Error in main:", error);
  }
})();

async function main() {
  const connectionOptions = {
    mongoURI: envs.MONGO_URI,
    mongoDBName: envs.MONGO_DB_NAME,
  };

  // console.log(await MongoDatabase.connect(connectionOptions));

  // const newLog = await logModel.create({
  //   message: "test from mongo",
  //   origin: "somepa  th",
  //   level: "critical",
  //   type: "this is the type  my friend",
  //   timestamp: new Date(),
  // });
  // // newLog.save().then((saved) => console.log(saved));
  // // List all databases using mongoose's connection object
  // const databases = await mongoose.connection.db?.admin().listDatabases();
  // console.log("Databases:", databases?.databases);

  // const logs = await logModel.find({});
  // console.log(logs);

  Server.start();
}
