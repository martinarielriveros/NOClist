import fs from "fs";

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource extends LogDataSource {
  readonly #rootPath = "logs";
  readonly #logPaths = [
    `${this.#rootPath}/all-logs.log`,
    `${this.#rootPath}/low-logs.log`,
    `${this.#rootPath}/medium-logs.log`,
    `${this.#rootPath}/high-logs.log`,
    `${this.#rootPath}/critical-logs.log`,
  ];
  // Further check
  // #getJSONLogs(pathToFile: string): LogEntity[] {
  //   const data = fs.readFileSync(pathToFile, "utf8");
  //   return data
  //     .split("\n")
  //     .filter((line) => line.trim()) // Avoid empty lines
  //     .map((line) => JSON.parse(line));
  // }
  #getJSONLogs(pathToFile: string): LogEntity[] {
    const data = fs.readFileSync(pathToFile, "utf8");
    return data
      .split("\n")
      .filter((log) => log.trim()) // Avoid empty lines
      .map(LogEntity.rebuildLog); // inside map function i can avoid the only argument as it is passed through
  }

  constructor() {
    super();

    if (!fs.existsSync(this.#rootPath)) {
      fs.mkdirSync(this.#rootPath);
    }

    this.#logPaths.forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(
          path,
          JSON.stringify({
            message: `Initializing the file "${path}"`,
            date: new Date(),
          }) + "\n"
        );
      }
    });
  }

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJSON = `${JSON.stringify(log)}\n`;
    fs.appendFileSync(this.#logPaths[0], logAsJSON);
    switch (log.level) {
      case LogSeverityLevel.low:
        fs.appendFileSync(this.#logPaths[1], logAsJSON);
        break;
      case LogSeverityLevel.medium:
        fs.appendFileSync(this.#logPaths[2], logAsJSON);
        break;
      case LogSeverityLevel.high:
        fs.appendFileSync(this.#logPaths[3], logAsJSON);
        break;
      case LogSeverityLevel.critical:
        fs.appendFileSync(this.#logPaths[4], logAsJSON);
        break;
      default:
        throw new Error(`Invalid log severity level: ${log.level}`);
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.#getJSONLogs(this.#logPaths[1]);
      case LogSeverityLevel.medium:
        return this.#getJSONLogs(this.#logPaths[2]);
      case LogSeverityLevel.high:
        return this.#getJSONLogs(this.#logPaths[3]);
      case LogSeverityLevel.critical:
        return this.#getJSONLogs(this.#logPaths[4]);
      default:
        throw new Error(`${severityLevel} - Method not implemented.`);
    }
  }
}
