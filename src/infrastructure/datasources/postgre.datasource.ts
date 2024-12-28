import { $Enums, PrismaClient } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource.general.model";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

export function mapSeverityLevel(
  dbLevel: $Enums.SeverityLevel
): LogSeverityLevel {
  switch (dbLevel) {
    case "CRITICAL":
      return LogSeverityLevel.critical;
    case "LOW":
      return LogSeverityLevel.low;
    case "MEDIUM":
      return LogSeverityLevel.medium;
    case "HIGH":
      return LogSeverityLevel.high;
    default:
      throw new Error(`Unknown severity level: ${dbLevel}`);
  }
}

export class PostgreDataSource extends LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    try {
      const postgreLog = {
        ...log,
        type: "This is a type in Postgre",
      };
      console.log("this is log", log);
      const { level, type, message, origin } = postgreLog;

      const result = await prismaClient.logModel.create({
        data: {
          level: "CRITICAL",
          type,
          message,
          origin,
          timestamp: new Date(),
        },
      });
      console.log("succesfully saved log to postgre database");
    } catch (error) {
      throw new Error("Error while saving log to postgre database:");
    }
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    try {
      // Fetch logs from the database
      const logs = await prismaClient.logModel.findMany({
        where: {
          level: severityLevel as unknown as $Enums.SeverityLevel, // Explicit cast
        },
      });

      console.log("severityLevel (runtime):", severityLevel);
      console.log("typeof severityLevel:", typeof severityLevel);
      console.log("Prisma $Enums.SeverityLevel:", $Enums.SeverityLevel);

      console.log("Logs:", logs);
      // Map database logs to LogEntity
      return logs.map((log) => {
        // Map Prisma's SeverityLevel to LogSeverityLevel
        const mappedLevel: LogSeverityLevel = mapSeverityLevel(log.level);
        return LogEntity.rebuildLogFromPostgre({
          ...log,
          level: mappedLevel, // Use the mapped level
        });
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error while processing log");
    }
  }
}
