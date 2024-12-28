import mongoose from "mongoose";
import { LogDataSource } from "../../domain/datasources/log.datasource.general.model";
import {
  LogEntity,
  LogSeverityLevel,
  mongoBaseDocument,
} from "../../domain/entities/log.entity";
import { logModel } from "../../data/mongo";

export class MongoDatasource extends LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    try {
      const logWithoutSave = new logModel({ ...log, type: "Mongo log" });

      await logWithoutSave.save();
      console.log("Mongo log saved successfully");
    } catch (error) {
      console.error("Error saving log to MongoDB:", error);

      // Attempt to save as a critical log
      const criticalLog = { ...log, LogSeverityLevel: "critical" };
      try {
        await logModel.create(criticalLog);
        console.log(
          "Critical error due to previous error log saved successfully"
        );
      } catch (criticalError) {
        throw new Error(
          `Error saving critical log due to previous failure: ${criticalError}`
        );
      }
    }

    // Alternative one-step save (commented out):
    // await logModel.create(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    try {
      const logsMatchingCriteria = await logModel.find({
        level: severityLevel,
      });

      console.log("Logs matching criteria: ", logsMatchingCriteria);

      if (logsMatchingCriteria.length > 0) {
        const allLogsMatchingCriteria = logsMatchingCriteria.map((doc) =>
          LogEntity.rebuildLogFromMongo(doc.toObject())
        );
        return allLogsMatchingCriteria;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error matching criteria: ", error);
      throw error;
    }
  }
}
