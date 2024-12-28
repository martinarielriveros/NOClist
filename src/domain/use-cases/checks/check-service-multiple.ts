import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";
import path from "path";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  // TypeScript provides a shorthand where you can define and initialize a property directly from the constructor parameters
  // by using an access modifier (public, private, protected, or readonly) in the constructor signature:

  // Automatically creates an instance property called LogRepository, successCallback and errorCallback
  // and initializes it with the value passed.

  constructor(
    private readonly LogRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}
  private callLogs(log: LogEntity) {
    this.LogRepository.forEach((logRepository) => logRepository.saveLog(log)); //alling the function recursively to log the same log message to all repositories.
  }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Network response was not ok on ${url}`);
      }
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} up & running`,
        origin: path.basename(__filename),
      });

      this.callLogs(log);
      this.successCallback();

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.critical,
        message: `Service ${url} down down down!! it seems ${error}`,
        origin: path.basename(__filename),
      });
      this.callLogs(log);
      this.errorCallback(`${error}`);

      return false;
    }
  }
}
