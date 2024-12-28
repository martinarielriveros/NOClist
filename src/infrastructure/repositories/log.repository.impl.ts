import { LogDataSource } from "../../domain/datasources/log.datasource.general.model";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogRepositoryImpl extends LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {
    super();
  }
  async saveLog(log: LogEntity): Promise<void> {
    this.logDataSource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }
}
