import mongoose from "mongoose";

interface ConnectionOptions {
  mongoURI: string;
  mongoDBName: string;
}

export class MongoDatabase {
  static async connect(connectionOptions: ConnectionOptions): Promise<string> {
    const { mongoURI, mongoDBName } = connectionOptions;

    console.log(
      `Connecting to MongoDB at URI: ${mongoURI}, Database: ${mongoDBName}`
    );
    try {
      await mongoose.connect(mongoURI, {
        dbName: mongoDBName,
      });

      return `Connection established to martin ~ ${mongoDBName}`;
    } catch (error) {
      console.error("Connection error:", error);
      throw error;
    }
  }
}
